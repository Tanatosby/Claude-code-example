# Dashboard Control Panel - Plan

## Context Summary
5 industrial machines from context notebooks:
- **EC101**: 40 tags (Picadora 1&2, Desfibrador, Conductores)
- **Turbina**: 35 tags (Condensador, Lubricacion, Parámetros Operación/Estado)
- **Caldero**: 33 tags (Flujos, Presiones, Temperaturas, Dosadores)
- **Difusor**: 34 tags (AguaImbibicion, Bombas, Captadores, Motor, Reductor)
- **Molino**: 18 tags (UH, Masa, Motor, Reductor)

---

## Checklist

- [x] 1. Scaffold project structure (`package.json`, folders: `public/`, `views/`, `routes/`, `src/`)
- [x] 2. Install dependencies: `express`, `express-session`, `socket.io`, `bcryptjs`
- [x] 3. Create `server.js` — Express app, session middleware, Socket.io setup
- [x] 4. Create `routes/auth.js` — login GET/POST routes with session guard
- [x] 5. Create `public/login.html` — login page (user: admin / pass: admin123)
- [x] 6. Create `src/machineData.js` — tag definitions + thresholds per machine + random data generator
- [x] 7. Create `src/chatbot.js` — simple rule-based AI chatbot responses about machines
- [x] 8. Create `public/dashboard.html` — main dashboard page with:
    - Header with filter buttons (All / EC101 / Turbina / Caldero / Difusor / Molino)
    - Cards grid per machine showing live sensor values
    - Threshold status indicator (green/yellow/red) per tag
    - Chart.js mini-trend charts per machine
    - AI Chatbot panel at the bottom
- [x] 9. Create `public/css/style.css` — dark industrial theme styling
- [x] 10. Create `public/js/dashboard.js` — Socket.io client, filter logic, chart updates, chatbot UI
- [x] 11. Test full flow: login → dashboard → filter → real-time updates → chatbot

---

## Architecture
```
express (port 3000)
├── GET  /          → redirect to /login or /dashboard
├── GET  /login     → serve login page
├── POST /login     → validate, create session, redirect /dashboard
├── GET  /dashboard → serve dashboard (session required)
├── POST /logout    → destroy session
└── socket.io       → emit random sensor data every 2s per machine
```

## Review

### Changes Made
| File | Purpose |
|------|---------|
| `package.json` | Project config, dependencies: express, express-session, socket.io, bcryptjs |
| `server.js` | Express server with Socket.io; broadcasts random sensor data every 2s; serves session |
| `routes/auth.js` | Login/logout routes; bcrypt password check; session creation |
| `src/machineData.js` | 160+ sensor tags across 5 machines with realistic ranges, thresholds, and drift-based random generator |
| `src/chatbot.js` | Rule-based chatbot; responds to queries about machines, tags, alarms, status |
| `public/login.html` | Login form (admin/admin123, operador/op2024); error handling |
| `public/dashboard.html` | Dashboard shell: header, filter nav, summary bar, machine container, chatbot panel |
| `public/css/style.css` | Dark industrial theme; status colors green/yellow/red; responsive; chatbot layout |
| `public/js/dashboard.js` | Socket.io client; real-time card updates; Chart.js trend lines; filter logic; chatbot UI |

### Verified
- ✅ `GET /login` → 200 OK
- ✅ `POST /login` (valid creds) → 302 → `/dashboard`
- ✅ `GET /dashboard` (no session) → 302 → `/login`
- ✅ `GET /dashboard` (with session) → 200 OK
- ✅ All Node modules load without errors

### Credentials
- `admin` / `admin123`
- `operador` / `op2024`

### Run
```bash
node server.js
# open http://localhost:3000
```
