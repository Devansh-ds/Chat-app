# ChatSphere

ChatSphere is a real-time chat application built using Java Spring Boot for the backend and React.js for the frontend. It supports both one-on-one and group chats, featuring real-time messaging, user authentication, and presence indicators.

## Features

* **User Authentication**: Secure JWT-based registration and login system.
* **Real-Time Messaging**: Instant messaging using WebSockets.
* **One-on-One & Group Chats**: Engage in private or group conversations.
* **Message History**: Persist chat history for future reference.
* **Delivery & Read Receipts**: Know when messages are delivered and read.
* **Online/Offline Status**: View user presence in real-time.
* **Responsive Design**: Optimized for various devices and screen sizes.([GitHub][1], [Medium][2])

## Tech Stack

### Backend

* **Java** with **Spring Boot**
* **WebSocket** for real-time communication
* **Spring Security** with JWT for authentication
* **MySQL** for data storage([GitHub][3], [GitHub][4], [Synology Knowledge Center][5])

### Frontend

* **React.js**
* **Socket.IO Client** or native WebSocket API
* **HTML**, **CSS**, and **JavaScript**([GitHub][4])

## Getting Started

### Prerequisites

* **Java Development Kit (JDK)** installed
* **Node.js** and **npm** installed
* **MySQL** database set up

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Devansh-ds/Chat-app.git
   cd Chat-app/Backend/WhatsappClone
   ```



2. **Configure the database**:

   Update the `application.properties` file with your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/chatsphere
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```



3. **Build and run the backend**:

   Use your preferred IDE to build and run the Spring Boot application.

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../../Frontend
   ```



2. **Install dependencies**:

   ```bash
   npm install
   ```



3. **Start the frontend application**:

   ```bash
   npm start
   ```



The application will run at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
