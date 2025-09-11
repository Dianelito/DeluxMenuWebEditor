export const MINECRAFT_MATERIALS = [
  'STONE', 'GRANITE', 'POLISHED_GRANITE', 'DIORITE', 'POLISHED_DIORITE',
  'ANDESITE', 'POLISHED_ANDESITE', 'GRASS_BLOCK', 'DIRT', 'COARSE_DIRT',
  'PODZOL', 'COBBLESTONE', 'OAK_PLANKS', 'SPRUCE_PLANKS', 'BIRCH_PLANKS',
  'JUNGLE_PLANKS', 'ACACIA_PLANKS', 'CHERRY_PLANKS', 'DARK_OAK_PLANKS',
  'MANGROVE_PLANKS', 'BAMBOO_PLANKS', 'BEDROCK', 'WATER', 'LAVA',
  'SAND', 'GRAVEL', 'GOLD_ORE', 'DEEPSLATE_GOLD_ORE', 'IRON_ORE',
  'DEEPSLATE_IRON_ORE', 'COAL_ORE', 'DEEPSLATE_COAL_ORE', 'NETHER_GOLD_ORE',
  'OAK_LOG', 'SPRUCE_LOG', 'BIRCH_LOG', 'JUNGLE_LOG', 'ACACIA_LOG',
  'CHERRY_LOG', 'DARK_OAK_LOG', 'MANGROVE_LOG', 'BAMBOO_BLOCK',
  'DIAMOND', 'EMERALD', 'GOLD_INGOT', 'IRON_INGOT', 'NETHERITE_INGOT'
];

export const MINECRAFT_SLOTS = Array.from({ length: 54 }, (_, i) => i);

export const COMMON_ACTIONS = [
  '[player] help',
  '[console] give %player_name% diamond 1',
  '[message] &aThis is a message!',
  '[broadcast] &6%player_name% has opened the menu!',
  '[close]',
  '[refresh]',
  '[connect] server',
  '[sound] ENTITY_EXPERIENCE_ORB_PICKUP',
  '[takemoney] 100',
  '[givemoney] 100'
];

export const PLACEHOLDER_EXAMPLES = [
  '%player_name%',
  '%player_displayname%',
  '%player_balance%',
  '%player_level%',
  '%player_health%',
  '%server_online%',
  '%server_max_players%',
  '%player_ping%',
  '%player_world%',
  '%vault_prefix%'
];

export function getMinecraftColor(colorCode: string): string {
  const colors: Record<string, string> = {
    '&0': '#000000', '&1': '#0000AA', '&2': '#00AA00', '&3': '#00AAAA',
    '&4': '#AA0000', '&5': '#AA00AA', '&6': '#FFAA00', '&7': '#AAAAAA',
    '&8': '#555555', '&9': '#5555FF', '&a': '#55FF55', '&b': '#55FFFF',
    '&c': '#FF5555', '&d': '#FF55FF', '&e': '#FFFF55', '&f': '#FFFFFF'
  };
  
  return colors[colorCode] || '#FFFFFF';
}

export function parseMinecraftText(text: string): string {
  return text.replace(/&[0-9a-f]/g, (match) => {
    const color = getMinecraftColor(match);
    return `<span style="color: ${color}">`;
  });
}
