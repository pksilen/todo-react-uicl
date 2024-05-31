import { useTodosStore } from 'app/stores/todos/todosStore';

export const useTodo = (id: string) => {
  const editableTodoId = useTodosStore((store) => store.editableTodoId);
  const { editTodo, removeTodo, setEditableTodo, toggleTodoDone } = useTodosStore(
    (store) => store.actions
  );

  return {
    editTodo,
    isEditable: editableTodoId === id,
    removeTodo: () => removeTodo(id),
    setEditableTodo: () => setEditableTodo(id),
    toggleTodoDone: () => toggleTodoDone(id)
  };
};
