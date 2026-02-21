# CareCircle 🌵

> Phoenix senior care platform — FastAPI backend + React frontend
> Deploys as a single web service on Render

---

## Project Structure

```
carecircle/                   ← git repo root
├── render.yaml               ← Render Blueprint (auto-configures everything)
├── .gitignore
├── README.md
│
├── backend/
│   ├── __init__.py
│   ├── main.py               ← FastAPI app + all API routes
│   ├── models.py             ← Pydantic schemas
│   ├── database.py           ← In-memory store (swap for PostgreSQL later)
│   └── requirements.txt
│
└── frontend/
    ├── index.html            ← Vite entry point
    ├── package.json
    ├── vite.config.js        ← Dev proxy + build config
    └── src/
        ├── main.jsx          ← React entry
        ├── App.jsx           ← Full CareCircle UI
        └── api.js            ← Typed API client
```

---

## Deploy to Render (via Git)

### 1. Push to GitHub

```bash
cd carecircle
git init
git add .
git commit -m "Initial CareCircle commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carecircle.git
git push -u origin main
```

### 2. Connect to Render

1. Go to render.com → New → Blueprint
2. Connect your GitHub account, select the carecircle repo
3. Render reads render.yaml automatically — click Apply
4. Wait ~3 minutes for build + deploy

Your live URL: https://carecircle.onrender.com
API docs:      https://carecircle.onrender.com/docs

---

## Local Development

Backend:
```bash
python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

Frontend (separate terminal):
```bash
cd frontend
npm install
npm run dev
```

---

## Demo Credentials

| Role   | Email           | Password |
|--------|-----------------|----------|
| Family | family@demo.com | demo     |
| Helper | helper@demo.com | demo     |
| Admin  | admin@demo.com  | demo     |
