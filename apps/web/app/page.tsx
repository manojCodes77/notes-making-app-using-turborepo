'use client';

import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AuthPage } from '../components/auth/AuthPage';
import { NotesPage } from '../components/notes/NotesPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <NotesPage /> : <AuthPage />;
};

export default function HomePage() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
