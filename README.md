# 🏭 Panel de Control Industrial

Sistema de monitoreo en tiempo real para activos industriales (EC101, Turbina, Caldero, Difusor, Molino), construido con Node.js, Socket.io y Chart.js.

---

## Instalación

### 1. Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [Git](https://git-scm.com/)

---

### 2. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/claude-code-example.git
cd claude-code-example
```

> Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.

---

### 3. Instalar dependencias

```bash
npm install
```

Esto instalará: `express`, `express-session`, `socket.io`, `bcryptjs`.

---

### 4. Iniciar el servidor

```bash
node server.js
```

Verás en la terminal:

```
🏭  Industrial Dashboard running at http://localhost:3000
    Login: admin / admin123  |  operador / op2024
```

---

### 5. Abrir en el navegador

Navega a:

```
http://localhost:3000
```

---

## Credenciales de acceso

| Usuario    | Contraseña |
|------------|------------|
| `admin`    | `admin123` |
| `operador` | `op2024`   |

---

## Estructura del proyecto

```
claude-code-example/
├── server.js               # Servidor principal (Express + Socket.io)
├── routes/
│   └── auth.js             # Rutas de login y logout
├── src/
│   ├── machineData.js      # Tags, umbrales y generador de datos aleatorios
│   └── chatbot.js          # Asistente IA basado en reglas
└── public/
    ├── login.html          # Página de inicio de sesión
    ├── dashboard.html      # Panel de control principal
    ├── css/
    │   └── style.css       # Tema oscuro industrial
    └── js/
        └── dashboard.js    # Lógica cliente: Socket.io, filtros, charts, chatbot
```

---

## Funcionalidades

- **Sesión segura** — login con bcrypt, sesión de 8 horas
- **Filtro por activo** — visualiza todos o uno solo: EC101, Turbina, Caldero, Difusor, Molino
- **Datos en tiempo real** — actualización cada 2 segundos via Socket.io (datos aleatorios simulando Azure ML)
- **Umbrales (🟢/🟡/🔴)** — cada tag muestra su estado: Normal, Advertencia o Alarma
- **Gráficas de tendencia** — historial de 30 puntos por activo con Chart.js
- **Asistente IA** — chatbot en la parte inferior para consultas sobre la planta

---

## Activos monitoreados

| Activo    | Descripción                        | Tags |
|-----------|------------------------------------|------|
| EC101     | Preparación de caña (Picadoras, Desfibrador, Conductores) | 40 |
| Turbina   | Generación de energía (Condensador, Lubricación, Parámetros) | 35 |
| Caldero   | Generación de vapor (Flujos, Presiones, Temperaturas, Dosadores) | 33 |
| Difusor   | Extracción de jugo (Bombas, Captadores, Motor, Reductor) | 34 |
| Molino    | Molienda de caña (Motor, UH, Masa, Reductor) | 18 |

---

## Tecnologías

- **Backend:** Node.js, Express, Socket.io, express-session, bcryptjs
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Chart.js
- **Datos:** Generación aleatoria con deriva suave (simula ingesta desde Azure ML)
