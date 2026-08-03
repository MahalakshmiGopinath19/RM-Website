import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing & POS Software Solutions | Best Software Company Chennai',
  description:
    'Vaave Digital provides the best, trusted, and affordable billing and POS software solutions in Guindy, Chennai, India. Custom business software for Clinics (Agni Clinic), Salons (Memories Salon), Restaurants, and Retail.',
  keywords: [
    'best clinic billing software in chennai',
    'trusted salon management software in guindy',
    'affordable restaurant billing software near me',
    'customized business software development in chennai india',
    'billing software company near me',
    'billing software company in my location',
    'agni clinic billing software',
    'memories salon pos software',
    'best pos software in chennai',
    'trusted pos software development company',
  ],
  alternates: {
    canonical: 'https://vaavedigital.com/products',
  },
  openGraph: {
    title: 'Billing & POS Software Solutions | Vaave Digital Chennai',
    description:
      'The best, trusted, and affordable clinic, salon, and retail billing POS software in Guindy, Chennai, India.',
    url: 'https://vaavedigital.com/products',
    siteName: 'Vaave Digital',
    type: 'website',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
