import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { MenuItem } from '../../types/deluxemenu';
import { MINECRAFT_MATERIALS } from '../../utils/minecraft';
import { Edit, Trash2, Copy, Settings } from 'lucide-react';

export function MenuEditor() {
  const { state, dispatch } = useApp();
  const [showItemEditor, setShowItemEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const activeMenu = state.activeMenu ? state.config.menus[state.activeMenu] : null;

  if (!activeMenu) {
    return (
      <div className={`flex-1 flex items-center justify-center ${ state.darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
        <div className="text-center">
          <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl mb-2">Select a menu</p>
          <p>Choose an existing menu or create a new one to get started</p>
        </div>
      </div>
    );
  }

  const handleSlotClick = (slot: number) => {
    const existingItem = activeMenu.items.find(item => item.slot === slot);
    
    if (existingItem) {
      setEditingItem(existingItem);
    } else {
      const newItem: MenuItem = {
        id: `item_${Date.now()}`,
        material: 'STONE',
        slot,
        displayName: '&fNew Item',
        lore: ['&7Configure this item'],
        amount: 1
      };
      setEditingItem(newItem);
    }
    setShowItemEditor(true);
  };

  const handleSaveItem = (item: MenuItem) => {
    if (activeMenu.items.find(i => i.id === item.id)) {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: { menuId: activeMenu.id, item }
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: { menuId: activeMenu.id, item }
      });
    }
    setShowItemEditor(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { menuId: activeMenu.id, itemId }
    });
  };

  const getRowCount = () => Math.ceil(activeMenu.size / 9);

  return (
    <div className={`flex-1 flex flex-col ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`p-6 border-b ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeMenu.title.replace(/&[0-9a-f]/g, '')}
            </h2>
            <p className={`${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Size: {activeMenu.size} slots • {activeMenu.items.length} items
            </p>
          </div>
          <div className="flex space-x-2">
            <button className={`px-4 py-2 rounded-lg transition-colors ${ state.darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              <Edit className="w-4 h-4 inline mr-2" />
              Edit Menu
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-9 gap-1 p-4 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg">
            {Array.from({ length: activeMenu.size }, (_, index) => {
              const item = activeMenu.items.find(item => item.slot === index);
              
              return (
                <div
                  key={index}
                  onClick={() => handleSlotClick(index)}
                  className={`
                    aspect-square border-2 rounded-lg cursor-pointer transition-all duration-200
                    flex items-center justify-center relative overflow-hidden
                    ${item ? 'border-blue-400 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300' : 'border-gray-500 bg-gray-800 hover:border-gray-400 hover:bg-gray-700'}
                  `}
                  title={item ? item.displayName.replace(/&[0-9a-f]/g, '') : 'Empty slot'}
                >
                  {item && (
                    <>
                      <div className="text-xs font-bold text-gray-800 text-center">
                        {item.material.split('_')[0]}
                      </div>
                      
                      {item.amount && item.amount > 1 && (
                        <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs px-1 rounded-tl">
                          {item.amount}
                        </div>
                      )}
                      
                      <div className="absolute top-0 right-0 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.id);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-bl"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </>
                  )}
                  
                  {!item && (
                    <div className="text-gray-500 text-xs">+</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showItemEditor && editingItem && (
        <ItemEditorModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setShowItemEditor(false);
            setEditingItem(null);
          }}
          darkMode={state.darkMode}
        />
      )}
    </div>
  );
}

interface ItemEditorModalProps {
  item: MenuItem;
  onSave: (item: MenuItem) => void;
  onClose: () => void;
  darkMode: boolean;
}

function ItemEditorModal({ item, onSave, onClose, darkMode }: ItemEditorModalProps) {
  const [editedItem, setEditedItem] = useState<MenuItem>({ ...item });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${ darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <form onSubmit={handleSubmit} className="p-6">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Configure Item
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Material
              </label>
              <select
                value={editedItem.material}
                onChange={(e) => setEditedItem({ ...editedItem, material: e.target.value })}
                className={`w-full p-3 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                {MINECRAFT_MATERIALS.map(material => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Slot
              </label>
              <input
                type="number"
                min="0"
                max="53"
                value={editedItem.slot}
                onChange={(e) => setEditedItem({ ...editedItem, slot: parseInt(e.target.value) })}
                className={`w-full p-3 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div className="col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name (with color codes)
              </label>
              <input
                type="text"
                value={editedItem.displayName}
                onChange={(e) => setEditedItem({ ...editedItem, displayName: e.target.value })}
                className={`w-full p-3 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="&a&lExample name"
              />
            </div>

            <div className="col-span-2">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Lore (one line per entry)
              </label>
              <textarea
                value={editedItem.lore.join('\n')}
                onChange={(e) => setEditedItem({ 
                  ...editedItem, 
                  lore: e.target.value.split('\n').filter(line => line.trim() !== '') 
                })}
                className={`w-full p-3 rounded-lg border h-32 ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="&7First line of lore&#10;&aSecond line of lore"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount
              </label>
              <input
                type="number"
                min="1"
                max="64"
                value={editedItem.amount || 1}
                onChange={(e) => setEditedItem({ ...editedItem, amount: parseInt(e.target.value) })}
                className={`w-full p-3 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Data (optional)
              </label>
              <input
                type="number"
                min="0"
                value={editedItem.data || ''}
                onChange={(e) => setEditedItem({ 
                  ...editedItem, 
                  data: e.target.value ? parseInt(e.target.value) : undefined 
                })}
                className={`w-full p-3 rounded-lg border ${ darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg transition-colors ${ darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
