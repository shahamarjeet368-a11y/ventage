import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import StickyMobileBar from "@/components/mobile/StickyMobileBar";
import CustomCursor from "@/components/ui/CustomCursor";
import { SALON_INFO } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Vintage Beauty Salon | Hair, Makeup & Beauty Services in Delhi",
  description: "Premium beauty salon in Sant Nagar, Rani Bagh, Pitampura, Delhi offering hair, makeup, nail and beauty services. Book your appointment with Vintage.",
  keywords: [
    "Vintage salon Delhi",
    "beauty parlour Pitampura",
    "salon in Rani Bagh",
    "beauty salon Sant Nagar",
    "hair salon Pitampura",
    "makeup artist Pitampura",
    "HD makeup Delhi",
    "hair spa Pitampura",
    "nail extension Pitampura"
  ],
  authors: [{ name: "Vintage Beauty Salon" }],
  openGraph: {
    title: "Vintage Beauty Salon | Hair, Makeup & Beauty Services in Delhi",
    description: "Experience premium luxury hair care, HD airbrush makeup, nail sculpting and radiant skin treatments at Vintage Salon in Sant Nagar, Rani Bagh, Pitampura, Delhi.",
    url: "https://vintagesalon.in",
    siteName: "Vintage Beauty Salon",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Vintage Beauty Salon Interior, Pitampura, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vintage Beauty Salon | Sant Nagar, Rani Bagh, Pitampura, Delhi",
    description: "4.9 ★ Rated Premium Salon in Pitampura, Delhi. Book your appointment today.",
    images: ["https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vintagesalon.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": SALON_INFO.name,
  "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1200",
  "telephone": SALON_INFO.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sant Nagar, Rani Bagh",
    "addressLocality": "Pitampura",
    "addressRegion": "Delhi",
    "postalCode": "110034",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.6924",
    "longitude": "77.1311"
  },
  "url": "https://vintagesalon.in",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "362"
  },
  "priceRange": "₹₹",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "20:30"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative bg-vintage-ivory text-vintage-charcoal font-sans selection:bg-vintage-rose selection:text-vintage-espresso">
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
