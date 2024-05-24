import { Button } from 'app/common/components/buttons/Button';
import { TextInput } from 'app/common/components/inputs/TextInput';
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
