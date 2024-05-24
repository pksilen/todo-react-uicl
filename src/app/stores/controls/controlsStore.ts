import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { create } from 'zustand';


const initialTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    body1: {
      fontSize: '16px',
      fontWeight: 300
    },
    fontFamily: ['Neue Haas Grotesk Text', 'sans-serif'].join(','),
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.25rem'
    }
  }
});

export type ViewType = 'list' | 'table';
export type ViewMode = PaletteMode;

interface State {
  theme: typeof initialTheme;
  viewType: ViewType;
}

interface Actions {
  activateDarkMode: () => void;
  activateLightMode: () => void;
  showTodosList: () => void;
  showTodosTable: () => void;
}

type ControlsStore = State & { actions: Actions };

export const useControlsStore = create<ControlsStore>()((setState) => ({
  theme: initialTheme,
  viewType: 'list',

  actions: {
    activateDarkMode: () =>
      setState((store) => ({
        theme: createTheme({
          palette: { mode: 'dark' },
          typography: initialTheme.typography
        })
      })),

    activateLightMode: () =>
      setState((store) => ({
        theme: createTheme({
          palette: { mode: 'light' },
          typography: initialTheme.typography
        })
      })),

    showTodosList: () => setState((store) => ({ viewType: 'list' })),
    showTodosTable: () => setState((store) => ({ viewType: 'table' }))
  }
}));
