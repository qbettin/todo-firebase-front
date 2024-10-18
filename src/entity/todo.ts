export interface Todo {
  _id: string;
  task: string;
  completed: boolean;
  created_at: Date;
  completed_at: Date | null;
}