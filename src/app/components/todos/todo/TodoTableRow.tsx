import classNames from 'classnames';
import {
  Checkbox,
  EditIcon,
  EditTextInput,
  IconButton,
  RemoveIcon,
  TableCell,
  TableRow
} from 'ui-components-lib';
import { Todo } from 'app/stores/todos/Todo';
import classes from './TodoTableRow.module.scss';
import { useTodo } from './useTodo';

type Props = {
  readonly todo: Todo;
};

export const TodoTableRow = ({ todo: { id, title, isDone } }: Props) => {
  const { editTodo, isEditable, removeTodo, setEditableTodo, toggleTodoDone } = useTodo(id);
  const titleClasses = classNames(classes.title, isDone && classes.isDone);

  return (
    <TableRow>
      <TableCell>
        <Checkbox aria-label={title} isChecked={isDone} color="success" onChange={toggleTodoDone} />
      </TableCell>
      {isEditable ? (
        <TableCell>
          <EditTextInput onEditComplete={editTodo(id)} text={title} />
        </TableCell>
      ) : (
        <TableCell className={titleClasses} onDoubleClick={setEditableTodo}>
          {title}
        </TableCell>
      )}
      <TableCell className={classes.buttons}>
        <IconButton icon={<EditIcon />} onClick={setEditableTodo} />
        <IconButton icon={<RemoveIcon />} onClick={removeTodo} />
      </TableCell>
    </TableRow>
  );
};
