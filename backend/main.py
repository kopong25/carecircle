"""
CareCircle – FastAPI Backend
Run locally: uvicorn backend.main:app --reload --port 8000
Docs:        http://localhost:8000/docs
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from datetime import datetime
from typing import Optional
import os

from backend.models import (
    Helper, HelperCreate, HelperUpdate,
    Family, FamilyCreate,
    Booking, BookingCreate,
    HelperApplication, HelperApplicationCreate,
    SupportTicket, SupportTicketCreate,
    LoginRequest, LoginResponse,
)
from backend.database import db

app = FastAPI(
    title="CareCircle API",
    description="Backend for CareCircle — Phoenix senior care platform",
    version="1.0.0",
)

# ── CORS (allow React dev server) ─────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ══════════════════════════════════════════════════════════════════════════════
# AUTH
# ══════════════════════════════════════════════════════════════════════════════

@app.post("/api/auth/login", response_model=LoginResponse, tags=["Auth"])
def login(body: LoginRequest):
    """Sign in — returns role so frontend routes to the correct dashboard."""
    user = db.find_user(body.email, body.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return LoginResponse(
        user_id=user["id"],
        role=user["role"],
        name=user["name"],
        token=f"mock-token-{user['id']}",
    )

@app.post("/api/auth/register", tags=["Auth"])
def register(body: FamilyCreate):
    family = db.create_family(body)
    return {"message": "Account created", "user_id": family.id, "role": "family"}


# ══════════════════════════════════════════════════════════════════════════════
# HELPERS
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/api/helpers", response_model=list[Helper], tags=["Helpers"])
def list_helpers(
    zip_code: Optional[str] = None,
    skill: Optional[str] = None,
    language: Optional[str] = None,
    min_rating: Optional[float] = None,
):
    return db.get_helpers(zip_code=zip_code, skill=skill, language=language, min_rating=min_rating)

@app.get("/api/helpers/{helper_id}", response_model=Helper, tags=["Helpers"])
def get_helper(helper_id: str):
    helper = db.get_helper(helper_id)
    if not helper:
        raise HTTPException(status_code=404, detail="Helper not found")
    return helper

@app.patch("/api/helpers/{helper_id}", response_model=Helper, tags=["Helpers"])
def update_helper(helper_id: str, body: HelperUpdate):
    helper = db.update_helper(helper_id, body)
    if not helper:
        raise HTTPException(status_code=404, detail="Helper not found")
    return helper

@app.get("/api/helpers/{helper_id}/earnings", tags=["Helpers"])
def get_earnings(helper_id: str, month: Optional[str] = None):
    return db.get_earnings(helper_id, month or datetime.now().strftime("%Y-%m"))

@app.get("/api/helpers/{helper_id}/jobs", tags=["Helpers"])
def get_helper_jobs(helper_id: str, status: Optional[str] = None):
    return db.get_helper_jobs(helper_id, status)


# ══════════════════════════════════════════════════════════════════════════════
# HELPER APPLICATIONS
# ══════════════════════════════════════════════════════════════════════════════

@app.post("/api/applications", status_code=status.HTTP_201_CREATED, tags=["Applications"])
def submit_application(body: HelperApplicationCreate):
    app_record = db.create_application(body)
    return {"message": "Application received! We'll review within 24–48 hours.", "application_id": app_record.id, "status": "pending"}

@app.get("/api/applications", response_model=list[HelperApplication], tags=["Applications"])
def list_applications(status: Optional[str] = None):
    return db.get_applications(status)

@app.patch("/api/applications/{app_id}/approve", tags=["Applications"])
def approve_application(app_id: str):
    result = db.approve_application(app_id)
    if not result:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Helper approved and notified", "helper_id": result}

@app.patch("/api/applications/{app_id}/reject", tags=["Applications"])
def reject_application(app_id: str, reason: Optional[str] = "Does not meet requirements"):
    result = db.reject_application(app_id, reason)
    if not result:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"message": "Application rejected"}


# ══════════════════════════════════════════════════════════════════════════════
# FAMILIES
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/api/families/{family_id}", response_model=Family, tags=["Families"])
def get_family(family_id: str):
    family = db.get_family(family_id)
    if not family:
        raise HTTPException(status_code=404, detail="Family not found")
    return family

@app.get("/api/families/{family_id}/trusted-circle", tags=["Families"])
def get_trusted_circle(family_id: str):
    return db.get_trusted_circle(family_id)

@app.post("/api/families/{family_id}/trusted-circle/{helper_id}", tags=["Families"])
def add_to_trusted_circle(family_id: str, helper_id: str):
    db.add_trusted(family_id, helper_id)
    return {"message": "Helper added to Trusted Circle"}


# ══════════════════════════════════════════════════════════════════════════════
# BOOKINGS
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/api/bookings", response_model=list[Booking], tags=["Bookings"])
def list_bookings(family_id: Optional[str] = None, helper_id: Optional[str] = None):
    return db.get_bookings(family_id=family_id, helper_id=helper_id)

@app.post("/api/bookings", response_model=Booking, status_code=status.HTTP_201_CREATED, tags=["Bookings"])
def create_booking(body: BookingCreate):
    return db.create_booking(body)

@app.patch("/api/bookings/{booking_id}/cancel", tags=["Bookings"])
def cancel_booking(booking_id: str):
    result = db.cancel_booking(booking_id)
    if not result:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking cancelled"}

@app.post("/api/bookings/{booking_id}/review", tags=["Bookings"])
def submit_review(booking_id: str, rating: int, comment: str):
    if not 1 <= rating <= 5:
        raise HTTPException(status_code=422, detail="Rating must be 1–5")
    db.add_review(booking_id, rating, comment)
    return {"message": "Review submitted — thank you!"}


# ══════════════════════════════════════════════════════════════════════════════
# ADMIN
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/api/admin/overview", tags=["Admin"])
def admin_overview():
    return db.get_admin_overview()

@app.get("/api/admin/support", response_model=list[SupportTicket], tags=["Admin"])
def list_tickets(status: Optional[str] = None):
    return db.get_tickets(status)

@app.post("/api/admin/support", response_model=SupportTicket, tags=["Admin"])
def create_ticket(body: SupportTicketCreate):
    return db.create_ticket(body)

@app.patch("/api/admin/support/{ticket_id}/resolve", tags=["Admin"])
def resolve_ticket(ticket_id: str):
    result = db.resolve_ticket(ticket_id)
    if not result:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"message": "Ticket resolved"}


# ══════════════════════════════════════════════════════════════════════════════
# HEAT ALERTS (Phoenix-specific)
# ══════════════════════════════════════════════════════════════════════════════

@app.get("/api/heat-alert", tags=["Phoenix Features"])
def heat_alert():
    """Current heat advisory. Production: wire to api.weather.gov."""
    hour = datetime.now().hour
    is_advisory = 10 <= hour < 16
    return {
        "advisory_active": is_advisory,
        "message": "Outdoor errands not recommended 10am–4pm" if is_advisory else "Safe for outdoor activity",
        "safe_windows": ["Before 10:00am", "After 4:00pm"],
    }


# ══════════════════════════════════════════════════════════════════════════════
# SERVE REACT FRONTEND (production — after `npm run build`)
# ══════════════════════════════════════════════════════════════════════════════

# Path from repo root: /frontend/dist
REPO_ROOT     = os.path.join(os.path.dirname(__file__), "..")
FRONTEND_DIST = os.path.abspath(os.path.join(REPO_ROOT, "frontend", "dist"))

if os.path.exists(FRONTEND_DIST):
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="static")
else:
    @app.get("/")
    def root():
        return {
            "status": "CareCircle API is running",
            "docs": "/docs",
            "note": "Frontend not built yet. Run: cd frontend && npm install && npm run build",
        }
