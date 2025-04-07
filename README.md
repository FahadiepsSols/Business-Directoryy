# 🌐 Business Directory Web App

A modern business listing platform where users can explore businesses, view detailed profiles, and leave reviews. Built with **Next.js 13+ App Router**, **Express.js**, **MongoDB**, and **Clerk Authentication**.

---

## 🚀 Live Demo

👉 [View the App](https://business-directoryy-dm23.onrender.com/)  
👉 [API Server (Render)](https://business-directoryy.onrender.com)

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Clerk (Authentication)

**Backend:**
- Express.js
- MongoDB + Mongoose
- Render (Deployment)

---


---

## 🔑 Features

- ✅ Browse all registered businesses.
- ✅ Dynamic route pages for each business using `[id]`.
- ✅ View full business details: name, category, location, contact info, image.
- ✅ Authenticated users can:
  - Leave reviews.
  - View reviews from others.
- ✅ Clerk authentication integration.
- ✅ Fully responsive design.

---

## 🧠 Hooks & Logic Used

- `useParams()` → Read dynamic route `id` from URL.
- `useEffect()` → Perform data fetching on mount.
- `useState()` → Manage state like loading, error, review text.
- `useUser()` (from Clerk) → Fetch logged-in user details.

---

## 🧪 Error Handling & Debugging

- ❌ Error: `next export` is deprecated  
  ✅ Fix: Switched to server deployment (Render) with App Router and dynamic routing.

- ❌ Error: Dynamic route `/business/[id]` requires `generateStaticParams()`  
  ✅ Fix: Switched to **server runtime deployment** instead of static export.

- ❌ Error: MongoDB validation & fetch failures  
  ✅ Fix: Updated API structure and ensured proper data submission (like user name in reviews).


---

## ⚙️ Environment Variables

**Frontend (`.env`):**

**Backend (`.env`):**

Built with ❤️ by Fahad