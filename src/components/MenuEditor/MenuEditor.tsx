import React, { useState, useEffect } from 'react';
import { Save, Download, Upload, Eye, Settings, Palette, Grid, FileText } from 'lucide-react';
import { DeluxeMenuConfig, DeluxeMenuItem } from '../../types/commandpanels';
import { MenuPreview } from '../Preview/MenuPreview';
import { ItemEditor } from './ItemEditor';
import { MenuSettings } from './MenuSettings';
import { ActionAssigner } from './ActionAssigner';
import { parseYAML, stringifyYAML } from '../../utils/yaml';

interface MenuEditorProps {
  menuConfig: DeluxeMenuConfig;
  onConfigChange: (config: DeluxeMenuConfig) => void;
  onSave: () => void;
}

type EditorTab = 'preview' | 'items' | 'settings' | 'actions' | 'yaml';

export const MenuEditor: React.FC<MenuEditorProps> = ({
  menuConfig,
  onConfigChange,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('preview');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [yamlContent, setYamlContent] = useState<string>('');
  const [yamlError, setYamlError] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    try {
      const yaml = stringifyYAML(menuConfig);
      setYamlContent(yaml);
      setYamlError('');
    } catch (error) {
      setYamlError(`Error generating YAML: ${error.message}`);
    }
  }, [menuConfig]);

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [menuConfig]);

  const handleYamlChange = (value: string) => {
    setYamlContent(value);
    
    try {
      const parsed = parseYAML(value) as DeluxeMenuConfig;
      onConfigChange(parsed);
      setYamlError('');
    } catch (error) {
      setYamlError(`YAML Error: ${error.message}`);
    }
  };

  const handleItemUpdate = (itemName: string, item: DeluxeMenuItem) => {
    const updatedConfig = {
      ...menuConfig,
      items: {
        ...menuConfig.items,
        [itemName]: item
      }
    };
    onConfigChange(updatedConfig);
  };

  const handleItemDelete = (itemName: string) => {
    const updatedItems = { ...menuConfig.items };
    delete updatedItems[itemName];
    
    const updatedConfig = {
      ...menuConfig,
      items: updatedItems
    };
    onConfigChange(updatedConfig);
    
    if (selectedItem === itemName) {
      setSelectedItem(null);
    }
  };

  const handleItemAdd = () => {
    const newItemName = `new_item_${Date.now()}`;
    const newItem: DeluxeMenuItem = {
      material: 'STONE',
      slot: 0,
      display_name: '&7New Item',
      lore: ['&8Click to edit']
    };
    
    handleItemUpdate(newItemName, newItem);
    setSelectedItem(newItemName);
    setActiveTab('items');
  };

  const handleSave = () => {
    onSave();
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${menuConfig.menu_title?.replace(/[^a-zA-Z0-9]/g, '_') || 'menu'}.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const parsed = parseYAML(content) as DeluxeMenuConfig;
        onConfigChange(parsed);
        setYamlError('');
      } catch (error) {
        setYamlError(`Error importing file: ${error.message}`);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'items', label: 'Items', icon: Grid },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'actions', label: 'Actions', icon: Palette },
    { id: 'yaml', label: 'YAML', icon: FileText }
  ] as const;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Menu Editor: {menuConfig.menu_title || 'Untitled'}
          </h2>
          {hasUnsavedChanges && (
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
              Unsaved changes
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".yml,.yaml"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </label>
          
          <button
            onClick={handleExport}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'preview' && (
          <div className="h-full p-6">
            <MenuPreview 
              config={menuConfig}
              onItemClick={(itemName) => {
                setSelectedItem(itemName);
                setActiveTab('items');
              }}
            />
          </div>
        )}

        {activeTab === 'items' && (
          <div className="h-full flex">
            <div className="w-1/3 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">Menu Items</h3>
                  <button
                    onClick={handleItemAdd}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto h-full">
                {Object.entries(menuConfig.items).map(([itemName, item]) => (
                  <div
                    key={itemName}
                    onClick={() => setSelectedItem(itemName)}
                    className={`p-3 border-b border-gray-200 cursor-pointer transition-colors ${
                      selectedItem === itemName
                        ? 'bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-mono">
                        {item.slot !== undefined ? item.slot : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800 truncate">
                          {itemName}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {item.material} - {item.display_name || 'No name'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {Object.keys(menuConfig.items).length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Grid className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No items in the menu</p>
                    <button
                      onClick={handleItemAdd}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Add the first item
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              {selectedItem && menuConfig.items[selectedItem] ? (
                <ItemEditor
                  itemName={selectedItem}
                  item={menuConfig.items[selectedItem]}
                  onUpdate={(item) => handleItemUpdate(selectedItem, item)}
                  onDelete={() => handleItemDelete(selectedItem)}
                  menuSize={menuConfig.size}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Grid className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Select an item to edit</p>
                    <p className="text-sm mt-2">Or add a new item to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="h-full overflow-y-auto">
            <MenuSettings
              config={menuConfig}
              onChange={onConfigChange}
            />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="h-full overflow-y-auto">
            <ActionAssigner
              config={menuConfig}
              onChange={onConfigChange}
            />
          </div>
        )}

        {activeTab === 'yaml' && (
          <div className="h-full flex flex-col">
            {yamlError && (
              <div className="p-4 bg-red-50 border-b border-red-200">
                <div className="text-red-800 text-sm font-medium">YAML Error:</div>
                <div className="text-red-600 text-sm mt-1">{yamlError}</div>
              </div>
            )}
            
            <div className="flex-1 relative">
              <textarea
                value={yamlContent}
                onChange={(e) => handleYamlChange(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Menu YAML configuration..."
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
