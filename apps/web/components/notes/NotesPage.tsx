'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { notesAPI } from '../../lib/api';
import { NoteCard } from './NoteCard';
import { AddNoteForm } from './AddNoteForm';
import { LogOut, User, Filter } from 'lucide-react';

interface Note {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

export const NotesPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesAPI.getAll();
      setNotes(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (data: { title: string; content: string }) => {
    try {
      const newNote = await notesAPI.create(data);
      setNotes(prev => [newNote, ...prev]);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to add note');
    }
  };

  const handleToggleNote = async (id: string) => {
    try {
      const updatedNote = await notesAPI.toggle(id);
      setNotes(prev => 
        prev.map(note => 
          note._id === id ? updatedNote : note
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to toggle note');
    }
  };

  const handleUpdateNote = async (id: string, data: { title: string; content: string; completed: boolean }) => {
    try {
      const updatedNote = await notesAPI.update(id, data);
      setNotes(prev => 
        prev.map(note => 
          note._id === id ? updatedNote : note
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesAPI.delete(id);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  const filteredNotes = notes.filter(note => {
    switch (filter) {
      case 'active':
        return !note.completed;
      case 'completed':
        return note.completed;
      default:
        return true;
    }
  });

  const completedCount = notes.filter(note => note.completed).length;
  const activeCount = notes.filter(note => !note.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Daily Notes</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Total: {notes.length}</span>
              <span>Active: {activeCount}</span>
              <span>Completed: {completedCount}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Notes</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Add Note Form */}
        <div className="mb-8">
          <AddNoteForm onSubmit={handleAddNote} />
        </div>

        {/* Notes List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No notes yet' : `No ${filter} notes`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Create your first note to get started!' 
                : `You don't have any ${filter} notes.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onToggle={handleToggleNote}
                onUpdate={handleUpdateNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
