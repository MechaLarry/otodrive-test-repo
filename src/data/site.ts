/**
 * Single source of truth for site-wide data.
 *
 * Previously the nav, footer, phone number and branch list were duplicated
 * across 11 HTML files (and got out of sync - the old pages even pointed at
 * otodrive.co.ke while production is otodriveafrica.com).
 * Edit here once and every page updates.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface OpeningHour {
  /** Schema.org day names. */
  days: string[];
  opens: string;
  closes: string;
}

export interface Branch {
  id: string;
  name: string;
  /** Short label for chips and cards. */
  city: string;
  region: string;
  telephone: string;
  latitude: number;
  longitude: number;
  hours: OpeningHour[];
  services: string[];
  /** Exact street address - pending from the client. */
  addressNote?: string;
}

export const site = {
  name: 'Otodrive',
  legalName: 'Otodrive Kenya',
  /** Canonical production domain - must match astro.config.mjs `site`. */
  url: 'https://otodriveafrica.com',
  tagline: "Kenya's Leading LPG Autogas Conversion & Services Provider",
  description:
    "Kenya's premier LPG autogas conversion and services provider. Save up to 40% on fuel costs with our expert LPG conversion services.",
  phone: '+254704644909',
  phoneDisplay: '+254-704-644-909',
  email: 'info@otodrive.co.ke',
  whatsapp: '254704644909',
  logo: '/images/website%20Logo.png',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61566117596915',
    x: 'https://x.com/OtodriveKE',
    instagram: 'https://www.instagram.com/otodriveke',
  },
  /** Registered postal address (Mavoko HQ) - from the existing schema. */
  address: {
    street: 'Mavoko',
    locality: 'Nairobi',
    region: 'Nairobi',
    postalCode: '00100',
    country: 'KE',
  },
  /** Head-office coordinates. */
  geo: {
    latitude: -1.4297154,
    longitude: 36.9601985,
  },
} as const;

/** Primary navigation. Hrefs keep the existing .html URLs so no ranking is lost. */
export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about.html' },
  { label: 'Services', href: '/services.html' },
  { label: 'Projects', href: '/projects.html' },
  { label: 'Locations', href: '/maps.html' },
  { label: 'Testimonial', href: '/testimonial.html' },
  { label: 'Licenses', href: '/licenses.html' },
  { label: 'Contact Us', href: '/contact.html' },
];

/** Core service offering (matches the existing schema.org serviceType values). */
export const services = [
  'LPG Conversion',
  'Vehicle Diagnosis',
  'LPG System Check',
  'LPG Refueling',
];

/** Services offered at the branch locations, as supplied by the client. */
const branchServices = [
  'Autogas Installation',
  'Autogas Troubleshooting',
  'Autogas Periodic Service',
  'Autogas Repairs',
  'Autogas Fuelling',
];

/** Weekday + Saturday hours used by the newer branches. */
const standardHours: OpeningHour[] = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  { days: ['Saturday'], opens: '08:30', closes: '13:00' },
];

export const branches: Branch[] = [
  {
    id: 'mavoko',
    name: 'Otodrive Mavoko (Head Office)',
    city: 'Mavoko',
    region: 'Machakos',
    telephone: site.phone,
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
    hours: [
      {
        days: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    services,
  },
  {
    id: 'jomvu',
    name: 'Otodrive Jomvu',
    city: 'Mombasa',
    region: 'Mombasa',
    telephone: site.phone,
    latitude: -3.9798165,
    longitude: 39.5949388,
    hours: standardHours,
    services: branchServices,
    addressNote: 'Jomvu, Mombasa - exact street address to be confirmed.',
  },
  {
    id: 'thika',
    name: 'Otodrive Petrocity Thika',
    city: 'Thika',
    region: 'Kiambu',
    telephone: site.phone,
    latitude: -1.0423809,
    longitude: 37.0638209,
    hours: standardHours,
    services: branchServices,
    addressNote: 'Petrocity, Thika - exact street address to be confirmed.',
  },
];

/** Google Maps links derived from the branch coordinates. */
export const maps = {
  embed: (branch: Branch, zoom = 16) =>
    `https://www.google.com/maps?q=${branch.latitude},${branch.longitude}&z=${zoom}&hl=en&output=embed`,
  view: (branch: Branch) =>
    `https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`,
  directions: (branch: Branch) =>
    `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`,
};
