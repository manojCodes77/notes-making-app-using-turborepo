'use client';

import React, { useState } from 'react';
import { CheckCircle, Circle, Edit, Trash2, X, Save } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Note {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NoteCardProps {
  note: Note;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: { title: string; content: string; completed: boolean }) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (editTitle.trim() && editContent.trim()) {
      onUpdate(note._id, {
        title: editTitle.trim(),
        content: editContent.trim(),
        completed: note.completed,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6 border-l-4 transition-all duration-200",
      note.completed 
        ? "border-green-500 bg-green-50" 
        : "border-blue-500 hover:shadow-lg"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(note._id)}
            className="flex-shrink-0 text-gray-400 hover:text-green-600 transition-colors"
          >
            {note.completed ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>
          
          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Note title"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Note content"
              />
            </div>
          ) : (
            <div className="flex-1">
              <h3 className={cn(
                "text-lg font-semibold text-gray-900",
                note.completed && "line-through text-gray-500"
              )}>
                {note.title}
              </h3>
              <p className={cn(
                "text-gray-600 mt-2",
                note.completed && "line-through text-gray-400"
              )}>
                {note.content}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                title="Save changes"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Cancel editing"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                title="Edit note"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                title="Delete note"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {note.completed ? 'Completed' : 'Created'} on {formatDate(note.updatedAt)}
      </div>
    </div>
  );
};
