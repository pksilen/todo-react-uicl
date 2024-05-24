import { List } from 'app/common/components/list/List';
import { Todo } from 'app/stores/todos/Todo';
import { PendingTodos } from './PendingTodos';
import { TodoListItem } from './todo/TodoListItem';
import { useTodos } from './useTodos';

export const TodosList = () => {
  const shownTodos = useTodos();

  return (
    <PendingTodos>
      <List>
        {shownTodos.map((todo: Todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </List>
    </PendingTodos>
  );
};
