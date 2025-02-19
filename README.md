# Notes Management App

## Overview

The Notes Management App is a Next.js-based application that allows users to create, update, delete, and retrieve notes. It also features user authentication and AI-generated note titles.

## Features

- User authentication (register, login)
- Create, read, update, and delete notes
- AI-powered title generation for notes
- Context API for state management
- API routes for backend logic
- Styled components for UI

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **State Management**: React Context API
- **Styling**: CSS Modules
- **API Communication**: Axios
- **Backend**: API routes within Next.js
- **AI Integration**: AI-generated note titles
- **Database**: PostgreSQL with Prisma ORM

## Folder Structure

```
├── .env
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.ico
├── src/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── auth-api.ts
│   │   │   ├── notes-api.ts
│   ├── components/
│   │   ├── Notes/
│   │   │   ├── notes-list.tsx
│   ├── constants/
│   │   ├── reset-states.ts
│   ├── context/
│   │   ├── auth-context.tsx
│   │   ├── notes-context.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── _app.tsx
│   │   ├── api/noteManagement/[endpoint]/index.ts
│   │   ├── login/index.tsx
│   │   ├── notes/index.tsx
│   │   ├── register/index.tsx
│   ├── server/
│   │   ├── web-servers.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── login/login.module.css
│   │   ├── notes/notes-list.module.css
│   │   ├── register/register.module.css
│   ├── types/
│   │   ├── iNote.ts
│   │   ├── iUser.ts
│   ├── utils/
│   │   ├── pi
```

## API Endpoints

### Notes Management

- **Create Note**: `POST /api/noteManagement/note`
- **Get All Notes**: `GET /api/noteManagement/note?route=/user/{userId}`
- **Update Note**: `PUT /api/noteManagement/note?route=/{id}`
- **Delete Note**: `DELETE /api/noteManagement/note?route=/{id}`
- **Generate Note Title**: `POST /api/noteManagement/generate?route=/note-title`

### User Authentication

- **Register User**: `POST /api/noteManagement/user?route=/register`
- **Login User**: `POST /api/noteManagement/user?route=/login`

## Database Setup

### Prerequisites

- PostgreSQL installed
- Prisma ORM setup

### Steps

1. Install Prisma:
   ```sh
   npm install @prisma/client
   ```
2. Initialize Prisma:
   ```sh
   npx prisma init
   ```
3. Configure `.env` file:
   ```env
   DATABASE_URL='postgresql://user:password@localhost:5432/notesdb'
   ```
4. Apply migrations:
   ```sh
   npx prisma migrate dev --name init
   ```

## Setup and Installation

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn

### Steps

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd notes-management-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables in `.env` file.
5. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
6. Start the development server:
   ```sh
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contribution

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
