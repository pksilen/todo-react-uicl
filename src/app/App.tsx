import { CssBaseline, ThemeProvider } from '@mui/material';
import { AddTodo } from 'app/components/addtodo/AddTodo';
import { Controls } from 'app/components/controls/Controls';
import { ErrorBoundary } from 'app/components/errorboundary/ErrorBoundary';
import { Header } from 'app/components/header/Header';
import { useControlsStore } from 'app/stores/controls/controlsStore';
import classes from './App.module.scss';
import { TodosList } from './components/todos/TodosList';
import { TodosTable } from './components/todos/TodosTable';

export default function App() {
  const theme = useControlsStore((store) => store.theme);
  const viewType = useControlsStore((store) => store.viewType);

  return (
    <main className={classes.main}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Controls />
        <ErrorBoundary>
          {viewType === 'list' ? <TodosList /> : <TodosTable />}
          <AddTodo />
        </ErrorBoundary>
      </ThemeProvider>
    </main>
  );
}
