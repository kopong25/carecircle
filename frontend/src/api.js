// api.js — CareCircle API client
// All fetch calls to the FastAPI backend (http://localhost:8000)

const BASE = "http://localhost:8000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("cc_token");
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || res.statusText);
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const api = {
  auth: {
    login:    (email, password) => request("/auth/login",    { method: "POST", body: JSON.stringify({ email, password }) }),
    register: (body)            => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  },

  // ── Helpers ────────────────────────────────────────────────────────────────
  helpers: {
    list:     (params = {}) => request("/helpers?" + new URLSearchParams(params)),
    get:      (id)          => request(`/helpers/${id}`),
    update:   (id, body)    => request(`/helpers/${id}`,          { method: "PATCH", body: JSON.stringify(body) }),
    earnings: (id, month)   => request(`/helpers/${id}/earnings?month=${month}`),
    jobs:     (id, status)  => request(`/helpers/${id}/jobs${status ? `?status=${status}` : ""}`),
  },

  // ── Families ───────────────────────────────────────────────────────────────
  families: {
    get:            (id)          => request(`/families/${id}`),
    trustedCircle:  (id)          => request(`/families/${id}/trusted-circle`),
    addTrusted:     (fid, hid)    => request(`/families/${fid}/trusted-circle/${hid}`, { method: "POST" }),
  },

  // ── Bookings ───────────────────────────────────────────────────────────────
  bookings: {
    list:   (params = {}) => request("/bookings?" + new URLSearchParams(params)),
    create: (body)        => request("/bookings",             { method: "POST",  body: JSON.stringify(body) }),
    cancel: (id)          => request(`/bookings/${id}/cancel`,{ method: "PATCH" }),
    review: (id, rating, comment) =>
      request(`/bookings/${id}/review?rating=${rating}&comment=${encodeURIComponent(comment)}`, { method: "POST" }),
  },

  // ── Applications ───────────────────────────────────────────────────────────
  applications: {
    submit:  (body) => request("/applications",              { method: "POST",  body: JSON.stringify(body) }),
    list:    (status) => request(`/applications${status ? `?status=${status}` : ""}`),
    approve: (id)   => request(`/applications/${id}/approve`,{ method: "PATCH" }),
    reject:  (id)   => request(`/applications/${id}/reject`, { method: "PATCH" }),
  },

  // ── Admin ──────────────────────────────────────────────────────────────────
  admin: {
    overview: ()       => request("/admin/overview"),
    tickets:  (status) => request(`/admin/support${status ? `?status=${status}` : ""}`),
    resolve:  (id)     => request(`/admin/support/${id}/resolve`, { method: "PATCH" }),
  },

  // ── Phoenix features ───────────────────────────────────────────────────────
  heatAlert: () => request("/heat-alert"),
};
