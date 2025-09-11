import React, { useState } from 'react';
import { Zap, Plus, Trash2, Copy, Settings } from 'lucide-react';
import { DeluxeMenuConfig } from '../../types/commandpanels';

interface ActionAssignerProps {
  config: DeluxeMenuConfig;
  onChange: (config: DeluxeMenuConfig) => void;
}

interface ActionTemplate {
  name: string;
  description: string;
  commands: string[];
  category: 'player' | 'console' | 'menu' | 'economy' | 'teleport' | 'custom';
}

const ACTION_TEMPLATES: ActionTemplate[] = [
  {
    name: 'Give Item',
    description: 'Gives a specific item to the player',
    commands: ['[console] give %player_name% DIAMOND 1'],
    category: 'player'
  },
  {
    name: 'Teleport',
    description: 'Teleports the player to a location',
    commands: ['[console] tp %player_name% spawn'],
    category: 'teleport'
  },
  {
    name: 'Execute Command as Player',
    description: 'The player executes a command',
    commands: ['[player] warp lobby'],
    category: 'player'
  },
  {
    name: 'Send Message',
    description: 'Sends a message to the player',
    commands: ['[message] &aHello %player_name%!'],
    category: 'player'
  },
  {
    name: 'Play Sound',
    description: 'Plays a sound for the player',
    commands: ['[sound] ENTITY_EXPERIENCE_ORB_PICKUP'],
    category: 'player'
  },

  {
    name: 'Give Money',
    description: 'Gives money to the player (requires economy)',
    commands: ['[console] eco give %player_name% 1000'],
    category: 'economy'
  },
  {
    name: 'Take Money',
    description: 'Takes money from the player (requires economy)',
    commands: ['[console] eco take %player_name% 500'],
    category: 'economy'
  },
  {
    name: 'Give Experience',
    description: 'Gives experience to the player',
    commands: ['[console] xp add %player_name% 100'],
    category: 'console'
  },
  {
    name: 'Change Gamemode',
    description: 'Changes the player\'s game mode',
    commands: ['[console] gamemode creative %player_name%'],
    category: 'console'
  },
  {
    name: 'Execute Kit',
    description: 'Gives a kit to the player (requires Essentials)',
    commands: ['[console] kit starter %player_name%'],
    category: 'console'
  },

  {
    name: 'Close Menu',
    description: 'Closes the current menu',
    commands: ['[close]'],
    category: 'menu'
  },
  {
    name: 'Refresh Menu',
    description: 'Refreshes the current menu',
    commands: ['[refresh]'],
    category: 'menu'
  },
  {
    name: 'Open Another Menu',
    description: 'Opens another GUI menu',
    commands: ['[openguimenu] shop'],
    category: 'menu'
  },
  {
    name: 'Connect to Server',
    description: 'Connects to another server (BungeeCord)',
    commands: ['[connect] lobby'],
    category: 'menu'
  },

  {
    name: 'Teleport to Spawn',
    description: 'Teleports the player to the spawn',
    commands: ['[player] spawn'],
    category: 'teleport'
  },
  {
    name: 'Teleport to Warp',
    description: 'Teleports the player to a warp',
    commands: ['[player] warp pvp'],
    category: 'teleport'
  },
  {
    name: 'Teleport to Coordinates',
    description: 'Teleports to specific coordinates',
    commands: ['[console] tp %player_name% 0 100 0'],
    category: 'teleport'
  },

  {
    name: 'Multiple Action',
    description: 'Executes multiple actions in sequence',
    commands: [
      '[message] &aReward received!',
      '[sound] ENTITY_PLAYER_LEVELUP',
      '[console] give %player_name% DIAMOND 5',
      '[console] eco give %player_name% 1000'
    ],
    category: 'custom'
  },
  {
    name: 'Action with Delay',
    description: 'Executes actions with a delay',
    commands: [
      '[message] &ePreparing teleport!',
      '[sound] BLOCK_PORTAL_AMBIENT',
      '[message] &aTeleported!<delay=60>',
      '[player] spawn<delay=60>'
    ],
    category: 'custom'
  }
];

const CATEGORY_LABELS = {
  'player': 'Player',
  'console': 'Console',
  'menu': 'Menu',
  'economy': 'Economy',
  'teleport': 'Teleport',
  'custom': 'Custom'
};

const CATEGORY_COLORS = {
  'player': 'bg-blue-100 text-blue-800',
  'console': 'bg-green-100 text-green-800',
  'menu': 'bg-purple-100 text-purple-800',
  'economy': 'bg-yellow-100 text-yellow-800',
  'teleport': 'bg-indigo-100 text-indigo-800',
  'custom': 'bg-gray-100 text-gray-800'
};

export const ActionAssigner: React.FC<ActionAssignerProps> = ({
  config,
  onChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const filteredTemplates = ACTION_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const applyTemplate = (template: ActionTemplate, clickType: 'left' | 'right' | 'shift_left' | 'shift_right') => {
    if (!selectedItem || !config.items[selectedItem]) return;

    const commandKey = `${clickType}_click_commands` as keyof typeof config.items[selectedItem];
    const updatedItem = {
      ...config.items[selectedItem],
      [commandKey]: [...template.commands]
    };

    const updatedConfig = {
      ...config,
      items: {
        ...config.items,
        [selectedItem]: updatedItem
      }
    };

    onChange(updatedConfig);
  };

  const copyCommands = (commands: string[]) => {
    navigator.clipboard.writeText(commands.join('\n'));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Zap className="w-6 h-6 text-yellow-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Action Assigner</h2>
          <p className="text-sm text-gray-600">
            Quickly and easily assign predefined actions to your menu items
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Item to Configure
        </label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an item...</option>
          {Object.entries(config.items).map(([itemName, item]) => (
            <option key={itemName} value={itemName}>
              {itemName} - {item.display_name || item.material} (Slot {item.slot})
            </option>
          ))}
        </select>
      </div>

      {selectedItem && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Current Actions: {selectedItem}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Left Click</h4>
                <div className="space-y-1">
                  {(config.items[selectedItem].left_click_commands || []).map((command, index) => (
                    <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {command}
                    </div>
                  ))}
                  {(!config.items[selectedItem].left_click_commands || config.items[selectedItem].left_click_commands.length === 0) && (
                    <div className="text-sm text-gray-500 italic">No actions configured</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Right Click</h4>
                <div className="space-y-1">
                  {(config.items[selectedItem].right_click_commands || []).map((command, index) => (
                    <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {command}
                    </div>
                  ))}
                  {(!config.items[selectedItem].right_click_commands || config.items[selectedItem].right_click_commands.length === 0) && (
                    <div className="text-sm text-gray-500 italic">No actions configured</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search action templates..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All categories</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Action Templates ({filteredTemplates.length})
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTemplates.map((template, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-800">{template.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${CATEGORY_COLORS[template.category]}`}>
                          {CATEGORY_LABELS[template.category]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                    <button
                      onClick={() => copyCommands(template.commands)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Copy commands"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Commands:</div>
                    <div className="space-y-1">
                      {template.commands.map((command, cmdIndex) => (
                        <div key={cmdIndex} className="text-xs font-mono bg-gray-100 p-2 rounded">
                          {command}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => applyTemplate(template, 'left')}
                      className="flex-1 px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    >
                      Left Click
                    </button>
                    <button
                      onClick={() => applyTemplate(template, 'right')}
                      className="flex-1 px-3 py-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      Right Click
                    </button>
                    <button
                      onClick={() => applyTemplate(template, 'shift_left')}
                      className="flex-1 px-3 py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                    >
                      Shift+Left
                    </button>
                    <button
                      onClick={() => applyTemplate(template, 'shift_right')}
                      className="flex-1 px-3 py-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors"
                    >
                      Shift+Right
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No action templates found</p>
                <p className="text-sm">Try with other search terms</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Action Help</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>Available placeholders:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><code>%player_name%</code> - Player name</li>
                <li><code>%player_uuid%</code> - Player UUID</li>
                <li><code>%player_world%</code> - Player\'s current world</li>
                <li>And all placeholders from PlaceholderAPI</li>
              </ul>
              <p><strong>Delays:</strong> Add <code>&lt;delay=ticks&gt;</code> at the end of a command to delay it (20 ticks = 1 second)</p>
            </div>
          </div>
        </>
      )}

      {!selectedItem && (
        <div className="text-center py-12 text-gray-500">
          <Settings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Select an item to configure its actions</p>
          <p className="text-sm">Choose an item from the menu to assign predefined actions to it</p>
        </div>
      )}
    </div>
  );
};