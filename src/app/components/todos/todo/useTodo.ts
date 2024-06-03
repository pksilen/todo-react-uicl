import { useTodosStore } from 'app/stores/todos/todosStore';

export const useTodo = (id: string) => {
  const editableTodoId = useTodosStore((store) => store.editableTodoId);

  const { changeTodoTitle, removeTodo, setTodoAsEditable, toggleTodoDone } = useTodosStore(
    (store) => store.actions
  );

  return {
    changeTitle: changeTodoTitle(id),
    isEditable: editableTodoId === id,
    remove: () => removeTodo(id),
    setAsEditable: () => setTodoAsEditable(id),
    toggleDone: () => toggleTodoDone(id)
  };
};
