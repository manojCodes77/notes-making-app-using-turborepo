# Daily Notes Application

A full-stack notes application built with Next.js frontend and Express.js backend, featuring user authentication and CRUD operations for daily notes.

## Features

- 🔐 **User Authentication**: Sign up, sign in, and secure logout
- 📝 **Daily Notes**: Create, read, update, and delete notes
- ✅ **Completion Tracking**: Mark notes as completed/incomplete
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔍 **Filtering**: Filter notes by status (All, Active, Completed)
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd apps/http-server
npm install

# Install frontend dependencies
cd ../web
npm install
```

### 2. Database Setup

Make sure MongoDB is running locally or update the connection string in the backend `.env` file.

### 3. Environment Configuration

Create a `.env` file in the `apps/http-server` directory:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. Start the Application

#### Start the Backend Server

```bash
cd apps/http-server
npm run dev
```

The backend will be running on `http://localhost:8080`

#### Start the Frontend Application

```bash
cd apps/web
npm run dev
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user

### Notes
- `GET /api/notes` - Get all notes for authenticated user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PUT /api/notes/:id/toggle` - Toggle note completion status

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Sign In**: Login with your credentials
3. **Create Notes**: Click "Add New Note" to create daily notes
4. **Manage Notes**: 
   - Click the circle icon to mark as complete/incomplete
   - Click the edit icon to modify note content
   - Click the delete icon to remove notes
5. **Filter Notes**: Use the dropdown to filter by status
6. **Logout**: Click the logout button to sign out

## Project Structure

```
├── apps/
│   ├── http-server/          # Backend API
│   │   ├── src/
│   │   │   ├── models/       # Database models
│   │   │   ├── routes/       # API routes
│   │   │   ├── middleware/   # Authentication middleware
│   │   │   └── index.ts      # Server entry point
│   │   └── package.json
│   └── web/                  # Frontend application
│       ├── app/              # Next.js app directory
│       ├── components/       # React components
│       ├── contexts/         # React contexts
│       ├── lib/              # Utility functions
│       └── package.json
├── packages/                 # Shared packages
└── package.json
```

## Development

### Backend Development

```bash
cd apps/http-server
npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Development

```bash
cd apps/web
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.