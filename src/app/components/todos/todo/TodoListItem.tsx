import classNames from 'classnames';
import {
  CheckIcon,
  EditIcon,
  EditTextInput,
  IconOrButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  RemoveIcon,
  TodoIcon
} from 'ui-components-lib';
import { Todo } from 'app/stores/todos/Todo';
import classes from './TodoListItem.module.scss';
import { useTodo } from './useTodo';

type Props = {
  readonly todo: Todo;
};

export const TodoListItem = ({ todo: { id, title, isDone } }: Props) => {
  const { changeTitle, isEditable, remove, setAsEditable, toggleDone } = useTodo(id);
  const titleClasses = classNames(classes.title, isDone && classes.isDone);

  return (
    <ListItem className={classes.todo}>
      <ListItemIcon icon={<TodoIcon color={isDone ? 'success' : 'error'} />} />
      {isEditable ? (
        <EditTextInput aria-label="Edit todo" onEditComplete={changeTitle} text={title} />
      ) : (
        <ListItemText className={titleClasses} onDoubleClick={setAsEditable} text={title} />
      )}
      <div className={classes.buttons}>
        <IconOrButton
          icon={<CheckIcon />}
          onClick={toggleDone}
          text={isDone ? 'Mark undone' : 'Mark done'}
        />
        <IconOrButton icon={<EditIcon />} onClick={setAsEditable} text="Edit" />
        <IconOrButton icon={<RemoveIcon />} onClick={remove} text="Remove" />
      </div>
    </ListItem>
  );
};
