# 🧠 Project AI Context

## 1. Overview

This is a modern E-commerce frontend built with:

- React (Vite)
- Tailwind CSS

Future plan:

- Backend will be built using Laravel 11 (REST API)

---

## 2. Project Structure

### Root

- public/ → static assets
- src/ → main application

### src/

#### components/ui/

Reusable UI components:

- Button, Input, Modal, Table, etc.
- Must be reusable and stateless where possible
- No business logic here

#### layouts/

Layout wrappers:

- AdminLayout → dashboard/admin pages
- CustomerLayout → storefront pages

#### pages/

Application pages:

- Home, Shop, Product, Cart, Checkout
- admin/ → dashboard pages

#### lib/

Shared utilities:

- utils.js → helper functions
- mockData.js → temporary data (to be removed when backend is ready)

---

## 3. Architecture Rules

### Component Rules

- UI components must not fetch data
- Business logic must not be inside UI components
- Use props for data flow

### State Management (current)

- Local state (useState/useEffect)

### Future Plan

- Introduce global state if needed (Context or Zustand)

---

## 4. API Strategy (IMPORTANT)

Currently:

- Using mockData.js

Future:

- Replace with Laravel API

Rules:

- All API calls must go inside:
  /src/services/

- DO NOT call API directly inside components
- Use centralized service functions

Example:

- productService.js
- orderService.js

---

## 5. Naming Conventions

- Components: PascalCase (ProductCard.jsx)
- Functions: camelCase
- Files: descriptive and consistent

---

## 6. Admin vs Customer Separation

- Admin pages:
  /pages/admin/

- Customer pages:
  /pages/

Keep logic separated

---

## 7. Refactoring Rules

When modifying code:

- Always search entire project for usage
- Avoid duplication
- Prefer reusable hooks or services
- Maintain clean structure

---

## 8. AI Instructions (VERY IMPORTANT)

When answering:

1. Read this file first
2. Analyze the entire project structure
3. Detect dependencies between files
4. Suggest scalable solutions
5. Avoid breaking existing structure

Always:

- Search for all usages before modifying anything
- Suggest multi-file updates if needed

---

## 9. Future Backend (Laravel 11)

Backend will provide:

- Auth (Sanctum or JWT)
- Products API
- Orders API
- Admin dashboard APIs

Frontend must be ready to:

- Consume REST APIs
- Handle loading & error states
