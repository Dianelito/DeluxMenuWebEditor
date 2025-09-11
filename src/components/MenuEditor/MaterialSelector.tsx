import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { getTexturesByCategory, searchTextures, getCategories, MINECRAFT_TEXTURES } from '../../utils/minecraftTextures';

interface MaterialSelectorProps {
  onSelect: (material: string) => void;
  onClose: () => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  onSelect,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => getCategories(), []);

  const filteredTextures = useMemo(() => {
    let textures = Object.values(MINECRAFT_TEXTURES);

    if (selectedCategory !== 'all') {
      textures = textures.filter(texture => texture.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      textures = searchTextures(searchQuery);
      if (selectedCategory !== 'all') {
        textures = textures.filter(texture => texture.category === selectedCategory);
      }
    }

    return textures.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [searchQuery, selectedCategory]);

  const categoryLabels: { [key: string]: string } = {
    'all': 'All',
    'building_blocks': 'Building Blocks',
    'natural': 'Natural',
    'tools': 'Tools',
    'combat': 'Combat',
    'food': 'Food',
    'misc': 'Miscellaneous',
    'decorations': 'Decorations',
    'redstone': 'Redstone',
    'transportation': 'Transportation',
    'brewing': 'Brewing'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-3/4 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Select Material
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {categoryLabels[category] || category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {filteredTextures.length > 0 ? (
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
              {filteredTextures.map((texture) => (
                <div
                  key={texture.name}
                  onClick={() => onSelect(texture.name)}
                  className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors group"
                  title={`${texture.displayName} (${texture.name})`}
                >
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <img
                      src={texture.textureUrl}
                      alt={texture.displayName}
                      className="w-full h-full pixelated"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.parentElement?.querySelector('.placeholder');
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      className="placeholder w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500 hidden"
                    >
                      ?
                    </div>
                  </div>
                  <div className="text-xs text-center text-gray-600 group-hover:text-blue-600 leading-tight">
                    <div className="font-medium truncate w-full" title={texture.displayName}>
                      {texture.displayName}
                    </div>
                    <div className="text-gray-400 text-xs font-mono truncate w-full" title={texture.name}>
                      {texture.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Search className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg">No materials found</p>
              <p className="text-sm">Try with other search terms</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredTextures.length} materials found
            </span>
            <span>
              Minecraft 1.21.8 - Vanilla Textures
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
