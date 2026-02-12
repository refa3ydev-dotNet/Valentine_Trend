# 💘 Valentine Link Generator (Trend Website)

A viral-style Valentine mini web app:
1) Generate a shareable link  
2) Ask the big question with a runaway **“No”** button 😭  
3) Celebrate on the success page with cute effects 🎉🌸  

Supports **English + Arabic (RTL)** and uses **gender-based Arabic phrasing**.

---

## ✨ Features
- 🔗 **Link Generator**: enter your name + your valentine’s name and copy a shareable link
- 🏃‍♂️ **Runaway “No” Button**: escapes the cursor but stays inside its container
- 🌍 **Language Toggle**: EN/AR with proper RTL layout
- 🧠 **Arabic Grammar Support**: success text changes based on sender gender (فرحان / فرحانة)
- 🎊 **Celebration Effects**: confetti + fun animations
- 📱 **Responsive UI**: looks great on mobile & desktop

---

## 🧩 Pages
- `/` → Link Generator  
- `/ask` → Question page (Yes / No)  
- `/yes` → Success page 🎉  

Query params:
- `from` = sender name  
- `to` = valentine name  
- `g` = gender (`male` | `female`)  

Example:
`/ask?from=Omar&to=Sara&g=male`

---

## 🛠 Tech Stack
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**

---

## 🚀 Getting Started
```bash
npm install
npm run dev
