import json
import os
import uuid
import requests
from datetime import datetime
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# File path for local JSON DB fallback
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "db.json")

def is_supabase_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("http"))

def get_supabase_headers() -> Dict[str, str]:
    return {
        "apikey": SUPABASE_KEY or "",
        "Authorization": f"Bearer {SUPABASE_KEY or ''}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

def fetch_supabase_table(table_name: str) -> List[Dict[str, Any]]:
    if not is_supabase_configured():
        return []
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table_name}?select=*"
    try:
        res = requests.get(url, headers=get_supabase_headers(), timeout=5)
        if res.status_code == 200:
            return res.json()
    except Exception as e:
        print(f"[Supabase Error] Failed fetching {table_name}: {e}")
    return []

def ensure_data_file():
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    if not os.path.exists(DATA_FILE):
        initial_db = {
            "services": [
                {
                    "id": "srv-1",
                    "name": "Luxury Signature Haircut & Styling",
                    "category": "Hair",
                    "description": "Bespoke hair cutting tailored to your face shape with luxury wash, deep conditioning, and signature editorial blowout.",
                    "price": "₹1,800 - ₹2,500",
                    "duration": "60 mins",
                    "image_url": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                },
                {
                    "id": "srv-2",
                    "name": "Global Balayage & Olaplex Treatment",
                    "category": "Hair",
                    "description": "Hand-painted seamless highlights blended with deep bond building treatment for radiant, dimensional color.",
                    "price": "₹5,500 - ₹8,500",
                    "duration": "180 mins",
                    "image_url": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                },
                {
                    "id": "srv-3",
                    "name": "Keratin Smoothening & Gloss Spa",
                    "category": "Hair",
                    "description": "Deep restorative smoothening therapy providing frizz-free glass hair sheen for up to 5 months.",
                    "price": "₹4,500 - ₹7,000",
                    "duration": "150 mins",
                    "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                },
                {
                    "id": "srv-4",
                    "name": "Airbrush HD Bridal & Party Makeup",
                    "category": "Makeup",
                    "description": "High-definition flawless skin coverage with premium waterproof products, custom lash accents, and lip styling.",
                    "price": "₹6,000 - ₹18,000",
                    "duration": "120 mins",
                    "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                },
                {
                    "id": "srv-5",
                    "name": "Gel Extension & Architectural Nail Art",
                    "category": "Nails",
                    "description": "Custom sculpted builder gel extensions with hand-painted editorial line work or chrome accent finishes.",
                    "price": "₹2,200 - ₹3,500",
                    "duration": "90 mins",
                    "image_url": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                },
                {
                    "id": "srv-6",
                    "name": "Radiant Hydra-Facial & Dermaplaning",
                    "category": "Treatments",
                    "description": "Clinical grade deep pore cleansing, exfoliation, antioxidant serum infusion, and LED phototherapy.",
                    "price": "₹3,200 - ₹5,000",
                    "duration": "75 mins",
                    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
                    "is_active": True,
                    "created_at": "2026-01-10T10:00:00Z"
                }
            ],
            "appointments": [
                {
                    "id": "apt-101",
                    "customer_name": "Priya Sharma",
                    "customer_phone": "9876543210",
                    "customer_email": "priya.s@example.com",
                    "service_id": "srv-1",
                    "service_name": "Luxury Signature Haircut & Styling",
                    "appointment_date": "2026-09-20",
                    "appointment_time": "11:30 AM",
                    "status": "confirmed",
                    "notes": "Prefers subtle layers.",
                    "created_at": "2026-09-15T14:30:00Z"
                },
                {
                    "id": "apt-102",
                    "customer_name": "Ananya Gupta",
                    "customer_phone": "9811223344",
                    "customer_email": "ananya.g@example.com",
                    "service_id": "srv-4",
                    "service_name": "Airbrush HD Bridal & Party Makeup",
                    "appointment_date": "2026-09-22",
                    "appointment_time": "03:00 PM",
                    "status": "pending",
                    "notes": "Engagement ceremony makeup test.",
                    "created_at": "2026-09-16T09:15:00Z"
                }
            ],
            "gallery": [
                {
                    "id": "gal-1",
                    "title": "Editorial Soft Wave Balayage",
                    "category": "Hair",
                    "image_url": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
                    "is_featured": True,
                    "created_at": "2026-01-15T10:00:00Z"
                },
                {
                    "id": "gal-2",
                    "title": "Minimalist Glass Skin Makeup",
                    "category": "Makeup",
                    "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
                    "is_featured": True,
                    "created_at": "2026-01-16T10:00:00Z"
                },
                {
                    "id": "gal-3",
                    "title": "Bespoke Almond Chrome Gel Nails",
                    "category": "Nails",
                    "image_url": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
                    "is_featured": True,
                    "created_at": "2026-01-17T10:00:00Z"
                },
                {
                    "id": "gal-4",
                    "title": "Vintage Salon Interior Sanctum",
                    "category": "Salon",
                    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800",
                    "is_featured": True,
                    "created_at": "2026-01-18T10:00:00Z"
                }
            ],
            "reviews": [
                {
                    "id": "rev-1",
                    "customer_name": "Ruchika Malhotra",
                    "rating": 5,
                    "review": "Excellent Service excellent interior! Vintage is definitely the finest salon in Rani Bagh / Pitampura. The hair spa and coloring experience was super relaxing and professional.",
                    "source": "Google Review",
                    "is_featured": True,
                    "created_at": "2026-02-01T10:00:00Z"
                },
                {
                    "id": "rev-2",
                    "customer_name": "Meenakshi Verma",
                    "rating": 5,
                    "review": "Got my bridal HD makeup done at Vintage and I was blown away! The aesthetic, attention to skin prep, and calm environment made my day stress-free. 4.9 stars well deserved!",
                    "source": "Google Review",
                    "is_featured": True,
                    "created_at": "2026-02-10T10:00:00Z"
                },
                {
                    "id": "rev-3",
                    "customer_name": "Simran Kaur",
                    "rating": 5,
                    "review": "The team takes time to consult with you before touching your hair. Highly hygienic, courteous staff and serene warm atmosphere. My go-to beauty parlour in Pitampura!",
                    "source": "Google Review",
                    "is_featured": True,
                    "created_at": "2026-03-05T10:00:00Z"
                }
            ],
            "offers": [
                {
                    "id": "off-1",
                    "title": "Vintage Autumn Glow Package",
                    "description": "Combines Hydra-Facial, Signature Hair Spa & Classic Manicure.",
                    "discount": "20% OFF",
                    "valid_until": "2026-10-31",
                    "is_active": True
                }
            ]
        }
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(initial_db, f, indent=2)

def read_db() -> Dict[str, Any]:
    if is_supabase_configured():
        try:
            services = fetch_supabase_table("services")
            appointments = fetch_supabase_table("appointments")
            gallery = fetch_supabase_table("gallery")
            reviews = fetch_supabase_table("reviews")
            offers = fetch_supabase_table("offers")
            return {
                "services": services,
                "appointments": appointments,
                "gallery": gallery,
                "reviews": reviews,
                "offers": offers
            }
        except Exception as e:
            print(f"[Supabase Fallback] Falling back to local JSON DB: {e}")

    ensure_data_file()
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        ensure_data_file()
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

def write_db(data: Dict[str, Any]):
    ensure_data_file()
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
