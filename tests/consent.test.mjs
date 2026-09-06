import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source = ts.transpileModule(fs.readFileSync(new URL('../app/consent-controller.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const sandbox = { exports: {}, Date };
vm.runInNewContext(source, sandbox);
const { createConsentController, CONSENT_KEY, MEASUREMENT_ID } = sandbox.exports;
function fixture(saved, blocked = false) {
  const store = new Map(saved ? [[CONSENT_KEY, saved]] : []);
  const scripts = [], events = {}, deleted = [];
  let reloads = 0, state;
  const w = {
    document: {
      get cookie() { return '_ga=old; _ga_H5YYLHY3ST=old; necessary=keep'; },
      set cookie(value) { deleted.push(value); },
      createElement: () => ({}), head: { appendChild: s => scripts.push(s) },
    },
    localStorage: { getItem: k => { if (blocked) throw Error('blocked'); return store.get(k); }, setItem: (k,v) => { if (blocked) throw Error('blocked'); store.set(k,v); } },
    location: { hostname: 'biskettegames.com', reload: () => { reloads++; } },
    setTimeout: () => 1, clearTimeout: () => {},
    addEventListener: (k,fn) => { events[k] = fn; }, removeEventListener: k => { delete events[k]; },
  };
  const c = createConsentController(w);
  c.init(value => { state = value; });
  return { c,w,store,scripts,events,deleted,get reloads(){return reloads;},get state(){return state;} };
}
const saved = choice => JSON.stringify({ choice, expiresAt: Date.now() + 60000 });
test('new, expired, malformed and blocked storage never load Google', () => {
  for (const value of [undefined,'garbage',JSON.stringify({choice:'accepted',expiresAt:1})]) {
    const f=fixture(value); assert.equal(f.state,null); assert.equal(f.scripts.length,0);
  }
  assert.equal(fixture(undefined,true).scripts.length,0);
});
test('reject persists without loading Google or deleting unrelated cookies', () => {
  const f=fixture(); f.c.choose('rejected');
  assert.equal(f.scripts.length,0); assert.equal(JSON.parse(f.store.get(CONSENT_KEY)).choice,'rejected');
  assert.ok(f.deleted.length>0); assert.ok(f.deleted.every(x=>!x.startsWith('necessary=')));
  assert.equal(fixture(saved('rejected')).scripts.length,0);
});
test('accept sets denied advertising and granted analytics before one loader', () => {
  const f=fixture(); f.c.choose('accepted'); f.c.choose('accepted');
  assert.equal(f.scripts.length,1); assert.ok(f.scripts[0].src.endsWith(MEASUREMENT_ID));
  const q=f.w.dataLayer.map(x=>Array.from(x));
  assert.equal(q[0][0],'consent'); assert.equal(q[0][1],'default'); assert.equal(q[0][2].analytics_storage,'denied');
  assert.equal(q[0][2].ad_storage,'denied'); assert.equal(q[0][2].ad_user_data,'denied'); assert.equal(q[0][2].ad_personalization,'denied');
  assert.equal(q[1][2].analytics_storage,'granted'); assert.equal(q[3][0],'config'); assert.equal(q[3][1],MEASUREMENT_ID);
  assert.equal(q[3][2].allow_google_signals,false);
  assert.equal(fixture(saved('accepted')).scripts.length,1);
});
test('withdrawal immediately disables GA and reloads after saving rejection', () => {
  const f=fixture(saved('accepted')); f.c.choose('rejected');
  assert.equal(f.w[`ga-disable-${MEASUREMENT_ID}`],true); assert.equal(f.reloads,1);
  assert.equal(JSON.parse(f.store.get(CONSENT_KEY)).choice,'rejected');
});
test('withdrawal in another tab and expired consent stop an existing tag', () => {
  const f=fixture(saved('accepted')); f.store.set(CONSENT_KEY,saved('rejected')); f.events.storage({key:CONSENT_KEY});
  assert.equal(f.reloads,1); assert.equal(f.w[`ga-disable-${MEASUREMENT_ID}`],true);
  const g=fixture(saved('accepted')); g.store.set(CONSENT_KEY,JSON.stringify({choice:'accepted',expiresAt:1})); g.events.focus();
  assert.equal(g.state,null); assert.equal(g.reloads,1);
});
test('blocked storage does not prevent an explicit choice or revoke action', () => {
  const f=fixture(undefined,true); f.c.choose('accepted'); assert.equal(f.scripts.length,1);
  f.c.choose('rejected'); assert.equal(f.reloads,1);
});
