import React, { useState } from 'react';
import { Plus, Menu as MenuIcon, Palette, History, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Menu } from '../../types/deluxemenu';
import { MENU_TEMPLATES, getTemplatesByCategory } from '../../utils/templates';
import { BackupManager } from '../../utils/backup';

export function Sidebar() {
  const { state, dispatch, actions } = useApp();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const backups = BackupManager.getBackups();
  const templatesByCategory = getTemplatesByCategory();

  const handleCreateMenu = () => {
    const newMenu: Menu = {
      id: `menu_${Date.now()}`,
      title: '&7New Menu',
      size: 27,
      items: []
    };
    dispatch({ type: 'ADD_MENU', payload: newMenu });
    dispatch({ type: 'SET_ACTIVE_MENU', payload: newMenu.id });
  };

  const handleUseTemplate = (template: typeof MENU_TEMPLATES[0]) => {
    const newMenu: Menu = {
      ...template.menu,
      id: `menu_${Date.now()}`
    };
    dispatch({ type: 'ADD_MENU', payload: newMenu });
    dispatch({ type: 'SET_ACTIVE_MENU', payload: newMenu.id });
    setShowTemplates(false);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className={`w-80 border-r flex flex-col ${
      state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Menus
            </h2>
            <button
              onClick={handleCreateMenu}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              title="Create new menu"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {Object.values(state.config.menus).map((menu) => (
              <div
                key={menu.id}
                onClick={() => dispatch({ type: 'SET_ACTIVE_MENU', payload: menu.id })}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  state.activeMenu === menu.id
                    ? 'bg-blue-500 text-white'
                    : state.darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MenuIcon className="w-4 h-4" />
                  <div>
                    <div className="font-medium">{menu.title.replace(/&[0-9a-f]/g, '')}</div>
                    <div className="text-sm opacity-75">{menu.items.length} items</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className={`w-full flex items-center justify-between mb-4 text-left font-semibold ${
              state.darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Templates</span>
            </div>
            {showTemplates ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {showTemplates && (
            <div className="space-y-2">
              {Object.entries(templatesByCategory).map(([category, templates]) => (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center justify-between p-2 text-left text-sm font-medium ${
                      state.darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <span>{category}</span>
                    {expandedCategories[category] ? 
                      <ChevronDown className="w-3 h-3" /> : 
                      <ChevronRight className="w-3 h-3" />
                    }
                  </button>
                  
                  {expandedCategories[category] && (
                    <div className="ml-4 space-y-1">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleUseTemplate(template)}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            state.darkMode
                              ? 'hover:bg-gray-700 text-gray-400'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs opacity-75">{template.description}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <button
            onClick={() => setShowBackups(!showBackups)}
            className={`w-full flex items-center justify-between mb-4 text-left font-semibold ${
              state.darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </div>
            {showBackups ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {showBackups && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {backups.map((backup) => (
                <button
                  key={backup.id}
                  onClick={() => actions.restoreBackup(backup.id)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    state.darkMode
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="font-medium">{backup.name}</div>
                  <div className="text-xs opacity-75">
                    {new Date(backup.timestamp).toLocaleString()}
                  </div>
                </button>
              ))}
              
              {backups.length === 0 && (
                <div className={`text-sm ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  No backups available
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => actions.validateConfig()}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Validate Configuration
        </button>
      </div>
    </div>
  );
}
