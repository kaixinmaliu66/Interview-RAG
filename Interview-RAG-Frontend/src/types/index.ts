export interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}