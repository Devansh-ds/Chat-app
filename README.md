# 💬 ChatSphere

A basic real-time chat application built for learning and practicing the core concepts of messaging systems, similar to WhatsApp. This project includes user authentication, 1-on-1 messaging, and real-time message updates.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT-based)
- 🧑‍🤝‍🧑 1-on-1 Real-Time Chat and group Chat
- 📥 Message History
- ✅ Message Seen & Delivery Status
- 🟢 Online/Offline Presence 
- 📱 Responsive Frontend 

---

## 🛠️ Tech Stack

### Backend
- Java + Spring Boot  
- WebSocket (for real-time messaging)  
- Spring Security (JWT Authentication)  
- MySQL (Database)  

### Frontend 
- React.js / HTML-CSS-JS  
- Socket.IO Client or WebSocket API  

---

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat-sphere.git
cd chat-sphere
````

### 2. Backend Setup

```bash
# Open in IDE and configure application.properties (DB, JWT secret, etc.)
./mvnw spring-boot:run
```

### 3. Frontend Setup (if applicable)

```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints (Example)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/api/auth/signup`       | Register a new user     |
| POST   | `/api/auth/login`        | Login and get JWT token |
| GET    | `/api/messages/{userId}` | Get chat history        |
| WS     | `/chat`                  | WebSocket connection    |

---

## 🧠 Learning Goals

This project was built to:

* Practice WebSocket and real-time communication
* Design a basic chat system architecture

---

## 🧑‍💻 Author

**Devansh Singla**
[GitHub](https://github.com/Devansh-ds) • [Email](mailto:Devanshsingla9@gmail.com)

---

## 📄 License

MIT License. Feel free to use, modify, and build on it.
