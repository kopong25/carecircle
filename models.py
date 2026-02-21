"""
CareCircle – Pydantic Models
All request/response schemas for the FastAPI routes.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum


# ── Enums ─────────────────────────────────────────────────────────────────────

class HelperStatus(str, Enum):
    pending   = "pending"
    active    = "active"
    suspended = "suspended"

class BookingStatus(str, Enum):
    pending   = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class BookingFrequency(str, Enum):
    once      = "once"
    weekly    = "weekly"
    biweekly  = "biweekly"

class TicketPriority(str, Enum):
    low    = "low"
    medium = "medium"
    high   = "high"
    urgent = "urgent"

class ApplicationStatus(str, Enum):
    pending  = "pending"
    approved = "approved"
    rejected = "rejected"

class UserRole(str, Enum):
    family = "family"
    helper = "helper"
    admin  = "admin"


# ── Auth ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    user_id: str
    role: UserRole
    name: str
    token: str


# ── Helper ────────────────────────────────────────────────────────────────────

class Helper(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    emoji: str = "🧑"
    neighborhood: str
    zip_code: str
    rating: float = 5.0
    total_jobs: int = 0
    total_hours: float = 0.0
    skills: list[str] = []
    languages: list[str] = ["English"]
    rate: float = 17.0
    availability_days: list[str] = []
    availability_time: str = "Flexible"
    status: HelperStatus = HelperStatus.pending
    bio: Optional[str] = None
    client_note: Optional[str] = None   # surfaced to families on the card
    created_at: datetime = Field(default_factory=datetime.now)

class HelperCreate(BaseModel):
    name: str
    email: str
    phone: str
    neighborhood: str
    zip_code: str
    skills: list[str]
    languages: list[str] = ["English"]
    rate: float = 17.0
    availability_days: list[str] = []
    availability_time: str = "Flexible"
    bio: Optional[str] = None

class HelperUpdate(BaseModel):
    skills: Optional[list[str]] = None
    rate: Optional[float] = None
    availability_days: Optional[list[str]] = None
    availability_time: Optional[str] = None
    bio: Optional[str] = None
    client_note: Optional[str] = None
    status: Optional[HelperStatus] = None


# ── Family ────────────────────────────────────────────────────────────────────

class Family(BaseModel):
    id: str
    name: str                       # family surname, e.g. "Johnson Family"
    email: str
    phone: str
    zip_code: str
    senior_name: Optional[str] = None
    senior_age: Optional[int] = None
    senior_notes: Optional[str] = None   # e.g. "diabetic, loves golf"
    premium: bool = False
    trusted_circle: list[str] = []       # list of helper IDs
    created_at: datetime = Field(default_factory=datetime.now)

class FamilyCreate(BaseModel):
    name: str
    email: str
    phone: str
    zip_code: str
    senior_name: Optional[str] = None
    senior_age: Optional[int] = None
    senior_notes: Optional[str] = None


# ── Booking ───────────────────────────────────────────────────────────────────

class Booking(BaseModel):
    id: str
    family_id: str
    helper_id: str
    helper_name: str
    service_type: str
    date: str                    # ISO date string
    time: str                    # e.g. "09:00"
    duration_hours: float
    rate: float
    total: float
    recurring: BookingFrequency = BookingFrequency.once
    notes: Optional[str] = None
    status: BookingStatus = BookingStatus.pending
    rating: Optional[int] = None
    review: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

class BookingCreate(BaseModel):
    family_id: str
    helper_id: str
    service_type: str
    date: str
    time: str
    duration_hours: float
    recurring: BookingFrequency = BookingFrequency.once
    notes: Optional[str] = None


# ── Helper Application (enrollment) ──────────────────────────────────────────

class HelperApplication(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    phone: str
    zip_code: str
    languages: list[str]
    skills: list[str]
    availability_days: list[str]
    availability_time: str
    rate: float
    referral_source: Optional[str] = None
    has_video: bool = False
    agreed_to_terms: bool
    status: ApplicationStatus = ApplicationStatus.pending
    submitted_at: datetime = Field(default_factory=datetime.now)

class HelperApplicationCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    zip_code: str
    languages: list[str] = ["English"]
    skills: list[str]
    availability_days: list[str]
    availability_time: str = "Flexible"
    rate: float = 17.0
    referral_source: Optional[str] = None
    has_video: bool = False
    agreed_to_terms: bool


# ── Support Ticket ────────────────────────────────────────────────────────────

class SupportTicket(BaseModel):
    id: str
    subject: str
    description: str
    reporter_id: str
    reporter_role: UserRole
    priority: TicketPriority = TicketPriority.medium
    status: str = "open"
    created_at: datetime = Field(default_factory=datetime.now)
    resolved_at: Optional[datetime] = None

class SupportTicketCreate(BaseModel):
    subject: str
    description: str
    reporter_id: str
    reporter_role: UserRole
    priority: TicketPriority = TicketPriority.medium
