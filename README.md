# Notes Management Frontend

This is a **Notes Management App** built using **Next.js, React, and TypeScript**. It features **user authentication**, **AI-powered note titles** and **create, read, update, delete notes**.

> **💻 This project has a back-end 💻**
>
> https://github.com/camilabbreda/Note-Management-Backend

# Table of Contents

- [Notes Management App](#notes-management-app)
- [📌 Features](#-features)
- [🏗 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone the repo](#clone-the-repo)
    - [Install dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
- [🔥 Running the Application](#-running-the-application)
  - [Development Mode](#development-mode)
- [📜 License](#-license)

## 📌 Features

- 🔑 **User authentication** - Register, Login
- 📝 **CRUD operations** - Create, Read, Update, Delete notes
- ✨ **AI-powered note title generation** ✨[experimental]
- 🎨 **Styled Components** - Modern UI with CSS Modules
- 🔄 **API routes** - Backend logic within Next.js
- 🗄️ **State Management** - React Context API

## 🏗 Project Structure

```
📂src/
├── 📂api/               # API routes for authentication and  notes
│   ├── auth/
│   │   ├── auth-api.ts
│   │   ├── notes-api.ts
│
├── 📂components/        # UI components
│   ├── Notes/
│   │   ├── notes-list.tsx
│
├── 📂context/          # Context API for state management
│   ├── auth-context.tsx
│   ├── notes-context.tsx
│
├── 📂pages/            # Next.js pages
│   ├── index.tsx
│   ├── _app.tsx
│   ├── login/index.tsx
│   ├── notes/index.tsx
│   ├── register/index.tsx
│
├── 📂styles/           # Global and module CSS
│   ├── globals.css
│   ├── login/login.module.css
│   ├── notes/notes-list.module.css
│   ├── register/register.module.css
│
├── 📂types/            # TypeScript interfaces
│   ├── iNote.ts
│   ├── iUser.ts
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22+ recommended)

### Installation

#### Clone the repo

```sh
git clone https://github.com/camilabbreda/Note-Management-Frontend.git
cd notes-management-app
```

#### Install dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add:

```env
NOTES_MANAGEMENT_BACKEND_URL = 'http://localhost:4000'
ENVIRONMENT = 'PRD'
JWT_SECRET= 'JWT_SECRET_KEY'
```

## 🔥 Running the Application

### Development Mode

```sh
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

### Production Mode

```sh
npm run build

npm run start
```

ENJOY THE APP!

## 📜 License

This project is licensed under the MIT License.
