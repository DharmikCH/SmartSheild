# SmartGuard

A smart contract security analyzer that scans Solidity source code for common vulnerabilities using static analysis. Paste your code, get a full security report — risk score, vulnerability breakdown, and fix suggestions — in seconds.

## The Problem

Deploying a vulnerable smart contract to a blockchain is irreversible. Bugs like reentrancy, unrestricted minting, and unchecked external calls have led to millions of dollars in exploits. Most auditing tools are either expensive, slow, or require complex setup.

SmartGuard gives developers a fast, free way to catch common Solidity vulnerabilities before deployment, with clear explanations and code-level fix suggestions.

## What It Detects

| Vulnerability | Severity | Description |
|---|---|---|
| Reentrancy | Critical | External calls made before state updates |
| Selfdestruct | Critical | Use of `selfdestruct`, which can permanently destroy a contract |
| Unrestricted Mint | High | Mint functions without access control |
| Unchecked External Call | High | `.call{}` return values not verified |
| Owner-only Withdraw | Medium | Centralized withdrawal control without timelocks or multi-sig |

Each detected issue includes the affected line number, an explanation, and side-by-side unsafe/safe code examples.

## How It Works

```
┌──────────────┐      POST /api/analyze/      ┌──────────────────┐
│              │  ──────────────────────────> │                  │
│   React UI   │                              │  Django Backend  │
│   (Vite)     │  <────────────────────────── │                  │
│              │      JSON report             │  ┌────────────┐  │
└──────────────┘                              │  │  Analysis  │  │
                                              │  │  Engine    │  │
                                              │  │  (regex)   │  │
                                              │  └────────────┘  │
                                              │  ┌────────────┐  │
                                              │  │  SQLite DB │  │
                                              │  └────────────┘  │
                                              └──────────────────┘
```

1. User pastes Solidity code into the frontend
2. Frontend sends the code to the Django REST API
3. The analysis engine scans the code using regex-based pattern matching
4. Results are stored in SQLite and returned as JSON
5. Frontend renders the report with a risk score, severity chart, health checklist, and per-vulnerability cards with fix suggestions

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Recharts, React Syntax Highlighter
- **Backend:** Django 6, Django REST Framework
- **Database:** SQLite (default, no setup required)

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/DharmikCH/SmartSheild.git
cd SmartSheild
```

### 2. Set up the backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173/`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/analyze/` | Submit Solidity code for analysis |
| `GET` | `/api/reports/` | List all analyzed contracts |
| `GET` | `/api/reports/:id/` | Get full report for a specific contract |

### Example request

```bash
curl -X POST http://localhost:8000/api/analyze/ \
  -H "Content-Type: application/json" \
  -d '{"code": "pragma solidity ^0.8.0; ...", "name": "MyContract"}'
```

## Project Structure

```
SmartSheild/
├── backend/
│   ├── analyzer/
│   │   ├── analysis_engine.py   # Vulnerability detection logic
│   │   ├── models.py            # Contract and Vulnerability models
│   │   ├── serializers.py       # DRF serializers
│   │   ├── urls.py              # API routes
│   │   └── views.py             # API views
│   ├── smartcontract_platform/  # Django project settings
│   ├── db.sqlite3
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/          # Layout, Topbar
│   │   ├── pages/               # Landing, Dashboard, Analyzer, Report, History
│   │   ├── api.js               # Axios API client
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## License

This project is for educational purposes.
