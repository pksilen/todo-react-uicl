import ApiError from 'app/common/errors/ApiError';
import { Todo } from 'app/stores/todos/Todo';
import { TodoService } from './TodoService';

export const BASE_URL = 'http://localhost:8080/todos';

// Promises returned from below method never reject, but
// possible error is returned from the methods
class TodoServiceImpl implements TodoService {
  async createTodo(todo: Todo): Promise<Error | null> {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(todo)
      });

      const responseBody = await response.json();
      return response.ok ? null : new ApiError(responseBody);
    } catch (error) {
      return new ApiError(error as Error);
    }
  }

  async getTodos(): Promise<[Todo[], Error | null]> {
    try {
      const response = await fetch(BASE_URL);
      const todosOrError = await response.json();
      return response.ok ? [todosOrError, null] : [[], new ApiError(todosOrError)];
    } catch (error) {
      return [[], new ApiError(error as Error)];
    }
  }
}

export const todoService = new TodoServiceImpl();
