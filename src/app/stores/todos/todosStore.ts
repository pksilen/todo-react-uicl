import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { todoService } from 'app/services/FakeTodoService';
import { Todo } from './Todo';


type State = {
  editableTodoId: string | null;
  hasError: boolean;
  isPending: boolean;
  lowerCaseTodoFilterText: string;
  shouldShowUndoneTodosOnly: boolean;
  todos: Todo[];
};

type Actions = {
  addTodo: (title: string) => Promise<void>;
  clearError: () => void;
  editTodo: (id: string) => (newTitle: string) => void;
  fetchTodos: () => void;
  removeTodo: (id: string) => void;
  setEditableTodo: (id: string | null) => void;
  setTodoFilter: (text: string) => void;
  toggleShouldShowUndoneTodosOnly: () => void;
  toggleTodoDone: (id: string) => void;
};

export type TodosStore = State & { actions: Actions };

export const useTodosStore = create<TodosStore>()((setState, getState) => ({
  editableTodoId: null,
  hasError: false,
  isPending: false,
  lowerCaseTodoFilterText: '',
  shouldShowUndoneTodosOnly: false,
  todos: [],

  actions: {
    addTodo: async (title: string) => {
      const todo = { id: uuidv4(), title, isDone: false };
      const error = await todoService.createTodo(todo);
      setState({ hasError: !!error, todos: [...getState().todos, todo] });
    },

    clearError: () => setState({ hasError: false }),

    editTodo: (id: string) => (newTitle: string) =>
      setState({
        editableTodoId: null,
        todos: getState().todos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      }),

    fetchTodos: async () => {
      setState({ isPending: true });
      const [todos, error] = await todoService.getTodos();
      setState({ hasError: !!error, isPending: false, todos });
    },

    removeTodo: (id: string) =>
      setState({
        todos: getState().todos.filter((todo) => todo.id !== id)
      }),

    toggleShouldShowUndoneTodosOnly: () =>
      setState({
        shouldShowUndoneTodosOnly: !getState().shouldShowUndoneTodosOnly
      }),

    setEditableTodo: (id: string | null) => setState({ editableTodoId: id }),
    setTodoFilter: (text: string) => setState({ lowerCaseTodoFilterText: text.toLowerCase() }),

    toggleTodoDone: (id: string) =>
      setState({
        todos: getState().todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      })
  }
}));
