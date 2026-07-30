import type { Metadata } from "next";

export const SITE_NAME = "Biskette Games";
export const SITE_URL = "https://biskettegames.com";
export const BEDBUGS_STORE_URL = "https://wowcube.com/store/bedbugs";
export const ITCH_URL = "https://armyofbob.itch.io/";

export const HOME_SOCIAL_IMAGE = `${SITE_URL}/assets/bedbugs-wowcube.webp`;
export const BEDBUGS_SOCIAL_IMAGE = `${SITE_URL}/assets/bedbugs-gameplay.webp`;
export const STUDIO_SOCIAL_IMAGE = `${SITE_URL}/assets/biskette-games-512.png`;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = STUDIO_SOCIAL_IMAGE,
  imageAlt = "Biskette Games logo",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: STUDIO_SOCIAL_IMAGE,
  founder: {
    "@id": `${SITE_URL}/about#bob-glahn`,
  },
  sameAs: [ITCH_URL],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#bob-glahn`,
  name: "Bob Glahn",
  url: `${SITE_URL}/about`,
  jobTitle: "Independent game designer and producer",
  worksFor: {
    "@id": `${SITE_URL}/#organization`,
  },
};
