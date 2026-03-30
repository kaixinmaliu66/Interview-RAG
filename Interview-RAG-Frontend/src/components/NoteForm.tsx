import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Note } from '@/types';

interface NoteFormProps {
  onSubmit: (note: Omit<Note, 'id' | 'created_at'>) => void;
  isSubmitting?: boolean;
}

type FormData = {
  title: string;
  category: string;
  content: string;
};

export function NoteForm({ onSubmit, isSubmitting }: NoteFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">Add New Note</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            id="title"
            className={cn(
              "block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300"
            )}
            placeholder="E.g., React Hooks"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category" className="text-sm font-medium text-slate-700">Category</label>
          <input
            {...register('category', { required: 'Category is required' })}
            id="category"
            className={cn(
              "block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              errors.category ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300"
            )}
            placeholder="E.g., Frontend"
          />
          {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="content" className="text-sm font-medium text-slate-700">Content</label>
        <textarea
          {...register('content', { required: 'Content is required' })}
          id="content"
          rows={4}
          className={cn(
            "block w-full resize-none rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            errors.content ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300"
          )}
          placeholder="Write your note content here..."
        />
        {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </>
        )}
      </button>
    </form>
  );
}