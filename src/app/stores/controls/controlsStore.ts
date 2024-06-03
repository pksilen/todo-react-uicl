import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { create } from 'zustand';
import { initialTheme } from './initialTheme';

export type ViewType = 'list' | 'table';
export type ViewMode = PaletteMode;

interface State {
  theme: typeof initialTheme;
  viewType: ViewType;
}

interface Actions {
  setViewMode: (viewMode: ViewMode) => void;
  setViewType: (viewType: ViewType) => void;
}

type ControlsStore = State & { actions: Actions };

export const useControlsStore = create<ControlsStore>()((setState) => ({
  theme: initialTheme,
  viewType: 'list',

  actions: {
    setViewMode: (viewMode: ViewMode) =>
      setState(() => ({
        theme: createTheme({
          palette: { mode: viewMode },
          typography: initialTheme.typography
        })
      })),

    setViewType: (viewType: ViewType) => setState(() => ({ viewType }))
  }
}));
