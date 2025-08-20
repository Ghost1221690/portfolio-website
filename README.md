# Portfolio Website

A personal portfolio website built with **HTML, CSS, JavaScript (frontend)** and **Node.js + Express (backend)**.  
It includes a **contact form** that sends emails using **Nodemailer**.

---

## 🚀 Features
- Responsive portfolio design (HTML, CSS, JS)
- Contact form with validation
- Backend with **Node.js + Express**
- Email sending via **Nodemailer**
- Deployable to **Render / Vercel / Netlify** (frontend) and **Render / Railway** (backend)

---

## 📂 Project Structure
Project/
│── backend/ # Node.js + Express server
│ ├── server.js # Main backend server
│ ├── package.json # Dependencies
│ └── .env # Environment variables (email + password)
│
│── frontend/ # Portfolio HTML/CSS/JS
│ ├── index.html
│ ├── script.js
│ ├── style.css
│ └── assets/ # Images, icons, etc.
│
└── README.md # Project documentation

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ghost1221690/portfolio-website.git
   cd portfolio-website
   
2.Install backend dependencies
cd backend
npm install

3.Configure environment variables
Create a .env file in the backend/ folder:

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

4.Run the server
node server.js
Server will run at: http://localhost:3000

5.Open frontend
Open frontend/index.html in your browser
or serve it with Live Server (VS Code extension).

---

🚀 Deployment

Frontend → Host on Vercel
 / Netlify
 / GitHub Pages

Backend → Host on Render
 / Railway

 ---
 📜 License

This project is open-source under the MIT License.


