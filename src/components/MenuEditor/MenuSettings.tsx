import React from 'react';
import { Settings, Users, Clock, Grid } from 'lucide-react';
import { DeluxeMenuConfig } from '../../types/commandpanels';

interface MenuSettingsProps {
  config: DeluxeMenuConfig;
  onChange: (config: DeluxeMenuConfig) => void;
}

export const MenuSettings: React.FC<MenuSettingsProps> = ({
  config,
  onChange
}) => {
  const handleUpdate = (updates: Partial<DeluxeMenuConfig>) => {
    onChange({ ...config, ...updates });
  };

  const handleOpenCommandChange = (index: number, value: string) => {
    const commands = Array.isArray(config.open_command) 
      ? [...config.open_command] 
      : config.open_command ? [config.open_command] : [];
    
    commands[index] = value;
    handleUpdate({ open_command: commands.length === 1 ? commands[0] : commands });
  };

  const handleOpenCommandAdd = () => {
    const commands = Array.isArray(config.open_command) 
      ? [...config.open_command] 
      : config.open_command ? [config.open_command] : [];
    
    commands.push('');
    handleUpdate({ open_command: commands });
  };

  const handleOpenCommandRemove = (index: number) => {
    const commands = Array.isArray(config.open_command) 
      ? [...config.open_command] 
      : config.open_command ? [config.open_command] : [];
    
    commands.splice(index, 1);
    
    if (commands.length === 0) {
      handleUpdate({ open_command: undefined });
    } else if (commands.length === 1) {
      handleUpdate({ open_command: commands[0] });
    } else {
      handleUpdate({ open_command: commands });
    }
  };

  const openCommands = Array.isArray(config.open_command) 
    ? config.open_command 
    : config.open_command ? [config.open_command] : [];

  const sizeOptions = [
    { value: 9, label: '9 slots (1 row)' },
    { value: 18, label: '18 slots (2 rows)' },
    { value: 27, label: '27 slots (3 rows)' },
    { value: 36, label: '36 slots (4 rows)' },
    { value: 45, label: '45 slots (5 rows)' },
    { value: 54, label: '54 slots (6 rows)' }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Basic Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Title
            </label>
            <input
              type="text"
              value={config.menu_title || ''}
              onChange={(e) => handleUpdate({ menu_title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="&8> &6My Menu"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use color codes like &a, &b, &c, etc.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Size
            </label>
            <select
              value={config.size}
              onChange={(e) => handleUpdate({ size: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Open Commands
            </label>
            <div className="space-y-2">
              {openCommands.map((command, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => handleOpenCommandChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="mymenu"
                  />
                  <button
                    onClick={() => handleOpenCommandRemove(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={handleOpenCommandAdd}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                + Add command
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Commands that players can use to open this menu (without /)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Interval (seconds)
            </label>
            <input
              type="number"
              min="1"
              value={config.update_interval || ''}
              onChange={(e) => handleUpdate({ 
                update_interval: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Do not update automatically"
            />
            <p className="text-xs text-gray-500 mt-1">
              How often placeholders in the menu are updated
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Access Requirements</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={!!config.open_requirement}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleUpdate({
                      open_requirement: {
                        requirements: {
                          permission: {
                            type: 'has permission',
                            permission: 'mymenu.use',
                            deny_commands: ['[message] &cYou do not have permission to open this menu!']
                          }
                        }
                      }
                    });
                  } else {
                    handleUpdate({ open_requirement: undefined });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Require permission to open the menu
              </span>
            </label>

            {config.open_requirement && (
              <div className="ml-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Permission
                  </label>
                  <input
                    type="text"
                    value={config.open_requirement.requirements.permission?.permission || ''}
                    onChange={(e) => {
                      const newRequirement = {
                        ...config.open_requirement!,
                        requirements: {
                          ...config.open_requirement!.requirements,
                          permission: {
                            ...config.open_requirement!.requirements.permission!,
                            permission: e.target.value
                          }
                        }
                      };
                      handleUpdate({ open_requirement: newRequirement });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="mymenu.use"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Denial Message
                  </label>
                  <input
                    type="text"
                    value={config.open_requirement.requirements.permission?.deny_commands?.[0]?.replace('[message] ', '') || ''}
                    onChange={(e) => {
                      const newRequirement = {
                        ...config.open_requirement!,
                        requirements: {
                          ...config.open_requirement!.requirements,
                          permission: {
                            ...config.open_requirement!.requirements.permission!,
                            deny_commands: [`[message] ${e.target.value}`]
                          }
                        }
                      };
                      handleUpdate({ open_requirement: newRequirement });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="&cYou do not have permission to open this menu!"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Grid className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Advanced Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Open Commands
            </label>
            <div className="space-y-2">
              {(config.open_commands || []).map((command, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => {
                      const newCommands = [...(config.open_commands || [])];
                      newCommands[index] = e.target.value;
                      handleUpdate({ open_commands: newCommands });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="[sound] BLOCK_BEACON_ACTIVATE"
                  />
                  <button
                    onClick={() => {
                      const newCommands = [...(config.open_commands || [])];
                      newCommands.splice(index, 1);
                      handleUpdate({ open_commands: newCommands.length > 0 ? newCommands : undefined });
                    }}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newCommands = [...(config.open_commands || []), ''];
                  handleUpdate({ open_commands: newCommands });
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                + Add command
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Commands that run when the menu is opened (sounds, messages, etc.)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-800 mb-4">Configuration Preview</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">Title:</span>
            <span className="font-mono text-blue-800">{config.menu_title || 'Untitled'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Size:</span>
            <span className="font-mono text-blue-800">{config.size} slots</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Commands:</span>
            <span className="font-mono text-blue-800">
              {openCommands.length > 0 ? openCommands.join(', ') : 'None'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Requires permission:</span>
            <span className="font-mono text-blue-800">
              {config.open_requirement ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
