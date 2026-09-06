import { Footer, Header } from "../components";
import { createPageMetadata } from "../site";

export const metadata = createPageMetadata({ title: "Privacy & cookies | Biskette Games", description: "How Biskette Games uses analytics cookies and how to manage your choice.", path: "/privacy" });

export default function PrivacyPage() {
  return <><Header /><main id="main-content">
    <section className="about-hero"><div><span className="eyebrow">Your visit, your choice</span><h1>Privacy &amp; cookies</h1><p>Updated September 6, 2026</p></div></section>
    <article className="privacy-copy">
      <p>Biskette Games is Bob Glahn&apos;s independent game studio. This notice covers visits to biskettegames.com.</p>
      <h2>Optional Google Analytics</h2>
      <p>If you accept analytics, Google Analytics collects information about your visit, such as pages viewed, referral sources, device and browser information, and interactions. We use it to understand and improve the site. Google processes this information on our behalf and may process it outside your country.</p>
      <p>Google Analytics does not load until you accept. Rejecting analytics does not restrict access to the site. Advertising consent remains denied, and our tag disables Google signals and advertising personalization.</p>
      <h2>Cookies and your saved choice</h2>
      <p>Google Analytics uses first-party cookies named _ga and _ga_H5YYLHY3ST to distinguish browsers and sessions. We configure these cookies to expire after 180 days without extending their lifetime on each visit. Browser settings may shorten that period.</p>
      <p>We store your acceptance or rejection and its expiry in your browser&apos;s local storage under biskette.analytics-consent.v1 for 180 days. This preference is used to remember your choice. If storage is blocked or cleared, we ask again; Google Analytics stays off until you accept.</p>
      <h2>Change your mind</h2>
      <p>Use Cookie settings at the bottom of any page to accept or reject analytics. Withdrawing consent stops further Google Analytics collection, removes accessible Google Analytics cookies for this site, and reloads the page to unload the tag. It does not automatically delete information already sent to Google.</p>
      <h2>Site delivery and Cloudflare</h2>
      <p>Cloudflare provides site hosting and security and receives technical request information needed to deliver the site. The site also uses Cloudflare&apos;s separate cookieless analytics beacon. The Google Analytics cookie choice does not switch off Cloudflare services. <a href="https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/">Read about Cloudflare Web Analytics</a>.</p>
      <h2>External sites and questions</h2>
      <p>Links to game stores and social platforms open services with their own privacy practices. See <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a> and <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare&apos;s privacy policy</a> for their information handling.</p>
      <p>For questions about this site or requests concerning your personal information, contact <a href="https://www.instagram.com/biskettegames/">Biskette Games on Instagram</a>.</p>
    </article>
  </main><Footer /></>;
}
