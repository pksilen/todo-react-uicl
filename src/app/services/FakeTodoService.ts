import { Todo } from 'app/stores/todos/Todo';
import { TodoService } from './TodoService';

const isTest = window.location.href.includes('test');

// Promises returned from below method never reject, but
// possible error is returned from the methods
class FakeTodoService implements TodoService {
  createTodo(_: Todo): Promise<Error | null> {
    if (isTest || Math.random() < 0.7) {
      return Promise.resolve(null);
    } else {
      return Promise.resolve(new Error());
    }
  }

  getTodos(): Promise<[Todo[], Error | null]> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const randomValue = Math.random();

        if (isTest || randomValue < 0.7) {
          resolve([[{ id: '1', title: 'Dummy todo', isDone: false }], null]);
        } else {
          resolve([[], new Error()]);
        }
      }, 1500)
    );
  }
}

export const todoService = new FakeTodoService();
