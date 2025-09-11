import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { YAMLManager } from '../../utils/yaml';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export function YAMLEditor() {
  const { state, actions } = useApp();
  const [yamlContent, setYamlContent] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    try {
      const yaml = YAMLManager.stringify(state.config);
      setYamlContent(yaml);
      setErrors([]);
      setIsValid(true);
    } catch (error) {
      setErrors([`Error generating YAML: ${error}`]);
      setIsValid(false);
    }
  }, [state.config]);

  const handleYAMLChange = (value: string) => {
    setYamlContent(value);
    validateYAML(value);
  };

  const validateYAML = (yaml: string) => {
    try {
      YAMLManager.parse(yaml);
      setErrors([]);
      setIsValid(true);
    } catch (error) {
      setErrors([`${error}`]);
      setIsValid(false);
    }
  };

  const handleApplyChanges = () => {
    if (isValid) {
      actions.importConfig(yamlContent);
      toast.success('Changes applied successfully');
    } else {
      toast.error('Cannot apply changes: invalid configuration');
    }
  };

  const handleRevert = () => {
    try {
      const yaml = YAMLManager.stringify(state.config);
      setYamlContent(yaml);
      setErrors([]);
      setIsValid(true);
      toast.success('Changes reverted');
    } catch (error) {
      toast.error('Error reverting changes');
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`p-4 border-b flex items-center justify-between ${
        state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center space-x-4">
          <h2 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            YAML Editor
          </h2>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isValid 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {isValid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {isValid ? 'Valid' : 'Invalid'}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleRevert}
            className={`px-4 py-2 rounded-lg transition-colors ${
              state.darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Revert
          </button>
          
          <button
            onClick={handleApplyChanges}
            disabled={!isValid}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isValid
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            Apply Changes
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">
                Validation errors:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-400">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <textarea
            value={yamlContent}
            onChange={(e) => handleYAMLChange(e.target.value)}
            className={`w-full h-full p-4 font-mono text-sm resize-none border-none outline-none ${
              state.darkMode 
                ? 'bg-gray-900 text-gray-100' 
                : 'bg-white text-gray-900'
            }`}
            placeholder="# DeluxeMenu Configuration
menus:
  example:
    title: '&aExample'
    size: 27
    items:
      item1:
        material: DIAMOND
        slot: 13
        display_name: '&bExample Item'
        lore:
          - '&7This is a lore line'
        actions:
          left_click:
            - '[message] Hello world!'"
            spellCheck={false}
          />
        </div>

        <div className={`w-1/2 border-l ${
          state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className={`p-4 border-b ${
            state.darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Preview
            </h3>
          </div>
          
          <div className="p-4 h-full overflow-auto">
            <SyntaxHighlighter
              language="yaml"
              style={state.darkMode ? oneDark : oneLight}
              customStyle={{
                background: 'transparent',
                margin: 0,
                padding: 0,
                fontSize: '0.875rem'
              }}
              wrapLongLines
            >
              {yamlContent}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
