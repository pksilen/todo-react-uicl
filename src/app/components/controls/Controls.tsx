import {
  DarkModeIcon,
  IconRadioButtonGroup,
  IconRadioButtonProps,
  LightModeIcon,
  ListIcon,
  Switch,
  TableIcon
} from 'ui-components-lib';
import { ViewType, useControlsStore } from 'app/stores/controls/controlsStore';
import { useTodosStore } from 'app/stores/todos/todosStore';
import classes from './Controls.module.scss';

type ViewMode = 'dark' | 'light';

export const Controls = () => {
  const { toggleShouldShowUndoneTodosOnly } = useTodosStore((store) => store.actions);
  const { setViewMode, setViewType } = useControlsStore((store) => store.actions);

  const viewTypeButtons: IconRadioButtonProps<ViewType>[] = [
    { icon: <ListIcon />, onClick: () => setViewType('list'), value: 'list' },
    { icon: <TableIcon />, onClick: () => setViewType('table'), value: 'table' }
  ];

  const viewModeButtons: IconRadioButtonProps<ViewMode>[] = [
    { icon: <LightModeIcon />, onClick: () => setViewMode('light'), value: 'light' },
    { icon: <DarkModeIcon />, onClick: () => setViewMode('dark'), value: 'dark' }
  ];

  return (
    <section className={classes.controls}>
      <IconRadioButtonGroup buttons={viewTypeButtons} initialValue="list" />
      <Switch label="Show undone only" onClick={toggleShouldShowUndoneTodosOnly} />
      <IconRadioButtonGroup buttons={viewModeButtons} initialValue="dark" />
    </section>
  );
};
