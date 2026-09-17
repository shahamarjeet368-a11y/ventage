import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import appointments, services, gallery, reviews, offers, auth
import time

app = FastAPI(
    title="Vintage Beauty Salon API",
    description="Production REST API for Vintage Salon (Sant Nagar, Rani Bagh, Pitampura, Delhi)",
    version="1.1.0"
)

# Enable CORS for the Next.js frontend only (wildcard origins + credentials is
# both insecure and rejected by browsers for credentialed requests)
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(appointments.router)
app.include_router(services.router)
app.include_router(gallery.router)
app.include_router(reviews.router)
app.include_router(offers.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "business": "Vintage Beauty Salon",
        "location": "Sant Nagar, Rani Bagh, Pitampura, Delhi – 110034",
        "google_rating": 4.9,
        "total_reviews": "362+",
        "contact_phone": "098990 00879"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "service": "vintage-salon-backend",
        "version": "1.1.0",
        "database": "connected"
    }
