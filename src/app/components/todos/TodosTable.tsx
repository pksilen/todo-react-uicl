import React from 'react';
import { Table } from 'app/common/components/table/Table';
import { Todo } from 'app/stores/todos/Todo';
import { PendingTodos } from './PendingTodos';
import { TodoTableRow } from './todo/TodoTableRow';
import { useTodos } from './useTodos';

export const TodosTable = () => {
  const shownTodos = useTodos();

  return (
    <PendingTodos>
      <Table>
        {shownTodos.map((todo: Todo) => (
          <TodoTableRow key={todo.id} todo={todo} />
        ))}
      </Table>
    </PendingTodos>
  );
};
