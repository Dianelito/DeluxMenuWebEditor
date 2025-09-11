import React, { useState } from 'react';
import { Menu, FileText, Palette, Download, Upload, Settings, Grid, Zap } from 'lucide-react';
import { DeluxeMenuConfig } from './types/commandpanels';
import { MenuEditor } from './components/MenuEditor/MenuEditor';
import { ConverterInterface } from './components/Converter/ConverterInterface';
import { TemplateManager } from './components/Templates/TemplateManager';
import { parseYAML } from './utils/yaml';

type AppMode = 'converter' | 'templates' | 'editor';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('converter');
  const [currentMenu, setCurrentMenu] = useState<DeluxeMenuConfig | null>(null);
  const [menuHistory, setMenuHistory] = useState<DeluxeMenuConfig[]>([]);

  const handleConversionComplete = (yamlContent: string) => {
    try {
      const config = parseYAML(yamlContent) as DeluxeMenuConfig;
      setCurrentMenu(config);
      setCurrentMode('editor');
      addToHistory(config);
    } catch (error) {
      console.error('Error parsing converted YAML:', error);
    }
  };

  const handleTemplateSelect = (config: DeluxeMenuConfig) => {
    setCurrentMenu(config);
    setCurrentMode('editor');
    addToHistory(config);
  };

  const handleMenuChange = (config: DeluxeMenuConfig) => {
    setCurrentMenu(config);
  };

  const handleMenuSave = () => {
    if (currentMenu) {
      addToHistory(currentMenu);
      console.log('Menu saved:', currentMenu);
    }
  };

  const addToHistory = (config: DeluxeMenuConfig) => {
    setMenuHistory(prev => {
      const newHistory = [config, ...prev.slice(0, 9)];
      return newHistory;
    });
  };

  const createNewMenu = () => {
    const newMenu: DeluxeMenuConfig = {
      menu_title: '&7New Menu',
      open_command: 'newmenu',
      size: 27,
      items: {}
    };
    setCurrentMenu(newMenu);
    setCurrentMode('editor');
  };

  const modes = [
    {
      id: 'converter' as const,
      label: 'Converter',
      icon: Zap,
      description: 'Convert menus from CommandPanels to DeluxeMenu'
    },
    {
      id: 'templates' as const,
      label: 'Templates',
      icon: FileText,
      description: 'Use pre-made templates to get started quickly'
    },
    {
      id: 'editor' as const,
      label: 'Editor',
      icon: Palette,
      description: 'Edit and customize your menus'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Menu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    DeluxeMenu Editor
                  </h1>
                  <p className="text-sm text-gray-600">
                    Advanced editor for Minecraft Paper 1.21.8 menus
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {currentMode !== 'editor' && (
                <button
                  onClick={createNewMenu}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Grid className="w-4 h-4" />
                  <span>New Menu</span>
                </button>
              )}
              
              <div className="text-sm text-gray-500">
                v2.0.0 - Minecraft 1.21.8
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    currentMode === mode.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentMode === 'converter' && (
          <ConverterInterface onConversionComplete={handleConversionComplete} />
        )}

        {currentMode === 'templates' && (
          <TemplateManager onTemplateSelect={handleTemplateSelect} />
        )}

        {currentMode === 'editor' && currentMenu && (
          <MenuEditor
            menuConfig={currentMenu}
            onConfigChange={handleMenuChange}
            onSave={handleMenuSave}
          />
        )}

        {currentMode === 'editor' && !currentMenu && (
          <div className="text-center py-12">
            <Grid className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No menu loaded
            </h3>
            <p className="text-gray-600 mb-6">
              Select a template, convert an existing menu, or create a new one to get started
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentMode('templates')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Templates</span>
              </button>
              <button
                onClick={() => setCurrentMode('converter')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Convert Menu</span>
              </button>
              <button
                onClick={createNewMenu}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Grid className="w-4 h-4" />
                <span>Create New</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              DeluxeMenu Editor - A tool for creating and editing Minecraft menus
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Compatible with Paper 1.21.8</span>
              <span>•</span>
              <span>DeluxeMenus Plugin</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
