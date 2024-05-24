import { Badge } from 'app/common/components/badges/Badge';
import { SearchInput } from 'app/common/components/inputs/SearchInput';
import { Heading2 } from 'app/common/components/typography/Heading2';
import { getUndoneTodoCount } from 'app/stores/todos/todoSelectors';
import { useTodosStore } from 'app/stores/todos/todosStore';
import classes from './Header.module.scss';

export const Header = () => {
  const undoneTodoCount = useTodosStore((store) => getUndoneTodoCount(store));
  const { setTodoFilter } = useTodosStore((store) => store.actions);

  return (
    <header className={classes.todosHeader}>
      <Badge content={undoneTodoCount} color="error">
        <Heading2>Todos</Heading2>
      </Badge>
      <SearchInput
        className={classes.todoSearch}
        onChange={(event) => setTodoFilter(event.target.value)}
        placeholder="Search todos..."
      />
    </header>
  );
};
