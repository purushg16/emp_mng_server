---

```markdown
# 🧑‍💼 Employee Leave Management System

A full-stack application for managing employee data, leave types, and leave applications — featuring user authentication, admin and employee dashboards, form validations, pagination, and more.

---

## 🚀 Tech Stack

- **Base**: Node.js, Express, MySQL2
- **Auth**: JWT-based authentication
- **Validation**: Yup + Formik (frontend), Custom middleware (backend)

---

## 📁 Project Structure

```

server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── index.js

```

## 🧪 Features

- 👤 Employee creation and management
- 🏢 Department and Leave Type management
- 📅 Leave application with overlapping check
- 🔍 Pagination and search support
- 🔐 JWT authentication
- 📃 Validations with Yup + Formik
- 📈 Admin dashboard (planned)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/leave-management-system.git
cd leave-management-system
````

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Configure `.env` (backend)

```env
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=leave_management
```

### 4. Run the servers

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 📬 API Endpoints (Backend)

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/auth/login`           | Login user                        |
| GET    | `/employee/profile`     | Get logged-in employee profile    |
| POST   | `/leave`                | Apply for leave                   |
| GET    | `/leave?status=pending` | Fetch leaves with filters + pages |
| GET    | `/department`           | List departments (paginated)      |
| ...    |                         | More endpoints available          |

---

## ✅ To-Do

* [x] Pagination
* [x] Overlap prevention logic
* [x] Global response format
* [ ] Manager approval workflow
* [ ] Calendar-based leave view
* [ ] Dashboard metrics (admin)
* [ ] Upload employee docs

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

```
