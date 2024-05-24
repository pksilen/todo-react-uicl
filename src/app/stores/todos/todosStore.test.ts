import { todoService } from 'app/services/FakeTodoService';
import { useTodosStore } from './todosStore';

jest.mock('../../services/FakeTodoService');

describe('todosStore', () => {
  it('should have correct initial state', () => {
    // WHEN
    const todosStore = useTodosStore.getInitialState();

    // THEN
    expect(todosStore.hasError).toBe(false);
    expect(todosStore.isPending).toBe(false);
    expect(todosStore.lowerCaseTodoFilterText).toEqual('');
    expect(todosStore.shouldShowUndoneTodosOnly).toBe(false);
    expect(todosStore.todos).toEqual([]);
  });
  describe('clearError', () => {
    it('should clear error state', () => {
      // GIVEN
      useTodosStore.setState({ hasError: true });

      // WHEN
      useTodosStore.getState().actions.clearError();

      // THEN
      expect(useTodosStore.getState().hasError).toBe(false);
    });
  });
  describe('addTodo', () => {
    it('should add a todo', async () => {
      // GIVEN
      (todoService.createTodo as jest.Mock).mockResolvedValue(null);

      // WHEN
      await useTodosStore.getState().actions.addTodo('test todo');

      // THEN
      expect(todoService.createTodo).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'test todo' })
      );

      const todosStore = useTodosStore.getState();
      expect(todosStore.todos.length).toBe(1);
      expect(todosStore.todos[0].id).toBeTruthy();
      expect(todosStore.todos[0].title).toEqual('test todo');
      expect(todosStore.todos[0].isDone).toBe(false);
    });
  });
});
