import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/client';
import type { Note } from '@/types';

export function useNotes() {
  const queryClient = useQueryClient();

  // GET notes
  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: () => request<Note[]>('/api/notes'),
  });

  // POST new note
  const addNoteMutation = useMutation({
    mutationFn: (newNote: Omit<Note, 'id' | 'created_at'>) =>
      request<Note>('/api/notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // DELETE note
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) =>
      request<void>(`/api/notes/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return {
    notes: notesQuery.data,
    isLoading: notesQuery.isLoading,
    error: notesQuery.error,
    addNote: addNoteMutation.mutate,
    isAdding: addNoteMutation.isPending,
    deleteNote: deleteNoteMutation.mutate,
    isDeleting: deleteNoteMutation.isPending,
  };
}