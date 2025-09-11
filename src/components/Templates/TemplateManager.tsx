import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Copy, Star, Grid, Zap, Users, ShoppingCart } from 'lucide-react';
import { DeluxeMenuConfig } from '../../types/commandpanels';
import { parseYAML } from '../../utils/yaml';

interface MenuTemplate {
  id: string;
  name: string;
  description: string;
  category: 'shop' | 'admin' | 'player' | 'custom' | 'example';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
  config: DeluxeMenuConfig;
  preview?: string;
}

interface TemplateManagerProps {
  onTemplateSelect: (config: DeluxeMenuConfig) => void;
}

const MENU_TEMPLATES: MenuTemplate[] = [
  {
    id: 'advanced_example',
    name: 'Advanced Menu',
    description: 'Complete example with kits, shop, and advanced requirements',
    category: 'example',
    difficulty: 'advanced',
    features: ['Kits with cooldown', 'Shop system', 'Complex requirements', 'Per-item permissions'],
    config: {
      menu_title: '&8> &6&lD&eM &bAdvanced Example',
      open_command: ['advancedmenu', 'advancedexamplemenu'],
      open_commands: [
        '[sound] BLOCK_BEACON_ACTIVATE',
        '[message] &7Opening Advanced example menu, Plugin created by &bextended_clip&7!'
      ],
      size: 27,
      open_requirement: {
        requirements: {
          permission: {
            type: 'has permission',
            permission: 'deluxemenus.admin',
            deny_commands: ["[message] &8[&bDeluxe&eMenus&8] &cYou don't have perms for this!"]
          }
        }
      },
      items: {
        'example': {
          material: 'LIME_DYE',
          slot: 11,
          priority: 1,
          update: true,
          item_flags: ['HIDE_ATTRIBUTES'],
          display_name: '&bExample Kit',
          lore: [
            '',
            '&7Cooldown : &f3 Days',
            '&7Left Click to Redeem'
          ],
          view_requirement: {
            requirements: {
              kit_requirement: {
                type: 'string equals',
                input: '%essentials_kit_is_available_example%',
                output: 'yes'
              },
              kit_perm: {
                type: 'has permission',
                permission: 'essentials.kits.example'
              }
            }
          },
          left_click_commands: [
            '[player] kit example',
            '[close]'
          ]
        },
        'shopexample': {
          material: 'PLAYER_HEAD',
          slot: 12,
          display_name: '&r',
          lore: [
            '&7Shop example using',
            '&7view requirements!',
            '&fLeft click to purchase.'
          ],
          priority: 1,
          view_requirement: {
            requirements: {
              shop_perm: {
                type: 'has permission',
                permission: 'deluxemenus.shopexample'
              }
            }
          },
          left_click_commands: [
            '[sound] ENTITY_FIREWORK_ROCKET_BLAST',
            '[console] give %player_name% PLAYER_HEAD 1',
            '[message] &8[&6&lDeluxeShop&8] &fYou have successfully purchased the head!',
            '[console] eco take %player_name% 666',
            '[close]'
          ],
          left_click_requirement: {
            requirements: {
              balance_check: {
                type: 'has money',
                amount: 666
              }
            }
          }
        },
        'filler_item': {
          material: 'GRAY_STAINED_GLASS_PANE',
          slots: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          display_name: ' '
        }
      }
    }
  },
  {
    id: 'basics_menu',
    name: 'Basic Menu',
    description: 'Simple menu for beginners with basic configuration',
    category: 'example',
    difficulty: 'beginner',
    features: ['Simple configuration', 'One example item', 'Basic permissions'],
    config: {
      menu_title: 'Basics Menu',
      open_command: 'basicsmenu',
      size: 9,
      open_requirement: {
        requirements: {
          permission: {
            type: 'has permission',
            permission: 'deluxemenus.admin',
            deny_commands: ["[message] &cYou don't have permission to do that!"]
          }
        }
      },
      items: {
        'teststone': {
          material: 'GRANITE',
          slot: 0,
          display_name: '&aThis is a special stone',
          lore:
            [
              '&aTest1',
              '&cTest2',
              '&eTest3'
            ]
        }
      }
    }
  },
  {
    id: 'requirements_menu',
    name: 'Menu with Requirements',
    description: 'Example of a menu with a complete requirements system',
    category: 'example',
    difficulty: 'intermediate',
    features: ['Money requirements', 'Item requirements', 'Shop system', 'Multiple click types'],
    config: {
      menu_title: 'Requirements Menu',
      open_command: 'requirementsmenu',
      size: 9,
      open_requirement: {
        requirements: {
          permission: {
            type: 'has permission',
            permission: 'deluxemenus.shop',
            deny_commands: ["[message] &cYou don't have permission to do that!"]
          }
        }
      },
      items: {
        'gold_block': {
          material: 'GOLD_BLOCK',
          slot: 0,
          lore:
            [
              '&7Buy/Sell GOLD_BLOCK',
              '',
              '&7- Left-click: &bBuy 1 &7for &a$100',
              '&7- Right-click: &bSell 1 &7for &a$50',
              '&7- Shift-left-click: &bBuy 64 &7for &a6,400',
              '&7- Shift-right-click: &bSell 64 &7for &a$3,200'
            ],
          left_click_requirement: {
            requirements: {
              has_money: {
                type: 'has money',
                amount: 100
              }
            }
          },
          left_click_commands:
            [
              '[console] give %player_name% GOLD_BLOCK 1',
              '[console] eco take %player_name% 100',
              '[message] &aYou bought 1 &6GOLD_BLOCK &afor $100'
            ],
          right_click_requirement: {
            requirements: {
              has_item: {
                type: 'has item',
                material: 'GOLD_BLOCK',
                amount: 1
              }
            }
          },
          right_click_commands:
            [
              '[console] clear %player_name% GOLD_BLOCK 1',
              '[console] eco give %player_name% 50',
              '[message] &aYou sold 1 &6GOLD_BLOCK &afor $50'
            ]
        }
      }
    }
  },
  {
    id: 'shop_template',
    name: 'Basic Shop',
    description: 'Shop template with common items and a buy/sell system',
    category: 'shop',
    difficulty: 'intermediate',
    features: ['Buy and sell', 'Money requirements', 'Popular items', 'Navigation'],
    config: {
      menu_title: '&6&lMain Shop',
      open_command: 'shop',
      size: 45,
      items: {
        'diamond': {
          material: 'DIAMOND',
          slot: 10,
          display_name: '&bDiamond',
          lore:
            [
              '&7Price: &a$500',
              '',
              '&eLeft-click to buy'
            ],
          left_click_requirement: {
            requirements: {
              has_money: {
                type: 'has money',
                amount: 500
              }
            }
          },
          left_click_commands:
            [
              '[console] give %player_name% DIAMOND 1',
              '[console] eco take %player_name% 500',
              '[message] &aYou bought a diamond for $500!',
              '[sound] ENTITY_EXPERIENCE_ORB_PICKUP'
            ]
        },
        'iron_ingot': {
          material: 'IRON_INGOT',
          slot: 11,
          display_name: '&7Iron Ingot',
          lore:
            [
              '&7Price: &a$50',
              '',
              '&eLeft-click to buy'
            ],
          left_click_requirement: {
            requirements: {
              has_money: {
                type: 'has money',
                amount: 50
              }
            }
          },
          left_click_commands:
            [
              '[console] give %player_name% IRON_INGOT 1',
              '[console] eco take %player_name% 50',
              '[message] &aYou bought an iron ingot for $50!',
              '[sound] ENTITY_EXPERIENCE_ORB_PICKUP'
            ]
        },
        'close': {
          material: 'BARRIER',
          slot: 40,
          display_name: '&cClose',
          lore: ['&7Click to close the shop'],
          left_click_commands: ['[close]']
        }
      }
    }
  },
  {
    id: 'admin_tools',
    name: 'Admin Tools',
    description: 'Administration menu with useful tools for moderators',
    category: 'admin',
    difficulty: 'advanced',
    features: ['Moderation tools', 'Teleportation', 'Player management', 'Admin commands'],
    config: {
      menu_title: '&4&lAdmin Tools',
      open_command: 'admintools',
      size: 27,
      open_requirement: {
        requirements: {
          permission: {
            type: 'has permission',
            permission: 'admin.tools',
            deny_commands: ["[message] &cYou do not have administrator permissions!"]
          }
        }
      },
      items: {
        'gamemode_creative': {
          material: 'GRASS_BLOCK',
          slot: 10,
          display_name: '&aCreative',
          lore: ['&7Switch to creative mode'],
          left_click_commands:
            [
              '[player] gamemode creative',
              '[message] &aGame mode changed to creative'
            ]
        },
        'gamemode_survival': {
          material: 'IRON_SWORD',
          slot: 11,
          display_name: '&cSurvival',
          lore: ['&7Switch to survival mode'],
          left_click_commands:
            [
              '[player] gamemode survival',
              '[message] &aGame mode changed to survival'
            ]
        },
        'teleport_spawn': {
          material: 'ENDER_PEARL',
          slot: 13,
          display_name: '&bTeleport to Spawn',
          lore: ['&7Go to the server spawn'],
          left_click_commands:
            [
              '[player] spawn',
              '[message] &aTeleported to spawn'
            ]
        },
        'heal': {
          material: 'GOLDEN_APPLE',
          slot: 15,
          display_name: '&eFull Regen',
          lore: ['&7Restore health and hunger'],
          left_click_commands:
            [
              '[console] heal %player_name%',
              '[console] feed %player_name%',
              '[message] &aHealth and hunger restored!'
            ]
        },
        'fly_toggle': {
          material: 'FEATHER',
          slot: 16,
          display_name: '&fToggle Flight',
          lore: ['&7Enable/disable flight'],
          left_click_commands:
            [
              '[player] fly',
              '[message] &aFlight toggled'
            ]
        }
      }
    }
  },
  {
    id: 'player_menu',
    name: 'Player Menu',
    description: 'Main menu for players with common actions',
    category: 'player',
    difficulty: 'beginner',
    features: ['Teleports', 'Player information', 'Basic actions'],
    config: {
      menu_title: '&9&lMain Menu',
      open_command: 'menu',
      size: 27,
      items: {
        'spawn': {
          material: 'BEACON',
          slot: 10,
          display_name: '&aSpawn',
          lore:
            [
              '&7Teleport to spawn',
              '',
              '&eClick to go'
            ],
          left_click_commands:
            [
              '[player] spawn',
              '[message] &aTeleported to spawn',
              '[close]'
            ]
        },
        'warps': {
          material: 'COMPASS',
          slot: 12,
          display_name: '&bWarps',
          lore:
            [
              '&7View available warps',
              '',
              '&eClick to open'
            ],
          left_click_commands:
            [
              '[player] warps'
            ]
        },
        'home': {
          material: 'RED_BED',
          slot: 14,
          display_name: '&cHome',
          lore:
            [
              '&7Go to your home',
              '',
              '&eClick to teleport'
            ],
          left_click_commands:
            [
              '[player] home',
              '[message] &aTeleported home',
              '[close]'
            ]
        },
        'info': {
          material: 'BOOK',
          slot: 16,
          display_name: '&eInformation',
          lore:
            [
              '&7View server information',
              '',
              '&eClick to view'
            ],
          left_click_commands:
            [
              '[message] &6=== Server Information ===',
              '[message] &7Version: &aPaper 1.21.8',
              '[message] &7Players online: &b%server_online%',
              '[message] &7Your rank: &c%vault_rank%'
            ]
        }
      }
    }
  }
];

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  onTemplateSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<MenuTemplate | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: Grid },
    { id: 'example', label: 'Examples', icon: FileText },
    { id: 'shop', label: 'Shops', icon: ShoppingCart },
    { id: 'admin', label: 'Admin', icon: Star },
    { id: 'player', label: 'Player', icon: Users },
    { id: 'custom', label: 'Custom', icon: Zap }
  ];

  const difficulties = [
    { id: 'all', label: 'All levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const filteredTemplates = MENU_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || Grid;
  };

  const handleTemplateSelect = (template: MenuTemplate) => {
    onTemplateSelect(template.config);
  };

  const handleDownloadTemplate = (template: MenuTemplate) => {
    const yamlContent = `# ${template.name}
# ${template.description}
# Difficulty: ${template.difficulty}
# Features: ${template.features.join(', ')}

${JSON.stringify(template.config, null, 2)}`;

    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '_')}.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Templates
        </h2>
        <p className="text-gray-600">
          Get started quickly with pre-made templates based on common use cases
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const CategoryIcon = getCategoryIcon(template.category);
          
          return (
            <div
              key={template.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{template.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>

              <div className="mb-4">
                <div className="text-xs font-medium text-gray-500 mb-2">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 text-xs text-gray-500 space-y-1">
                <div>Size: {template.config.size} slots</div>
                <div>Items: {Object.keys(template.config.items).length}</div>
                <div>Commands: {Array.isArray(template.config.open_command) ? 
                  template.config.open_command.join(', ') : 
                  template.config.open_command || 'None'}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Use Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownloadTemplate(template)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No templates found</p>
          <p className="text-sm">Try adjusting the search filters</p>
        </div>
      )}

      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Preview: {previewTemplate.name}
                </h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Category:</strong> {previewTemplate.category}</div>
                      <div><strong>Difficulty:</strong> {previewTemplate.difficulty}</div>
                      <div><strong>Size:</strong> {previewTemplate.config.size} slots</div>
                      <div><strong>Items:</strong> {Object.keys(previewTemplate.config.items).length}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Features</h4>
                    <div className="space-y-1">
                      {previewTemplate.features.map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600">• {feature}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">YAML Configuration</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {JSON.stringify(previewTemplate.config, null, 2)}
                  </pre>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleTemplateSelect(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};