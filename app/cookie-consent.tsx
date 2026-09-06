"use client";

import { useEffect, useRef, useState } from "react";
import { createConsentController, type Choice } from "./consent-controller";

export default function CookieConsent() {
  const controller = useRef<ReturnType<typeof createConsentController> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const settings = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const consent = controller.current ?? createConsentController(window);
    controller.current = consent;
    consent.init(value => { setChoice(value); setReady(true); });
    return () => consent.dispose();
  }, []);

  useEffect(() => { if (editing) heading.current?.focus(); }, [editing]);

  function choose(value: "accepted" | "rejected") {
    controller.current?.choose(value);
    setEditing(false);
    settings.current?.focus();
  }

  return <>
    <div className="cookie-settings-bar">
      <button ref={settings} type="button" disabled={!ready} onClick={() => setEditing(true)}>Cookie settings</button>
      <a href="/privacy">Privacy &amp; cookies</a>
    </div>
    {ready && (choice === null || editing) && <section className="cookie-banner" aria-labelledby="cookie-title">
      <h2 id="cookie-title" ref={heading} tabIndex={-1}>Optional analytics cookies</h2>
      <p>May we use Google Analytics to understand which pages people visit and how they use Biskette Games? It uses cookies and sends usage information to Google. The site works either way.</p>
      <p className="cookie-detail">We remember your choice for 180 days. You can change it in Cookie settings at any time. <a href="/privacy">Privacy &amp; cookie details</a>.</p>
      {choice && <p className="cookie-detail">Current choice: analytics {choice === "accepted" ? "accepted" : "rejected"}.</p>}
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>Reject analytics</button>
        <button type="button" onClick={() => choose("accepted")}>Accept analytics</button>
      </div>
      {editing && choice && <button className="cookie-close" type="button" onClick={() => { setEditing(false); settings.current?.focus(); }}>Keep current choice</button>}
    </section>}
  </>;
}
