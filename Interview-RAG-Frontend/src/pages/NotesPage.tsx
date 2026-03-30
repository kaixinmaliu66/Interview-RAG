import { motion, AnimatePresence } from 'framer-motion';
import { NoteForm } from '@/components/NoteForm';
import { NoteCard } from '@/components/NoteCard';
import { NoteCardSkeleton } from '@/components/Skeleton';
import { useNotes } from '@/hooks/useNotes';
import { FileQuestion, AlertCircle } from 'lucide-react';

export default function NotesPage() {
  const { notes, isLoading, error, addNote, isAdding, deleteNote } = useNotes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Interview RAG Notes
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-500 sm:mt-4">
          Manage your interview preparation notes and knowledge base snippets.
        </p>
      </div>

      <div className="mb-12">
        <NoteForm onSubmit={addNote} isSubmitting={isAdding} />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Notes</h2>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
            {notes?.length || 0} items
          </span>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading notes</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? null : !notes || notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 py-16 text-center">
            <FileQuestion className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-sm font-semibold text-slate-900">No notes yet</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by creating a new note above.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {notes?.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={deleteNote}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}