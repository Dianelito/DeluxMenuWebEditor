import React from 'react';
import { Sun, Moon, Save, FileText, Settings, Download, Upload } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Header() {
  const { state, dispatch, actions } = useApp();

  const handleExport = () => {
    const yamlString = actions.exportConfig();
    if (yamlString) {
      const blob = new Blob([yamlString], { type: 'text/yaml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deluxemenu-config.yml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        actions.importConfig(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className={`border-b ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                DeluxeMenu Manager
              </h1>
              <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Visual editor for Minecraft Paper 1.21.8
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => actions.createBackup()}
            className={`p-2 rounded-lg transition-colors ${
              state.darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Create backup"
          >
            <Save className="w-5 h-5" />
          </button>

          <input
            type="file"
            accept=".yml,.yaml"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              state.darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Import configuration"
          >
            <Upload className="w-5 h-5" />
          </label>

          <button
            onClick={handleExport}
            className={`p-2 rounded-lg transition-colors ${
              state.darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Export configuration"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_YAML_MODE' })}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              state.yamlMode
                ? 'bg-blue-500 text-white'
                : state.darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            YAML
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className={`p-2 rounded-lg transition-colors ${
              state.darkMode 
                ? 'hover:bg-gray-700 text-yellow-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Toggle theme"
          >
            {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            className={`p-2 rounded-lg transition-colors ${
              state.darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
