import React, { useState, useEffect } from 'react';
import { Trash2, Image, Type, List, Zap, Eye, EyeOff } from 'lucide-react';
import { DeluxeMenuItem } from '../../types/commandpanels';
import { getTextureInfo, searchTextures, getCategories, MINECRAFT_TEXTURES } from '../../utils/minecraftTextures';
import { MaterialSelector } from './MaterialSelector';

interface ItemEditorProps {
  itemName: string;
  item: DeluxeMenuItem;
  onUpdate: (item: DeluxeMenuItem) => void;
  onDelete: () => void;
  menuSize: number;
}

export const ItemEditor: React.FC<ItemEditorProps> = ({
  itemName,
  item,
  onUpdate,
  onDelete,
  menuSize
}) => {
  const [activeSection, setActiveSection] = useState<'basic' | 'appearance' | 'actions' | 'requirements'>('basic');
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);

  const handleUpdate = (updates: Partial<DeluxeMenuItem>) => {
    onUpdate({ ...item, ...updates });
  };

  const handleLoreChange = (index: number, value: string) => {
    const newLore = [...(item.lore || [])];
    newLore[index] = value;
    handleUpdate({ lore: newLore });
  };

  const handleLoreAdd = () => {
    const newLore = [...(item.lore || []), ''];
    handleUpdate({ lore: newLore });
  };

  const handleLoreRemove = (index: number) => {
    const newLore = [...(item.lore || [])];
    newLore.splice(index, 1);
    handleUpdate({ lore: newLore });
  };

  const handleCommandChange = (type: 'left_click_commands' | 'right_click_commands' | 'shift_left_click_commands' | 'shift_right_click_commands', index: number, value: string) => {
    const commands = [...(item[type] || [])];
    commands[index] = value;
    handleUpdate({ [type]: commands });
  };

  const handleCommandAdd = (type: 'left_click_commands' | 'right_click_commands' | 'shift_left_click_commands' | 'shift_right_click_commands') => {
    const commands = [...(item[type] || []), ''];
    handleUpdate({ [type]: commands });
  };

  const handleCommandRemove = (type: 'left_click_commands' | 'right_click_commands' | 'shift_left_click_commands' | 'shift_right_click_commands', index: number) => {
    const commands = [...(item[type] || [])];
    commands.splice(index, 1);
    handleUpdate({ [type]: commands });
  };

  const generateSlotOptions = () => {
    const slots = [];
    const rows = Math.ceil(menuSize / 9);
    for (let i = 0; i < menuSize; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      slots.push({
        value: i,
        label: `Slot ${i} (Row ${row + 1}, Col ${col + 1})`
      });
    }
    return slots;
  };

  const textureInfo = getTextureInfo(item.material);

  const sections = [
    { id: 'basic', label: 'Basic', icon: Type },
    { id: 'appearance', label: 'Appearance', icon: Image },
    { id: 'actions', label: 'Actions', icon: Zap },
    { id: 'requirements', label: 'Requirements', icon: Eye }
  ] as const;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Editing: {itemName}
            </h3>
            <p className="text-sm text-gray-600">
              {textureInfo?.displayName || item.material} - Slot {item.slot}
            </p>
          </div>
          <button
            onClick={onDelete}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-gray-50">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeSection === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'basic' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <div className="flex items-center space-x-3">
                {textureInfo && (
                  <img
                    src={textureInfo.textureUrl}
                    alt={textureInfo.displayName}
                    className="w-12 h-12 pixelated border border-gray-300 rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.material}
                    onChange={(e) => handleUpdate({ material: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="STONE"
                  />
                  <button
                    onClick={() => setShowMaterialSelector(true)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Select material
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slot
              </label>
              <select
                value={item.slot || 0}
                onChange={(e) => handleUpdate({ slot: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {generateSlotOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                min="1"
                max="64"
                value={item.amount || 1}
                onChange={(e) => handleUpdate({ amount: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <input
                type="number"
                min="1"
                value={item.priority || 1}
                onChange={(e) => handleUpdate({ priority: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower number = higher priority
              </p>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={item.display_name || ''}
                onChange={(e) => handleUpdate({ display_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="&7Item Name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use color codes like &a, &b, &c, etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lore
              </label>
              <div className="space-y-2">
                {(item.lore || []).map((line, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => handleLoreChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="&7Lore line"
                    />
                    <button
                      onClick={() => handleLoreRemove(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleLoreAdd}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add line
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.hide_attributes || false}
                    onChange={(e) => handleUpdate({ hide_attributes: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hide attributes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.hide_enchantments || false}
                    onChange={(e) => handleUpdate({ hide_enchantments: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hide enchantments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.update || false}
                    onChange={(e) => handleUpdate({ update: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Update placeholders</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enchantments
              </label>
              <div className="space-y-2">
                {(item.enchantments || []).map((enchantment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={enchantment}
                      onChange={(e) => {
                        const newEnchantments = [...(item.enchantments || [])];
                        newEnchantments[index] = e.target.value;
                        handleUpdate({ enchantments: newEnchantments });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="UNBREAKING;1"
                    />
                    <button
                      onClick={() => {
                        const newEnchantments = [...(item.enchantments || [])];
                        newEnchantments.splice(index, 1);
                        handleUpdate({ enchantments: newEnchantments });
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newEnchantments = [...(item.enchantments || []), 'UNBREAKING;1'];
                    handleUpdate({ enchantments: newEnchantments });
                  }}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add enchantment
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: ENCHANTMENT_NAME;LEVEL (e.g., UNBREAKING;1)
              </p>
            </div>
          </div>
        )}

        {activeSection === 'actions' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Left Click Commands
              </label>
              <div className="space-y-2">
                {(item.left_click_commands || []).map((command, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => handleCommandChange('left_click_commands', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="[player] command"
                    />
                    <button
                      onClick={() => handleCommandRemove('left_click_commands', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleCommandAdd('left_click_commands')}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add command
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Right Click Commands
              </label>
              <div className="space-y-2">
                {(item.right_click_commands || []).map((command, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => handleCommandChange('right_click_commands', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="[console] command"
                    />
                    <button
                      onClick={() => handleCommandRemove('right_click_commands', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleCommandAdd('right_click_commands')}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add command
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift + Left Click Commands
              </label>
              <div className="space-y-2">
                {(item.shift_left_click_commands || []).map((command, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => handleCommandChange('shift_left_click_commands', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="[message] message"
                    />
                    <button
                      onClick={() => handleCommandRemove('shift_left_click_commands', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleCommandAdd('shift_left_click_commands')}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  + Add command
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Available Command Types:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li><code>[player] command</code> - Executes as player</li>
                <li><code>[console] command</code> - Executes from console</li>
                <li><code>[message] message</code> - Sends message to player</li>
                <li><code>[sound] sound</code> - Plays sound</li>
                <li><code>[close]</code> - Closes the menu</li>
                <li><code>[refresh]</code> - Refreshes the menu</li>
                <li><code>[openguimenu] menu</code> - Opens another menu</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'requirements' && (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Requirements</h4>
              <p className="text-sm text-yellow-700">
                Requirements allow you to control when an item is displayed and when its actions can be executed.
                This functionality will be available in a future update.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Requirements
              </label>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <EyeOff className="w-8 h-8 mx-auto mb-2" />
                <p>Coming soon: Configure when to show this item</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Click Requirements
              </label>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <p>Coming soon: Configure requirements to execute actions</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showMaterialSelector && (
        <MaterialSelector
          onSelect={(material) => {
            handleUpdate({ material });
            setShowMaterialSelector(false);
          }}
          onClose={() => setShowMaterialSelector(false)}
        />
      )}
    </div>
  );
};
