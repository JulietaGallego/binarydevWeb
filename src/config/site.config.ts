import { SITE_URL, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from 'astro:env/server';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /**
   * Branding configuration
   * Logo files: Replace SVGs in src/assets/branding/
   * Favicon: Replace in public/favicon.svg
   */
  branding: {
    /** Logo alt text for accessibility */
    logo: {
      alt: string;
    };
    /** Favicon path (lives in public/) */
    favicon: {
      svg: string;
    };
    /** Theme colors for manifest and browser UI */
    colors: {
      /** Browser toolbar color (hex) */
      themeColor: string;
      /** PWA splash screen background (hex) */
      backgroundColor: string;
    };
  };
}

const siteConfig: SiteConfig = {
  name: 'BinaryDev',
  description: 'Diseño y desarrollo web a medida en Buenos Aires. Sitios institucionales, tiendas e-commerce y automatización de procesos.',
  url: SITE_URL || 'https://binarydev.com.ar',
  ogImage: `/og/index.png`,
  author: 'Julieta Gallego',
  email: 'julieta@binarydev.com.ar',
  phone: '+5492477235288',
  socialLinks: [],
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    bing: BING_SITE_VERIFICATION,
  },
  branding: {
    logo: {
      alt: 'BinaryDev',
    },
    favicon: {
      svg: '/favicon.svg',
    },
    colors: {
      themeColor: '#5F4FC9',
      backgroundColor: '#ffffff',
    },
  },
};

export default siteConfig;
