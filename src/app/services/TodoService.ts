import { Todo } from 'app/stores/todos/Todo';

// Promises returned from below method never reject, but
// possible error is returned from the methods
export interface TodoService {
  createTodo(todo: Todo): Promise<Error | null>;
  getTodos(): Promise<[Todo[], Error | null]>;
}
