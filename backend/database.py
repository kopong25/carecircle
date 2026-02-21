"""
CareCircle – In-Memory Database
Simulates a real database using Python dicts.
Swap this module out for SQLAlchemy + PostgreSQL in production.
"""

import uuid
from datetime import datetime
from typing import Optional
from backend.models import (
    Helper, HelperCreate, HelperUpdate,
    Family, FamilyCreate,
    Booking, BookingCreate,
    HelperApplication, HelperApplicationCreate,
    SupportTicket, SupportTicketCreate,
    HelperStatus, BookingStatus, BookingFrequency,
    TicketPriority, ApplicationStatus, UserRole,
)


def _id() -> str:
    return str(uuid.uuid4())[:8]


class Database:
    def __init__(self):
        self._users: dict = {}
        self._helpers: dict = {}
        self._families: dict = {}
        self._bookings: dict = {}
        self._applications: dict = {}
        self._tickets: dict = {}
        self._trusted: dict = {}   # family_id -> [helper_id]
        self._seed()

    # ── SEED DATA ──────────────────────────────────────────────────────────────

    def _seed(self):
        # ── Users (for auth simulation) ──────────────────────────────────────
        self._users = {
            "family@demo.com":  {"id": "fam-001", "name": "Johnson Family", "role": "family",  "password": "demo"},
            "helper@demo.com":  {"id": "hlp-001", "name": "Maria González", "role": "helper",  "password": "demo"},
            "admin@demo.com":   {"id": "adm-001", "name": "Admin",          "role": "admin",   "password": "demo"},
        }

        # ── Helpers ───────────────────────────────────────────────────────────
        helpers_seed = [
            dict(id="hlp-001", name="Maria González",  emoji="👩",   neighborhood="Ahwatukee, Phoenix", zip_code="85044",
                 rating=4.9, total_jobs=87,  total_hours=312, skills=["Errands","Companionship","Meal Prep"],
                 languages=["English","Spanish"], rate=17, availability_days=["Mon","Wed","Fri","Sat"],
                 availability_time="Mornings", status=HelperStatus.active,
                 client_note="Loves gardening talk; brings homemade tamales!",
                 email="maria@demo.com", phone="(602)555-0101"),
            dict(id="hlp-002", name="James Whitfield", emoji="👨🏾", neighborhood="Scottsdale",          zip_code="85254",
                 rating=4.8, total_jobs=63,  total_hours=218, skills=["Transportation","Shopping","Companionship"],
                 languages=["English"], rate=18, availability_days=["Tue","Thu","Sat"],
                 availability_time="Afternoons", status=HelperStatus.active,
                 client_note="Former teacher; very patient & punctual",
                 email="james@demo.com", phone="(602)555-0102"),
            dict(id="hlp-003", name="Sandra Kowalski", emoji="👩🏼", neighborhood="Tempe",               zip_code="85281",
                 rating=5.0, total_jobs=41,  total_hours=152, skills=["Light Housework","Meal Prep","Companionship"],
                 languages=["English"], rate=16, availability_days=["Mon","Tue","Wed","Thu","Fri"],
                 availability_time="Flexible", status=HelperStatus.active,
                 client_note="Diabetic-meal specialist; non-smoker household only",
                 email="sandra@demo.com", phone="(602)555-0103"),
            dict(id="hlp-004", name="Luis Ramírez",    emoji="👨",   neighborhood="Mesa",                zip_code="85201",
                 rating=4.7, total_jobs=29,  total_hours=98,  skills=["Errands","Tech Help"],
                 languages=["English","Spanish"], rate=15, availability_days=["Wed","Fri","Sat","Sun"],
                 availability_time="Evenings", status=HelperStatus.active,
                 client_note="Great with phones & tablets; super helpful with Zoom calls",
                 email="luis@demo.com", phone="(602)555-0104"),
            dict(id="hlp-005", name="Patricia Chen",   emoji="👩🏻", neighborhood="Chandler",            zip_code="85224",
                 rating=4.9, total_jobs=55,  total_hours=196, skills=["Shopping","Transportation","Companionship"],
                 languages=["English","Spanish","Mandarin"], rate=18, availability_days=["Mon","Wed","Fri"],
                 availability_time="Mornings", status=HelperStatus.active,
                 client_note="Trilingual; experienced with memory care family members",
                 email="patricia@demo.com", phone="(602)555-0105"),
            dict(id="hlp-006", name="Robert Hawkins",  emoji="👴🏽", neighborhood="Glendale",            zip_code="85301",
                 rating=4.8, total_jobs=72,  total_hours=260, skills=["Yardwork","Errands","Light Housework"],
                 languages=["English"], rate=17, availability_days=["Tue","Thu","Sat","Sun"],
                 availability_time="Afternoons", status=HelperStatus.active,
                 client_note="Retired contractor; safe driver with clean record",
                 email="robert@demo.com", phone="(602)555-0106"),
        ]
        for h in helpers_seed:
            self._helpers[h["id"]] = Helper(**h)

        # ── Family ────────────────────────────────────────────────────────────
        fam = Family(
            id="fam-001", name="Johnson Family", email="family@demo.com",
            phone="(602)555-1000", zip_code="85044",
            senior_name="Eleanor Johnson", senior_age=78,
            senior_notes="Loves golf talk. Diabetic but very independent.",
            premium=False, trusted_circle=["hlp-001","hlp-002","hlp-003","hlp-004"],
        )
        self._families[fam.id] = fam
        self._trusted[fam.id] = fam.trusted_circle[:]

        # ── Bookings ──────────────────────────────────────────────────────────
        bookings_seed = [
            dict(id="bk-001", family_id="fam-001", helper_id="hlp-001", helper_name="Maria González",
                 service_type="Errands / Shopping", date="2026-02-24", time="09:00",
                 duration_hours=2, rate=17, total=34, recurring=BookingFrequency.weekly,
                 notes="Grocery run + pharmacy", status=BookingStatus.confirmed),
            dict(id="bk-002", family_id="fam-001", helper_id="hlp-002", helper_name="James Whitfield",
                 service_type="Companionship", date="2026-02-27", time="10:30",
                 duration_hours=1.5, rate=18, total=27, recurring=BookingFrequency.weekly,
                 notes="Morning chat + light walk", status=BookingStatus.confirmed),
            dict(id="bk-003", family_id="fam-001", helper_id="hlp-003", helper_name="Sandra Kowalski",
                 service_type="Meal Prep", date="2026-02-15", time="11:00",
                 duration_hours=3, rate=16, total=48, recurring=BookingFrequency.once,
                 notes="Week's cooking session", status=BookingStatus.completed,
                 rating=5, review="Sandra was wonderful! Food lasted all week."),
            dict(id="bk-004", family_id="fam-001", helper_id="hlp-004", helper_name="Luis Ramírez",
                 service_type="Tech Help", date="2026-03-05", time="14:00",
                 duration_hours=1, rate=15, total=15, recurring=BookingFrequency.once,
                 notes="Phone & tablet setup", status=BookingStatus.pending),
        ]
        for b in bookings_seed:
            self._bookings[b["id"]] = Booking(**b)

        # ── Pending applications ───────────────────────────────────────────────
        apps_seed = [
            dict(id="app-001", first_name="Amelia", last_name="Torres", email="amelia@demo.com",
                 phone="(602)555-2001", zip_code="85201", languages=["English","Spanish"],
                 skills=["Errands","Companionship"], availability_days=["Sat","Sun"],
                 availability_time="Evenings", rate=16, referral_source="Facebook",
                 has_video=True, agreed_to_terms=True, status=ApplicationStatus.pending),
            dict(id="app-002", first_name="Kevin", last_name="Park", email="kevin@demo.com",
                 phone="(602)555-2002", zip_code="85254", languages=["English"],
                 skills=["Transportation","Shopping","Tech Help"], availability_days=["Mon","Tue","Wed","Thu","Fri"],
                 availability_time="Mornings", rate=18, referral_source="Nextdoor",
                 has_video=True, agreed_to_terms=True, status=ApplicationStatus.pending),
            dict(id="app-003", first_name="Diana", last_name="Osei", email="diana@demo.com",
                 phone="(602)555-2003", zip_code="85044", languages=["English"],
                 skills=["Companionship","Light Housework","Meal Prep"], availability_days=["Mon","Wed","Fri","Sat","Sun"],
                 availability_time="Flexible", rate=16, referral_source="Senior center",
                 has_video=False, agreed_to_terms=True, status=ApplicationStatus.pending),
        ]
        for a in apps_seed:
            self._applications[a["id"]] = HelperApplication(**a)

        # ── Support tickets ───────────────────────────────────────────────────
        tickets_seed = [
            dict(id="T-291", subject="Helper no-show", description="Maria didn't arrive for Tuesday errand run.",
                 reporter_id="fam-001", reporter_role=UserRole.family, priority=TicketPriority.urgent, status="open"),
            dict(id="T-288", subject="Payment dispute", description="Double charge on Feb 18.",
                 reporter_id="fam-001", reporter_role=UserRole.family, priority=TicketPriority.medium, status="open"),
            dict(id="T-285", subject="Background check upload error", description="PDF won't upload.",
                 reporter_id="app-002", reporter_role=UserRole.helper, priority=TicketPriority.low, status="open"),
            dict(id="T-282", subject="Language preference", description="Requesting Spanish-speaking helper only.",
                 reporter_id="fam-001", reporter_role=UserRole.family, priority=TicketPriority.low, status="open"),
        ]
        for t in tickets_seed:
            self._tickets[t["id"]] = SupportTicket(**t)

    # ── AUTH ───────────────────────────────────────────────────────────────────

    def find_user(self, email: str, password: str) -> Optional[dict]:
        user = self._users.get(email.lower())
        if user and user["password"] == password:
            return user
        return None

    # ── HELPERS ────────────────────────────────────────────────────────────────

    def get_helpers(self, zip_code=None, skill=None, language=None, min_rating=None) -> list[Helper]:
        results = [h for h in self._helpers.values() if h.status == HelperStatus.active]
        if zip_code:
            results = [h for h in results if h.zip_code == zip_code]
        if skill:
            results = [h for h in results if any(skill.lower() in s.lower() for s in h.skills)]
        if language:
            results = [h for h in results if any(language.lower() in l.lower() for l in h.languages)]
        if min_rating:
            results = [h for h in results if h.rating >= min_rating]
        return results

    def get_helper(self, helper_id: str) -> Optional[Helper]:
        return self._helpers.get(helper_id)

    def update_helper(self, helper_id: str, body: HelperUpdate) -> Optional[Helper]:
        helper = self._helpers.get(helper_id)
        if not helper:
            return None
        updated = helper.model_copy(update=body.model_dump(exclude_none=True))
        self._helpers[helper_id] = updated
        return updated

    def get_earnings(self, helper_id: str, month: str) -> dict:
        bookings = [b for b in self._bookings.values()
                    if b.helper_id == helper_id and b.status == BookingStatus.completed
                    and b.date.startswith(month)]
        total = sum(b.total for b in bookings)
        hours = sum(b.duration_hours for b in bookings)
        return {
            "month": month,
            "total_earned": round(total, 2),
            "total_hours": round(hours, 1),
            "jobs_completed": len(bookings),
            "weekly_breakdown": [
                {"week": "W1", "amount": round(total * 0.19, 2)},
                {"week": "W2", "amount": round(total * 0.25, 2)},
                {"week": "W3", "amount": round(total * 0.31, 2)},
                {"week": "W4", "amount": round(total * 0.25, 2)},
            ],
        }

    def get_helper_jobs(self, helper_id: str, status: Optional[str]) -> list[Booking]:
        jobs = [b for b in self._bookings.values() if b.helper_id == helper_id]
        if status:
            jobs = [j for j in jobs if j.status.value == status]
        return jobs

    # ── FAMILIES ───────────────────────────────────────────────────────────────

    def create_family(self, body: FamilyCreate) -> Family:
        fam_id = _id()
        fam = Family(id=fam_id, **body.model_dump())
        self._families[fam_id] = fam
        self._trusted[fam_id] = []
        self._users[body.email.lower()] = {"id": fam_id, "name": body.name, "role": "family", "password": "demo"}
        return fam

    def get_family(self, family_id: str) -> Optional[Family]:
        return self._families.get(family_id)

    def get_trusted_circle(self, family_id: str) -> list[Helper]:
        ids = self._trusted.get(family_id, [])
        return [self._helpers[i] for i in ids if i in self._helpers]

    def add_trusted(self, family_id: str, helper_id: str):
        if family_id not in self._trusted:
            self._trusted[family_id] = []
        if helper_id not in self._trusted[family_id]:
            self._trusted[family_id].append(helper_id)

    # ── BOOKINGS ───────────────────────────────────────────────────────────────

    def get_bookings(self, family_id=None, helper_id=None) -> list[Booking]:
        results = list(self._bookings.values())
        if family_id:
            results = [b for b in results if b.family_id == family_id]
        if helper_id:
            results = [b for b in results if b.helper_id == helper_id]
        return sorted(results, key=lambda b: b.date)

    def create_booking(self, body: BookingCreate) -> Booking:
        helper = self._helpers.get(body.helper_id)
        if not helper:
            raise ValueError("Helper not found")
        booking_id = _id()
        total = round(body.duration_hours * helper.rate, 2)
        booking = Booking(
            id=booking_id,
            family_id=body.family_id,
            helper_id=body.helper_id,
            helper_name=helper.name,
            service_type=body.service_type,
            date=body.date,
            time=body.time,
            duration_hours=body.duration_hours,
            rate=helper.rate,
            total=total,
            recurring=body.recurring,
            notes=body.notes,
            status=BookingStatus.pending,
        )
        self._bookings[booking_id] = booking
        return booking

    def cancel_booking(self, booking_id: str) -> bool:
        booking = self._bookings.get(booking_id)
        if not booking:
            return False
        self._bookings[booking_id] = booking.model_copy(update={"status": BookingStatus.cancelled})
        return True

    def add_review(self, booking_id: str, rating: int, comment: str):
        booking = self._bookings.get(booking_id)
        if booking:
            self._bookings[booking_id] = booking.model_copy(update={"rating": rating, "review": comment})
            # update helper avg rating (simplified)
            helper = self._helpers.get(booking.helper_id)
            if helper:
                new_rating = round((helper.rating * helper.total_jobs + rating) / (helper.total_jobs + 1), 2)
                self._helpers[booking.helper_id] = helper.model_copy(
                    update={"rating": new_rating, "total_jobs": helper.total_jobs + 1,
                            "total_hours": helper.total_hours + booking.duration_hours}
                )

    # ── APPLICATIONS ───────────────────────────────────────────────────────────

    def create_application(self, body: HelperApplicationCreate) -> HelperApplication:
        app_id = _id()
        app = HelperApplication(id=app_id, **body.model_dump())
        self._applications[app_id] = app
        return app

    def get_applications(self, status: Optional[str]) -> list[HelperApplication]:
        apps = list(self._applications.values())
        if status:
            apps = [a for a in apps if a.status.value == status]
        return apps

    def approve_application(self, app_id: str) -> Optional[str]:
        app = self._applications.get(app_id)
        if not app:
            return None
        self._applications[app_id] = app.model_copy(update={"status": ApplicationStatus.approved})
        # Create helper account
        helper_id = _id()
        helper = Helper(
            id=helper_id,
            name=f"{app.first_name} {app.last_name}",
            email=app.email,
            phone=app.phone,
            emoji="🧑",
            neighborhood="Phoenix",
            zip_code=app.zip_code,
            skills=app.skills,
            languages=app.languages,
            rate=app.rate,
            availability_days=app.availability_days,
            availability_time=app.availability_time,
            status=HelperStatus.active,
        )
        self._helpers[helper_id] = helper
        self._users[app.email.lower()] = {
            "id": helper_id, "name": helper.name, "role": "helper", "password": "carecircle"
        }
        return helper_id

    def reject_application(self, app_id: str, reason: str) -> bool:
        app = self._applications.get(app_id)
        if not app:
            return False
        self._applications[app_id] = app.model_copy(update={"status": ApplicationStatus.rejected})
        return True

    # ── ADMIN ──────────────────────────────────────────────────────────────────

    def get_admin_overview(self) -> dict:
        active_helpers  = [h for h in self._helpers.values() if h.status == HelperStatus.active]
        all_bookings    = list(self._bookings.values())
        completed       = [b for b in all_bookings if b.status == BookingStatus.completed]
        recurring       = [b for b in all_bookings if b.recurring != BookingFrequency.once]
        platform_revenue = round(sum(b.total for b in completed) * 0.20, 2)
        avg_rating = round(sum(h.rating for h in active_helpers) / len(active_helpers), 2) if active_helpers else 0

        return {
            "active_families":      len(self._families),
            "vetted_helpers":       len(active_helpers),
            "total_bookings":       len(all_bookings),
            "completed_bookings":   len(completed),
            "platform_revenue":     platform_revenue,
            "avg_rating":           avg_rating,
            "recurring_rate":       round(len(recurring) / len(all_bookings) * 100, 1) if all_bookings else 0,
            "pending_applications": len([a for a in self._applications.values() if a.status == ApplicationStatus.pending]),
            "open_tickets":         len([t for t in self._tickets.values() if t.status == "open"]),
        }

    # ── SUPPORT ────────────────────────────────────────────────────────────────

    def get_tickets(self, status: Optional[str]) -> list[SupportTicket]:
        tickets = list(self._tickets.values())
        if status:
            tickets = [t for t in tickets if t.status == status]
        return tickets

    def create_ticket(self, body: SupportTicketCreate) -> SupportTicket:
        ticket_id = f"T-{len(self._tickets) + 300}"
        ticket = SupportTicket(id=ticket_id, **body.model_dump())
        self._tickets[ticket_id] = ticket
        return ticket

    def resolve_ticket(self, ticket_id: str) -> bool:
        ticket = self._tickets.get(ticket_id)
        if not ticket:
            return False
        self._tickets[ticket_id] = ticket.model_copy(
            update={"status": "resolved", "resolved_at": datetime.now()}
        )
        return True


# Singleton instance
db = Database()
