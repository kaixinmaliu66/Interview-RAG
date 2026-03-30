import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Note } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  className?: string;
}

export function NoteCard({ note, onDelete, className }: NoteCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
            {note.category}
          </span>
          <button
            onClick={() => onDelete(note.id)}
            className="rounded-md p-1.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">{note.title}</h3>
        <p className="whitespace-pre-wrap text-sm text-slate-600">{note.content}</p>
      </div>
      <div className="mt-4 text-xs text-slate-400">
        {format(new Date(note.created_at), 'MMM d, yyyy • h:mm a')}
      </div>
    </motion.div>
  );
}