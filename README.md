# DPS Backend Coding Challenge

Welcome to my submission for the **DPS Backend Coding Challenge**. This is a RESTful API built using **TypeScript**, **Express.js**, and **SQLite** for managing company **Projects** and their associated **Reports**.

I structured this application to follow clean architectural principles — separating concerns into controllers, services, middleware, and utility layers — and ensured the codebase remains scalable and maintainable.

### 🚀 Live API Documentation

You can explore the API with full Swagger documentation here:

## **[API Docs on Render](https://dps-expressjs-challenge-h09j.onrender.com/api-docs/)**

---

## 🧱 Project Structure

```bash
.
├── db/
├── dist/
├── images/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── swagger/
│   │   ├── components/
│   │   └── paths/
│   ├── utils/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Features Implemented

![Database schema](images/database_schema.png)

### Core REST APIs

-   **Projects**

    -   `GET /api/v1/projects`
    -   `POST /api/v1/projects`
    -   `GET /api/v1/projects/:id`
    -   `PUT /api/v1/projects/:id`
    -   `DELETE /api/v1/projects/:id`

-   **Reports**

    -   `GET /api/v1/reports`
    -   `POST /api/v1/reports`
    -   `GET /api/v1/reports/:id`
    -   `PUT /api/v1/reports/:id`
    -   `DELETE /api/v1/reports/:id`

### Special Endpoint

-   `GET /api/v1/reports/samewords/3`: Fetches reports where any word appears **at least three times**.

### Optional Security

-   All routes can be protected with a **hardcoded token**: `Password123`
-   Auth is implemented via custom middleware: `auth.middleware.ts`

---

## 📦 Setup Instructions

### Prerequisites

-   Node.js (v14.x or higher)
-   npm (v6.x or higher)

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# API runs on http://localhost:3000
```

---

## 🧪 Testing

Backend application will be running on port 3000:

```
http://localhost:3000
```

### Swagger API Docs :

All endpoints are documented and testable via Swagger UI. You can use the live link provided above **[API Docs on Render](https://dps-expressjs-challenge-h09j.onrender.com/api-docs/)** or run the server locally and navigate to:

```
http://localhost:3000/api-docs
```

---

## Final Notes

I focused on writing clean, modular code. I am excited to have dissusion with DPS team on how I can improve it and make it better.

Happy reviewing!

— _Madhur_

---
