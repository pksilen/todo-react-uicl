import { Button, TextInput } from 'ui-components-lib';
import classes from './AddTodo.module.scss';
import { useTodoAdding } from './useTodoAdding';

export const AddTodo = () => {
  const { maybeAddTodo, setTodoTitle, todoTitle } = useTodoAdding();

  return (
    <section className={classes.addTodo}>
      <TextInput
        label="Add new todo..."
        onChange={(event) => setTodoTitle(event.target.value)}
        value={todoTitle}
      />
      <Button className={classes.button} onClick={maybeAddTodo}>
        Add todo
      </Button>
    </section>
  );
};
