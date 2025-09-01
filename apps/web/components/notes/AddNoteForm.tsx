'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AddNoteFormData {
  title: string;
  content: string;
}

interface AddNoteFormProps {
  onSubmit: (data: AddNoteFormData) => Promise<void>;
}

export const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddNoteFormData>();

  const handleFormSubmit = async (data: AddNoteFormData) => {
    try {
      await onSubmit(data);
      reset();
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600"
      >
        <Plus className="h-5 w-5" />
        <span className="font-medium">Add New Note</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Note</h3>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 1,
                message: 'Title must not be empty',
              },
            })}
            type="text"
            id="title"
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              errors.title ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Enter note title"
            autoFocus
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 1,
                message: 'Content must not be empty',
              },
            })}
            id="content"
            rows={4}
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none",
              errors.content ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Enter note content"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span>{isSubmitting ? 'Adding...' : 'Add Note'}</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              reset();
              setIsExpanded(false);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
