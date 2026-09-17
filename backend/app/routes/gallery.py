from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
import uuid
from app.schemas.models import GalleryCreate
from app.database import read_db, write_db
from app.auth_utils import require_admin

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])

@router.get("")
def list_gallery(category: Optional[str] = None):
    db = read_db()
    items = db.get("gallery", [])
    if category and category.lower() != "all":
        items = [g for g in items if g.get("category", "").lower() == category.lower()]
    return {"gallery": items}

@router.post("", dependencies=[Depends(require_admin)])
def create_gallery_item(payload: GalleryCreate):
    db = read_db()
    new_item = {
        "id": f"gal-{uuid.uuid4().hex[:6]}",
        "title": payload.title,
        "category": payload.category,
        "image_url": payload.image_url,
        "is_featured": payload.is_featured,
        "created_at": "2026-09-17T10:00:00Z"
    }
    db["gallery"].append(new_item)
    write_db(db)
    return {"success": True, "gallery_item": new_item}

@router.delete("/{gal_id}", dependencies=[Depends(require_admin)])
def delete_gallery_item(gal_id: str):
    db = read_db()
    db["gallery"] = [g for g in db.get("gallery", []) if g["id"] != gal_id]
    write_db(db)
    return {"success": True}
