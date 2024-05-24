import { isAny } from 'app/common/utils/isAny';
import { Todo } from './Todo';
import { TodosStore } from './todosStore';

export const getUndoneTodoCount = (store: TodosStore) =>
  store.todos.filter(({ isDone }) => !isDone).length;

export const getShownTodos = (store: TodosStore) => {
  const titleContainsTodoFilterText = ({ title }: Todo) =>
    title.toLowerCase().includes(store.lowerCaseTodoFilterText);

  const isUndone = ({ isDone }: Todo) => !isDone;

  return store.todos
    .filter(titleContainsTodoFilterText)
    .filter(store.shouldShowUndoneTodosOnly ? isUndone : isAny);
};
