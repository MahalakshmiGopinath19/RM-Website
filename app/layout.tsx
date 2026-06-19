import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import ScrollPopup from '@/components/ScrollPopup';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Rainbow Media - AI Integrated Digital & IT Services',
  description:
    'Transforming Ideas into Digital Realities | Web Development, Social Media Marketing, SEO',
  icons: {
    icon: '/image/RM favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />

        {/* Existing Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap"
          rel="stylesheet"
        />

        {/* Hero Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-[#FCF6F6] text-[#425466] font-['Inter'] antialiased">
        <Header />

        <main>{children}</main>

        <ScrollPopup />

        <Footer />
      </body>
    </html>
  );
}