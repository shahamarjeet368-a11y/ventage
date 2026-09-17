export interface ServiceItem {
  id: string;
  name: string;
  category: "Hair" | "Makeup" | "Nails" | "Beauty Care" | "Treatments";
  description: string;
  price: string;
  duration: string;
  image_url: string;
  is_active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "All" | "Hair" | "Makeup" | "Nails" | "Salon";
  image_url: string;
  is_featured: boolean;
}

export interface ReviewItem {
  id: string;
  customer_name: string;
  rating: number;
  review: string;
  source: string;
  is_featured: boolean;
}

export interface AppointmentItem {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    name: "Luxury Signature Haircut & Styling",
    category: "Hair",
    description: "Bespoke hair cutting tailored to your facial contours, followed by luxury wash, deep conditioning, and signature editorial blowout.",
    price: "₹1,800",
    duration: "60 mins",
    image_url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800",
    is_active: true
  },
  {
    id: "srv-2",
    name: "Global Balayage & Olaplex Treatment",
    category: "Hair",
    description: "Hand-painted seamless dimensional highlights combined with bond builder treatment for luminous color without compromise.",
    price: "₹6,500",
    duration: "180 mins",
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    is_active: true
  },
  {
    id: "srv-3",
    name: "Keratin Smoothening & Gloss Spa",
    category: "Hair",
    description: "Restorative amino acid smoothening therapy providing mirror shine, glass hair texture, and humidity protection for months.",
    price: "₹5,200",
    duration: "150 mins",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    is_active: true
  },
  {
    id: "srv-4",
    name: "Airbrush HD Bridal & Party Makeup",
    category: "Makeup",
    description: "Camera-ready flawless skin finish using premium airbrush technique, custom mink lash styling, and long-lasting lip contouring.",
    price: "₹8,500",
    duration: "120 mins",
    image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    is_active: true
  },
  {
    id: "srv-5",
    name: "Gel Extension & Architectural Nail Art",
    category: "Nails",
    description: "Sculpted gel extensions with minimalist hand-painted line work, chrome leafing, or editorial french tip designs.",
    price: "₹2,800",
    duration: "90 mins",
    image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    is_active: true
  },
  {
    id: "srv-6",
    name: "Radiant Hydra-Facial & Dermaplaning",
    category: "Treatments",
    description: "Clinical deep cleansing, peach fuzz dermaplaning exfoliation, antioxidant serum infusion, and therapeutic LED phototherapy.",
    price: "₹3,800",
    duration: "75 mins",
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    is_active: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Editorial Sun-Kissed Balayage",
    category: "Hair",
    image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    is_featured: true
  },
  {
    id: "gal-2",
    title: "Minimalist Glass Skin Makeup",
    category: "Makeup",
    image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    is_featured: true
  },
  {
    id: "gal-3",
    title: "Sculpted Chrome Gel Extensions",
    category: "Nails",
    image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    is_featured: true
  },
  {
    id: "gal-4",
    title: "Vintage Luxury Salon Interior",
    category: "Salon",
    image_url: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800",
    is_featured: true
  },
  {
    id: "gal-5",
    title: "Silk Press & Editorial Waves",
    category: "Hair",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    is_featured: false
  },
  {
    id: "gal-6",
    title: "Bridal Dewy Glam Glow",
    category: "Makeup",
    image_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    is_featured: false
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    customer_name: "Ruchika Malhotra",
    rating: 5,
    review: "Excellent Service excellent interior! Vintage is definitely the finest salon in Rani Bagh / Pitampura. The hair spa and coloring experience was super relaxing and professional.",
    source: "Google Review",
    is_featured: true
  },
  {
    id: "rev-2",
    customer_name: "Meenakshi Verma",
    rating: 5,
    review: "Got my bridal HD makeup done at Vintage and I was blown away! The aesthetic, attention to skin prep, and calm environment made my day stress-free. 4.9 stars well deserved!",
    source: "Google Review",
    is_featured: true
  },
  {
    id: "rev-3",
    customer_name: "Simran Kaur",
    rating: 5,
    review: "The team takes time to consult with you before touching your hair. Highly hygienic, courteous staff and serene warm atmosphere. My go-to beauty parlour in Pitampura!",
    source: "Google Review",
    is_featured: true
  }
];

export const SALON_INFO = {
  name: "Vintage Beauty Salon",
  tagline: "Beauty, Refined. Confidence, Redefined.",
  rating: 4.9,
  reviewsCount: "362+",
  location: "Sant Nagar, Rani Bagh, Pitampura, Delhi – 110034",
  googleMapsUrl: "https://maps.google.com/?q=Vintage+Salon+Sant+Nagar+Rani+Bagh+Pitampura+Delhi",
  phone: "098990 00879",
  phoneNumeric: "9899000879",
  whatsapp: "919899000879",
  openingHours: "Mon - Sun: 10:00 AM - 8:30 PM",
  instagramUrl: "https://instagram.com",
};
