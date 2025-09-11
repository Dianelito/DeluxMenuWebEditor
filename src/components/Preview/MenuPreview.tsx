import React, { useState, useEffect } from 'react';
import { Eye, Grid, Maximize2, Minimize2 } from 'lucide-react';
import { DeluxeMenuConfig, DeluxeMenuItem } from '../../types/commandpanels';
import { getTextureInfo } from '../../utils/minecraftTextures';

interface MenuPreviewProps {
  config: DeluxeMenuConfig;
  onItemClick?: (itemName: string) => void;
  className?: string;
}

interface PreviewItem {
  name: string;
  item: DeluxeMenuItem;
  slot: number;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({
  config,
  onItemClick,
  className = ''
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const items: PreviewItem[] = [];
    
    Object.entries(config.items).forEach(([itemName, item]) => {
      if (item.slots && Array.isArray(item.slots)) {
        item.slots.forEach(slot => {
          items.push({ name: itemName, item, slot });
        });
      } else if (item.slot !== undefined) {
        items.push({ name: itemName, item, slot: item.slot });
      }
    });

    items.sort((a, b) => {
      const priorityA = a.item.priority || 999;
      const priorityB = b.item.priority || 999;
      return priorityA - priorityB;
    });

    setPreviewItems(items);
  }, [config.items]);

  const rows = Math.ceil(config.size / 9);
  const totalSlots = config.size;

  const getItemAtSlot = (slot: number): PreviewItem | null => {
    const itemsAtSlot = previewItems.filter(item => item.slot === slot);
    return itemsAtSlot.length > 0 ? itemsAtSlot[0] : null;
  };

  const renderSlot = (slotIndex: number) => {
    const item = getItemAtSlot(slotIndex);
    const textureInfo = item ? getTextureInfo(item.item.material) : null;
    const isHovered = hoveredSlot === slotIndex;

    return (
      <div
        key={slotIndex}
        className={`
          relative w-12 h-12 border-2 border-gray-400 bg-gray-200 rounded-sm
          transition-all duration-200 cursor-pointer
          ${item ? 'hover:border-blue-400 hover:bg-blue-50' : 'hover:border-gray-500'}
          ${isHovered ? 'ring-2 ring-blue-300' : ''}
        `}
        onMouseEnter={() => setHoveredSlot(slotIndex)}
        onMouseLeave={() => setHoveredSlot(null)}
        onClick={() => item && onItemClick?.(item.name)}
        title={item ? `${item.name} - Slot ${slotIndex}` : `Empty slot ${slotIndex}`}
      >
        {item && (
          <>
            <div className="absolute inset-1 flex items-center justify-center">
              {textureInfo ? (
                <img
                  src={textureInfo.textureUrl}
                  alt={textureInfo.displayName}
                  className="w-full h-full pixelated"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.parentElement?.querySelector('.item-placeholder');
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              
              <div className="item-placeholder w-full h-full bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600 hidden">
                {item.item.material.substring(0, 2)}
              </div>
            </div>

            {item.item.amount && item.item.amount > 1 && (
              <div className="absolute bottom-0 right-0 bg-white text-black text-xs font-bold px-1 rounded-tl shadow">
                {item.item.amount}
              </div>
            )}

            {item.item.enchantments && item.item.enchantments.length > 0 && !item.item.hide_enchantments && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-sm pointer-events-none" />
            )}

            {isHovered && (
              <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg min-w-48 max-w-64">
                <div className="font-semibold mb-1">
                  {item.item.display_name ? 
                    item.item.display_name.replace(/&[0-9a-fk-or]/g, '') : 
                    textureInfo?.displayName || item.item.material
                  }
                </div>
                
                {item.item.lore && item.item.lore.length > 0 && (
                  <div className="space-y-1">
                    {item.item.lore.map((line, index) => (
                      <div key={index} className="text-xs text-gray-300">
                        {line.replace(/&[0-9a-fk-or]/g, '')}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                  <div>Material: {item.item.material}</div>
                  <div>Slot: {slotIndex}</div>
                  {item.item.priority && <div>Priority: {item.item.priority}</div>}
                </div>

                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </>
        )}

        {!item && isHovered && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 font-mono">
            {slotIndex}
          </div>
        )}
      </div>
    );
  };

  const previewContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Menu Preview
            </h3>
            <p className="text-sm text-gray-600">
              {config.menu_title ? 
                config.menu_title.replace(/&[0-9a-fk-or]/g, '') : 
                'Untitled'
              } - {config.size} slots ({rows} rows)
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex justify-center">
        <div 
          className="inline-block p-4 bg-gray-800 rounded-lg shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
          }}
        >
          <div className="mb-3 text-center">
            <div className="text-white font-medium text-sm">
              {config.menu_title ? 
                config.menu_title.replace(/&[0-9a-fk-or]/g, '') : 
                'Untitled Menu'
              }
            </div>
          </div>

          <div 
            className="grid gap-1 p-2 bg-gray-700 rounded"
            style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}
          >
            {Array.from({ length: totalSlots }, (_, index) => renderSlot(index))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-400">
            <span>{Object.keys(config.items).length} configured items</span>
            <span>{previewItems.length} occupied slots</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 bg-gray-200 rounded-sm"></div>
              <span className="text-gray-600">Empty slot</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-400 bg-blue-50 rounded-sm"></div>
              <span className="text-gray-600">Slot with item (hover)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-400/20 to-blue-400/20 border-2 border-gray-400 rounded-sm"></div>
              <span className="text-gray-600">Enchanted item</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-400 bg-gray-200 rounded-sm relative">
                <div className="absolute bottom-0 right-0 bg-white text-black text-xs font-bold px-0.5 rounded-tl">2</div>
              </div>
              <span className="text-gray-600">Amount {'>'} 1</span>
            </div>
          </div>
        </div>
      </div>

      {onItemClick && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Click on any item in the menu to edit it directly.
            Hover over items to see more information.
          </p>
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="p-6">
          {previewContent}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {previewContent}
    </div>
  );
};
