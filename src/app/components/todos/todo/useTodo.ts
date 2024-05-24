import { useTodosStore } from 'app/stores/todos/todosStore';

export const useTodo = () => {
  const editableTodoId = useTodosStore((store) => store.editableTodoId);
  const { editTodo, removeTodo, setEditableTodo, toggleTodoDone } = useTodosStore(
    (store) => store.actions
  );

  return {
    editableTodoId,
    editTodo,
    removeTodo,
    setEditableTodo,
    toggleTodoDone
  };
};
