from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
import uuid
from app.schemas.models import ServiceCreate, ServiceUpdate
from app.database import read_db, write_db
from app.auth_utils import require_admin

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("")
def list_services(category: Optional[str] = None):
    db = read_db()
    services = db.get("services", [])
    if category and category.lower() != "all":
        services = [s for s in services if s.get("category", "").lower() == category.lower()]
    return {"services": services}

@router.post("", dependencies=[Depends(require_admin)])
def create_service(payload: ServiceCreate):
    db = read_db()
    new_srv = {
        "id": f"srv-{uuid.uuid4().hex[:6]}",
        "name": payload.name,
        "category": payload.category,
        "description": payload.description,
        "price": payload.price,
        "duration": payload.duration,
        "image_url": payload.image_url or "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800",
        "is_active": payload.is_active,
        "created_at": "2026-09-17T10:00:00Z"
    }
    db["services"].append(new_srv)
    write_db(db)
    return {"success": True, "service": new_srv}

@router.patch("/{srv_id}", dependencies=[Depends(require_admin)])
def update_service(srv_id: str, payload: ServiceUpdate):
    db = read_db()
    for s in db.get("services", []):
        if s["id"] == srv_id:
            if payload.name: s["name"] = payload.name
            if payload.category: s["category"] = payload.category
            if payload.description: s["description"] = payload.description
            if payload.price: s["price"] = payload.price
            if payload.duration: s["duration"] = payload.duration
            if payload.image_url: s["image_url"] = payload.image_url
            if payload.is_active is not None: s["is_active"] = payload.is_active
            write_db(db)
            return {"success": True, "service": s}
    raise HTTPException(status_code=404, detail="Service not found")

@router.delete("/{srv_id}", dependencies=[Depends(require_admin)])
def delete_service(srv_id: str):
    db = read_db()
    services = db.get("services", [])
    updated = [s for s in services if s["id"] != srv_id]
    db["services"] = updated
    write_db(db)
    return {"success": True}
