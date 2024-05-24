import { afterMount } from 'app/common/hooks/afterMount';
import { getShownTodos } from 'app/stores/todos/todoSelectors';
import { useTodosStore } from 'app/stores/todos/todosStore';

export const useTodos = () => {
  const shownTodos = useTodosStore(getShownTodos);
  const { fetchTodos } = useTodosStore((store) => store.actions);
  afterMount(fetchTodos);
  return shownTodos;
};
