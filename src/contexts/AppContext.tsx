import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DeluxeMenuConfig, Menu, MenuItem } from '../types/deluxemenu';
import { YAMLManager } from '../utils/yaml';
import { BackupManager } from '../utils/backup';
import toast from 'react-hot-toast';

interface AppState {
  config: DeluxeMenuConfig;
  activeMenu: string | null;
  darkMode: boolean;
  yamlMode: boolean;
  selectedItem: MenuItem | null;
  draggedItem: MenuItem | null;
}

type AppAction =
  | { type: 'SET_CONFIG'; payload: DeluxeMenuConfig }
  | { type: 'ADD_MENU'; payload: Menu }
  | { type: 'UPDATE_MENU'; payload: Menu }
  | { type: 'DELETE_MENU'; payload: string }
  | { type: 'SET_ACTIVE_MENU'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: { menuId: string; item: MenuItem } }
  | { type: 'UPDATE_ITEM'; payload: { menuId: string; item: MenuItem } }
  | { type: 'DELETE_ITEM'; payload: { menuId: string; itemId: string } }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_YAML_MODE' }
  | { type: 'SET_SELECTED_ITEM'; payload: MenuItem | null }
  | { type: 'SET_DRAGGED_ITEM'; payload: MenuItem | null };

const initialState: AppState = {
  config: {
    menus: {},
    settings: {
      checkUpdates: true,
      language: 'en',
      defaultPermission: ''
    }
  },
  activeMenu: null,
  darkMode: true,
  yamlMode: false,
  selectedItem: null,
  draggedItem: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    importConfig: (yamlString: string) => void;
    exportConfig: () => string;
    createBackup: (name?: string) => void;
    restoreBackup: (backupId: string) => void;
    validateConfig: () => boolean;
  };
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, config: action.payload };
    
    case 'ADD_MENU':
      return {
        ...state,
        config: {
          ...state.config,
          menus: {
            ...state.config.menus,
            [action.payload.id]: action.payload
          }
        }
      };
    
    case 'UPDATE_MENU':
      if (!state.config.menus[action.payload.id]) return state;
      return {
        ...state,
        config: {
          ...state.config,
          menus: {
            ...state.config.menus,
            [action.payload.id]: action.payload
          }
        }
      };
    
    case 'DELETE_MENU':
      const { [action.payload]: deletedMenu, ...remainingMenus } = state.config.menus;
      return {
        ...state,
        config: {
          ...state.config,
          menus: remainingMenus
        },
        activeMenu: state.activeMenu === action.payload ? null : state.activeMenu
      };
    
    case 'SET_ACTIVE_MENU':
      return { ...state, activeMenu: action.payload };
    
    case 'ADD_ITEM':
      const menuForAdd = state.config.menus[action.payload.menuId];
      if (!menuForAdd) return state;
      
      return {
        ...state,
        config: {
          ...state.config,
          menus: {
            ...state.config.menus,
            [action.payload.menuId]: {
              ...menuForAdd,
              items: [...menuForAdd.items, action.payload.item]
            }
          }
        }
      };
    
    case 'UPDATE_ITEM':
      const menuForUpdate = state.config.menus[action.payload.menuId];
      if (!menuForUpdate) return state;
      
      return {
        ...state,
        config: {
          ...state.config,
          menus: {
            ...state.config.menus,
            [action.payload.menuId]: {
              ...menuForUpdate,
              items: menuForUpdate.items.map(item =>
                item.id === action.payload.item.id ? action.payload.item : item
              )
            }
          }
        }
      };
    
    case 'DELETE_ITEM':
      const menuForDelete = state.config.menus[action.payload.menuId];
      if (!menuForDelete) return state;
      
      return {
        ...state,
        config: {
          ...state.config,
          menus: {
            ...state.config.menus,
            [action.payload.menuId]: {
              ...menuForDelete,
              items: menuForDelete.items.filter(item => item.id !== action.payload.itemId)
            }
          }
        }
      };
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    
    case 'TOGGLE_YAML_MODE':
      return { ...state, yamlMode: !state.yamlMode };
    
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload };
    
    case 'SET_DRAGGED_ITEM':
      return { ...state, draggedItem: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    importConfig: (yamlString: string) => {
      try {
        const config = YAMLManager.parse(yamlString);
        dispatch({ type: 'SET_CONFIG', payload: config });
        toast.success('Configuration imported successfully');
      } catch (error) {
        toast.error(`Error importing: ${error}`);
      }
    },

    exportConfig: () => {
      try {
        return YAMLManager.stringify(state.config);
      } catch (error) {
        toast.error(`Error exporting: ${error}`);
        return '';
      }
    },

    createBackup: (name?: string) => {
      BackupManager.saveBackup(name || '', state.config);
      toast.success('Backup created successfully');
    },

    restoreBackup: (backupId: string) => {
      const config = BackupManager.restoreBackup(backupId);
      if (config) {
        dispatch({ type: 'SET_CONFIG', payload: config });
        toast.success('Backup restored successfully');
      } else {
        toast.error('Error restoring backup');
      }
    },

    validateConfig: () => {
      try {
        const yamlString = YAMLManager.stringify(state.config);
        YAMLManager.parse(yamlString);
        toast.success('Configuration is valid');
        return true;
      } catch (error) {
        toast.error(`Invalid configuration: ${error}`);
        return false;
      }
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
