# 🐱 Simple Note-Taking App with Cat Facts (MERN Stack)

A minimalist note-taking back end web application built with MongoDB, Express.js, Node.js that adds a **random cat fact** to every note you create. 🐾

> Example Cat Fact: *"Cats sleep for 70% of their lives."*

---

## Setup Instructions

To get started with the project, follow the instructions below to set up the development environment.

### Prerequisites:
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation:

1. Clone the repository:
    ```bash
    git clone https://github.com/as5550/Notes_App_Backend.git
    ```

2. Navigate to the project folder:
    ```bash
    cd Notes_App_Backend
    ```

4. Install the dependencies:
    ```bash
    npm install
    ```

5. Start the server:
    ```bash
    npm start
    ```

The back end will be available at `http://localhost:5000` in your browser.

### Optional: To run the application in production mode:
```bash
npm run build
npm run serve
```

---
---

### 🚀 Features
- show/hide from to add notes button to display or hide the form to add notes
- Form to add notes
- Each note is assigned a random [Cat Fact](https://catfact.ninja/fact) automatically in the back end
- Search notes by text in **title**, **content**, or the **cat fact**
- View a list of all saved notes using get all notes button
- Delete individual notes
- See server metrics at the bottom of how many requests have been sent to server

---

## 🛠 Tech Stack

| Technology | Role |
|------------|------|
| MongoDB    | Database to store notes |
| Express.js | Backend server and API |
| Cat Fact API | External API to fetch random cat facts |

---

