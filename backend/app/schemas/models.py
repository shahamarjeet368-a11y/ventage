from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class AppointmentCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, example="Priya Sharma")
    customer_phone: str = Field(..., min_length=10, example="09899000879")
    customer_email: Optional[str] = Field(None, example="priya@example.com")
    service_id: str = Field(..., example="srv-1")
    service_name: Optional[str] = Field(None, example="Luxury Signature Haircut & Styling")
    appointment_date: str = Field(..., example="2026-09-25")
    appointment_time: str = Field(..., example="11:30 AM")
    notes: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[str] = Field(None, example="confirmed") # pending, confirmed, completed, cancelled
    notes: Optional[str] = None

class ServiceCreate(BaseModel):
    name: str
    category: str # Hair, Makeup, Nails, Beauty Care, Treatments
    description: str
    price: str
    duration: str
    image_url: Optional[str] = None
    is_active: bool = True

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    duration: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class GalleryCreate(BaseModel):
    title: str
    category: str # Hair, Makeup, Nails, Salon
    image_url: str
    is_featured: bool = True

class ReviewCreate(BaseModel):
    customer_name: str
    rating: int = 5
    review: str
    source: str = "Google Review"
    is_featured: bool = True

class OfferCreate(BaseModel):
    title: str
    description: str
    discount: str
    valid_until: str
    is_active: bool = True
