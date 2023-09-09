<!-- PROJECT LOGO -->
<div align="center">
    <h2>- IVOverflow -</h2>
</div>
<br />

<!-- ABOUT THE PROJECT -->

### About The Project 🚀

IVOverflow is a StackOverflow clone project that replicates the core functionalities of the famous StackOverflow website. It offers a platform for users to ask questions, provide answers, and collaborate with a community of developers. The project implements various features, including authentication with SHA512 hash algorithm for passwords, middleware with JWT encryption, question filtering by title, adding questions via modal, error handling to prevent users from submitting answers to their own questions, and a rating system for answers. Project implemented using Vite.

<br />

---

<br />

### Key Features 🔑:

- **Authentication**: User authentication with a secure SHA512 hash algorithm for password storage.
- **Middleware & JWT**: Implementation of middleware for JWT encryption to enhance security.
- **Question Filtering**: Easily find questions by searching for keywords in the title.
- **Modal for Adding Questions**: Conveniently add new questions using a modal dialog.
- **Answer Submission**: Users can submit answers to questions from the community.
- **Answer Rating System**: Answers are rated by users, with the top-rated answers displayed at the top.

<br />

---

<br />

### Demonstration Video 📹:

https://github.com/Yarin96/IVOverflow/assets/94289687/e56c5603-ead4-4c30-82e0-d6526817f3b8
    
<br />

---

<br />

### Technologies Used 👨‍💻:

- IVOverflow leverages modern technologies for both the frontend and backend:

| Field                | Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Frontend Development | ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-%23804040.svg?style=for-the-badge&logo=Redux&logoColor=white) ![Material UI](https://img.shields.io/badge/Material_UI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)                                                                                                                                                                                                                                                                         |
| Backend Development  | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white&style=for-the-badge) ![Express](https://img.shields.io/badge/Express-000000?logo=Express&logoColor=white&style=for-the-badge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Database             | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=MongoDB&logoColor=white&style=for-the-badge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

<br />

---

<br />

### Getting Started 🚀

To run IVOverflow locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/YourUsername/IVOverflow.git
   ```

2. Navigate to the project directory:
   ```sh
   cd IVOverflow
   ```

3. Install dependencies for both the frontend and backend:
   ```sh
   # Navigate to the client folder
   cd client
   npm install
   ```

   ```sh
   # Navigate to the server folder
   cd ../server
   npm install
   ```

4. Create a MongoDB Atlas database and configure your connection string at `server/index.js`.

5. Set up environment variables for the backend at `server/nodemon.json` (e.g., DB_USER, DB_PASSWORD, JWT_KEY).

6. Start the frontend and backend separately using Vite:

   - Start the frontend in the `client` folder:
     ```sh
     cd client
     npm run dev
     ```

   - Start the backend in the `server` folder using either npm:
     ```sh
     cd server
     npm run dev
     ```

     or nodemon:
     ```sh
     cd server
     nodemon index.js
     ```

7. Access IVOverflow in your browser at the default URL: [http://localhost:5173](http://localhost:5173).
