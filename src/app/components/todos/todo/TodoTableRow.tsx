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
  const { edit, isEditable, remove, setAsEditable, toggleDone } = useTodo(id);
  const titleClasses = classNames(classes.title, isDone && classes.isDone);

  return (
    <TableRow>
      <TableCell>
        <Checkbox aria-label={title} isChecked={isDone} color="success" onChange={toggleDone} />
      </TableCell>
      {isEditable ? (
        <TableCell>
          <EditTextInput onEditComplete={edit} text={title} />
        </TableCell>
      ) : (
        <TableCell className={titleClasses} onDoubleClick={setAsEditable}>
          {title}
        </TableCell>
      )}
      <TableCell className={classes.buttons}>
        <IconButton icon={<EditIcon />} onClick={setAsEditable} />
        <IconButton icon={<RemoveIcon />} onClick={remove} />
      </TableCell>
    </TableRow>
  );
};
