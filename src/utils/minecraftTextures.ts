export interface MinecraftTexture {
  name: string;
  displayName: string;
  category: string;
  textureUrl: string;
  stackable: boolean;
  maxStackSize: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

const TEXTURE_BASE_URL = 'https://minecraft.wiki/images/';

export const MINECRAFT_TEXTURES: { [key: string]: MinecraftTexture } = {
  'STONE': {
    name: 'STONE',
    displayName: 'Stone',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}9/9d/Stone_JE5_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GRANITE': {
    name: 'GRANITE',
    displayName: 'Granite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}b/b7/Granite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POLISHED_GRANITE': {
    name: 'POLISHED_GRANITE',
    displayName: 'Polished Granite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}4/4c/Polished_Granite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DIORITE': {
    name: 'DIORITE',
    displayName: 'Diorite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}5/5c/Diorite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POLISHED_DIORITE': {
    name: 'POLISHED_DIORITE',
    displayName: 'Polished Diorite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}6/67/Polished_Diorite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ANDESITE': {
    name: 'ANDESITE',
    displayName: 'Andesite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}1/1c/Andesite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POLISHED_ANDESITE': {
    name: 'POLISHED_ANDESITE',
    displayName: 'Polished Andesite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}4/44/Polished_Andesite_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DEEPSLATE': {
    name: 'DEEPSLATE',
    displayName: 'Deepslate',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}8/8b/Deepslate_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COBBLED_DEEPSLATE': {
    name: 'COBBLED_DEEPSLATE',
    displayName: 'Cobbled Deepslate',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}c/cb/Cobbled_Deepslate_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POLISHED_DEEPSLATE': {
    name: 'POLISHED_DEEPSLATE',
    displayName: 'Polished Deepslate',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}3/31/Polished_Deepslate_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CALCITE': {
    name: 'CALCITE',
    displayName: 'Calcite',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}c/c0/Calcite_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'TUFF': {
    name: 'TUFF',
    displayName: 'Tuff',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/f3/Tuff_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DRIPSTONE_BLOCK': {
    name: 'DRIPSTONE_BLOCK',
    displayName: 'Dripstone Block',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}a/a8/Dripstone_Block_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GRASS_BLOCK': {
    name: 'GRASS_BLOCK',
    displayName: 'Grass Block',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}f/fb/Grass_Block_JE7_BE6.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DIRT': {
    name: 'DIRT',
    displayName: 'Dirt',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}0/0a/Dirt_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COARSE_DIRT': {
    name: 'COARSE_DIRT',
    displayName: 'Coarse Dirt',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}c/c8/Coarse_Dirt_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PODZOL': {
    name: 'PODZOL',
    displayName: 'Podzol',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}8/80/Podzol_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ROOTED_DIRT': {
    name: 'ROOTED_DIRT',
    displayName: 'Rooted Dirt',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}d/d5/Rooted_Dirt_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MUD': {
    name: 'MUD',
    displayName: 'Mud',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}7/7c/Mud_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CRIMSON_NYLIUM': {
    name: 'CRIMSON_NYLIUM',
    displayName: 'Crimson Nylium',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Crimson_Nylium_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'WARPED_NYLIUM': {
    name: 'WARPED_NYLIUM',
    displayName: 'Warped Nylium',
    category: 'natural',
    textureUrl: `${TEXTURE_BASE_URL}d/d6/Warped_Nylium_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COBBLESTONE': {
    name: 'COBBLESTONE',
    displayName: 'Cobblestone',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}b/b7/Cobblestone_JE5_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'OAK_PLANKS': {
    name: 'OAK_PLANKS',
    displayName: 'Oak Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}c/c8/Oak_Planks_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SPRUCE_PLANKS': {
    name: 'SPRUCE_PLANKS',
    displayName: 'Spruce Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}7/72/Spruce_Planks_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BIRCH_PLANKS': {
    name: 'BIRCH_PLANKS',
    displayName: 'Birch Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}d/da/Birch_Planks_JE6_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'JUNGLE_PLANKS': {
    name: 'JUNGLE_PLANKS',
    displayName: 'Jungle Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}7/71/Jungle_Planks_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ACACIA_PLANKS': {
    name: 'ACACIA_PLANKS',
    displayName: 'Acacia Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Acacia_Planks_JE6_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CHERRY_PLANKS': {
    name: 'CHERRY_PLANKS',
    displayName: 'Cherry Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}9/92/Cherry_Planks_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DARK_OAK_PLANKS': {
    name: 'DARK_OAK_PLANKS',
    displayName: 'Dark Oak Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}3/3e/Dark_Oak_Planks_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MANGROVE_PLANKS': {
    name: 'MANGROVE_PLANKS',
    displayName: 'Mangrove Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}c/c7/Mangrove_Planks_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BAMBOO_PLANKS': {
    name: 'BAMBOO_PLANKS',
    displayName: 'Bamboo Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}c/cf/Bamboo_Planks_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CRIMSON_PLANKS': {
    name: 'CRIMSON_PLANKS',
    displayName: 'Crimson Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}3/3e/Crimson_Planks_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'WARPED_PLANKS': {
    name: 'WARPED_PLANKS',
    displayName: 'Warped Planks',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}0/0e/Warped_Planks_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  
  'WOODEN_SWORD': {
    name: 'WOODEN_SWORD',
    displayName: 'Wooden Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}d/d5/Wooden_Sword_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'WOODEN_SHOVEL': {
    name: 'WOODEN_SHOVEL',
    displayName: 'Wooden Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Wooden_Shovel_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'WOODEN_PICKAXE': {
    name: 'WOODEN_PICKAXE',
    displayName: 'Wooden Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Wooden_Pickaxe_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'WOODEN_AXE': {
    name: 'WOODEN_AXE',
    displayName: 'Wooden Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}3/3f/Wooden_Axe_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'WOODEN_HOE': {
    name: 'WOODEN_HOE',
    displayName: 'Wooden Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d0/Wooden_Hoe_JE4_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'STONE_SWORD': {
    name: 'STONE_SWORD',
    displayName: 'Stone Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}c/c4/Stone_Sword_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'STONE_SHOVEL': {
    name: 'STONE_SHOVEL',
    displayName: 'Stone Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}c/c3/Stone_Shovel_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'STONE_PICKAXE': {
    name: 'STONE_PICKAXE',
    displayName: 'Stone Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}c/c4/Stone_Pickaxe_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'STONE_AXE': {
    name: 'STONE_AXE',
    displayName: 'Stone Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d1/Stone_Axe_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'STONE_HOE': {
    name: 'STONE_HOE',
    displayName: 'Stone Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}1/14/Stone_Hoe_JE3_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'IRON_SWORD': {
    name: 'IRON_SWORD',
    displayName: 'Iron Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}8/8e/Iron_Sword_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'IRON_SHOVEL': {
    name: 'IRON_SHOVEL',
    displayName: 'Iron Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}4/42/Iron_Shovel_JE3_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'IRON_PICKAXE': {
    name: 'IRON_PICKAXE',
    displayName: 'Iron Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d1/Iron_Pickaxe_JE3_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'IRON_AXE': {
    name: 'IRON_AXE',
    displayName: 'Iron Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}d/d4/Iron_Axe_JE3_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'IRON_HOE': {
    name: 'IRON_HOE',
    displayName: 'Iron Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}1/1b/Iron_Hoe_JE4_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'DIAMOND_SWORD': {
    name: 'DIAMOND_SWORD',
    displayName: 'Diamond Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}4/44/Diamond_Sword_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'DIAMOND_SHOVEL': {
    name: 'DIAMOND_SHOVEL',
    displayName: 'Diamond Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}c/c4/Diamond_Shovel_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'DIAMOND_PICKAXE': {
    name: 'DIAMOND_PICKAXE',
    displayName: 'Diamond Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}9/9d/Diamond_Pickaxe_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'DIAMOND_AXE': {
    name: 'DIAMOND_AXE',
    displayName: 'Diamond Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}f/fe/Diamond_Axe_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'DIAMOND_HOE': {
    name: 'DIAMOND_HOE',
    displayName: 'Diamond Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}6/67/Diamond_Hoe_JE4_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'NETHERITE_SWORD': {
    name: 'NETHERITE_SWORD',
    displayName: 'Netherite Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}4/44/Netherite_Sword_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'NETHERITE_SHOVEL': {
    name: 'NETHERITE_SHOVEL',
    displayName: 'Netherite Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}c/c4/Netherite_Shovel_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'NETHERITE_PICKAXE': {
    name: 'NETHERITE_PICKAXE',
    displayName: 'Netherite Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}9/9d/Netherite_Pickaxe_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'NETHERITE_AXE': {
    name: 'NETHERITE_AXE',
    displayName: 'Netherite Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}f/fe/Netherite_Axe_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'NETHERITE_HOE': {
    name: 'NETHERITE_HOE',
    displayName: 'Netherite Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}6/67/Netherite_Hoe_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'GOLDEN_SWORD': {
    name: 'GOLDEN_SWORD',
    displayName: 'Golden Sword',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}7/7e/Golden_Sword_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'GOLDEN_SHOVEL': {
    name: 'GOLDEN_SHOVEL',
    displayName: 'Golden Shovel',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}6/69/Golden_Shovel_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'GOLDEN_PICKAXE': {
    name: 'GOLDEN_PICKAXE',
    displayName: 'Golden Pickaxe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}a/a8/Golden_Pickaxe_JE3_BE3.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'GOLDEN_AXE': {
    name: 'GOLDEN_AXE',
    displayName: 'Golden Axe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}8/8e/Golden_Axe_JE4_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'GOLDEN_HOE': {
    name: 'GOLDEN_HOE',
    displayName: 'Golden Hoe',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}f/fa/Golden_Hoe_JE4_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  
  'STICK': {
    name: 'STICK',
    displayName: 'Stick',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}3/3e/Stick_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BOWL': {
    name: 'BOWL',
    displayName: 'Bowl',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}e/e5/Bowl_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'STRING': {
    name: 'STRING',
    displayName: 'String',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/ca/String_JE4_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'FEATHER': {
    name: 'FEATHER',
    displayName: 'Feather',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Feather_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GUNPOWDER': {
    name: 'GUNPOWDER',
    displayName: 'Gunpowder',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}8/81/Gunpowder_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'FLINT': {
    name: 'FLINT',
    displayName: 'Flint',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}e/e4/Flint_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'LEATHER': {
    name: 'LEATHER',
    displayName: 'Leather',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}8/86/Leather_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BRICK': {
    name: 'BRICK',
    displayName: 'Brick',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Brick_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CLAY_BALL': {
    name: 'CLAY_BALL',
    displayName: 'Clay Ball',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/fc/Clay_Ball_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PAPER': {
    name: 'PAPER',
    displayName: 'Paper',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}1/1c/Paper_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BOOK': {
    name: 'BOOK',
    displayName: 'Book',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}7/79/Book_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SLIME_BALL': {
    name: 'SLIME_BALL',
    displayName: 'Slimeball',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}6/61/Slimeball_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'EGG': {
    name: 'EGG',
    displayName: 'Egg',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}d/d7/Egg_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 16,
    rarity: 'common'
  },
  'COMPASS': {
    name: 'COMPASS',
    displayName: 'Compass',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}c/c6/Compass_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'CLOCK': {
    name: 'CLOCK',
    displayName: 'Clock',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}7/7c/Clock_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'GLOWSTONE_DUST': {
    name: 'GLOWSTONE_DUST',
    displayName: 'Glowstone Dust',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Glowstone_Dust_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'BONE': {
    name: 'BONE',
    displayName: 'Bone',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Bone_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SUGAR': {
    name: 'SUGAR',
    displayName: 'Sugar',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}e/en/Sugar_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SHEARS': {
    name: 'SHEARS',
    displayName: 'Shears',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}1/14/Shears_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'GOLD_NUGGET': {
    name: 'GOLD_NUGGET',
    displayName: 'Gold Nugget',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Gold_Nugget_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'GLASS_BOTTLE': {
    name: 'GLASS_BOTTLE',
    displayName: 'Glass Bottle',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}1/12/Glass_Bottle_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SPIDER_EYE': {
    name: 'SPIDER_EYE',
    displayName: 'Spider Eye',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}1/10/Spider_Eye_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'FERMENTED_SPIDER_EYE': {
    name: 'FERMENTED_SPIDER_EYE',
    displayName: 'Fermented Spider Eye',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}1/18/Fermented_Spider_Eye_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'BLAZE_POWDER': {
    name: 'BLAZE_POWDER',
    displayName: 'Blaze Powder',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}d/d5/Blaze_Powder_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'MAGMA_CREAM': {
    name: 'MAGMA_CREAM',
    displayName: 'Magma Cream',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}d/d7/Magma_Cream_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'ENDER_EYE': {
    name: 'ENDER_EYE',
    displayName: 'Eye of Ender',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}6/6a/Eye_of_Ender_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'GLISTERING_MELON_SLICE': {
    name: 'GLISTERING_MELON_SLICE',
    displayName: 'Glistering Melon Slice',
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Glistering_Melon_Slice_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'EXPERIENCE_BOTTLE': {
    name: 'EXPERIENCE_BOTTLE',
    displayName: 'Bottle o\' Enchanting',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/ce/Bottle_o%27_Enchanting_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'FIRE_CHARGE': {
    name: 'FIRE_CHARGE',
    displayName: 'Fire Charge',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}3/3a/Fire_Charge_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'WRITABLE_BOOK': {
    name: 'WRITABLE_BOOK',
    displayName: 'Book and Quill',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}a/ac/Writable_Book_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'WRITTEN_BOOK': {
    name: 'WRITTEN_BOOK',
    displayName: 'Written Book',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Written_Book_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 16,
    rarity: 'uncommon'
  },
  'EMERALD': {
    name: 'EMERALD',
    displayName: 'Emerald',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}1/16/Emerald_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'ITEM_FRAME': {
    name: 'ITEM_FRAME',
    displayName: 'Item Frame',
    category: 'decorations',
    textureUrl: `${TEXTURE_BASE_URL}a/a5/Item_Frame_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'FLOWER_POT': {
    name: 'FLOWER_POT',
    displayName: 'Flower Pot',
    category: 'decorations',
    textureUrl: `${TEXTURE_BASE_URL}f/fc/Flower_Pot_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MAP': {
    name: 'MAP',
    displayName: 'Empty Map',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/cd/Empty_Map_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'GOLDEN_CARROT': {
    name: 'GOLDEN_CARROT',
    displayName: 'Golden Carrot',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Golden_Carrot_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'CARROT_ON_A_STICK': {
    name: 'CARROT_ON_A_STICK',
    displayName: 'Carrot on a Stick',
    category: 'transportation',
    textureUrl: `${TEXTURE_BASE_URL}c/c9/Carrot_on_a_Stick_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'NETHER_STAR': {
    name: 'NETHER_STAR',
    displayName: 'Nether Star',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}4/45/Nether_Star_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'epic'
  },
  'FIREWORK_ROCKET': {
    name: 'FIREWORK_ROCKET',
    displayName: 'Firework Rocket',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Firework_Rocket_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'FIREWORK_STAR': {
    name: 'FIREWORK_STAR',
    displayName: 'Firework Star',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}d/d5/Firework_Star_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'ENCHANTED_BOOK': {
    name: 'ENCHANTED_BOOK',
    displayName: 'Enchanted Book',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}6/6a/Enchanted_Book_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'rare'
  },
  'NETHER_BRICK': {
    name: 'NETHER_BRICK',
    displayName: 'Nether Brick',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}4/4a/Nether_Brick_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'QUARTZ': {
    name: 'QUARTZ',
    displayName: 'Nether Quartz',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/cf/Nether_Quartz_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'PRISMARINE_SHARD': {
    name: 'PRISMARINE_SHARD',
    displayName: 'Prismarine Shard',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}9/93/Prismarine_Shard_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'PRISMARINE_CRYSTALS': {
    name: 'PRISMARINE_CRYSTALS',
    displayName: 'Prismarine Crystals',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}3/31/Prismarine_Crystals_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'RABBIT_FOOT': {
    name: 'RABBIT_FOOT',
    displayName: "Rabbit's Foot",
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}4/49/Rabbit%27s_Foot_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'RABBIT_HIDE': {
    name: 'RABBIT_HIDE',
    displayName: 'Rabbit Hide',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}5/59/Rabbit_Hide_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ARMOR_STAND': {
    name: 'ARMOR_STAND',
    displayName: 'Armor Stand',
    category: 'decorations',
    textureUrl: `${TEXTURE_BASE_URL}f/f0/Armor_Stand_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 16,
    rarity: 'uncommon'
  },
  'LEAD': {
    name: 'LEAD',
    displayName: 'Lead',
    category: 'tools',
    textureUrl: `${TEXTURE_BASE_URL}3/3b/Lead_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'NAME_TAG': {
    name: 'NAME_TAG',
    displayName: 'Name Tag',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/ca/Name_Tag_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'END_CRYSTAL': {
    name: 'END_CRYSTAL',
    displayName: 'End Crystal',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}6/6e/End_Crystal_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'CHORUS_FRUIT': {
    name: 'CHORUS_FRUIT',
    displayName: 'Chorus Fruit',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/df/Chorus_Fruit_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'POPPED_CHORUS_FRUIT': {
    name: 'POPPED_CHORUS_FRUIT',
    displayName: 'Popped Chorus Fruit',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}c/c4/Popped_Chorus_Fruit_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'DRAGON_BREATH': {
    name: 'DRAGON_BREATH',
    displayName: "Dragon's Breath",
    category: 'brewing',
    textureUrl: `${TEXTURE_BASE_URL}0/0c/Dragon%27s_Breath_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'epic'
  },
  'ELYTRA': {
    name: 'ELYTRA',
    displayName: 'Elytra',
    category: 'transportation',
    textureUrl: `${TEXTURE_BASE_URL}b/b2/Elytra_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'TOTEM_OF_UNDYING': {
    name: 'TOTEM_OF_UNDYING',
    displayName: 'Totem of Undying',
    category: 'combat',
    textureUrl: `${TEXTURE_BASE_URL}8/84/Totem_of_Undying_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'epic'
  },
  'SHULKER_SHELL': {
    name: 'SHULKER_SHELL',
    displayName: 'Shulker Shell',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}8/8b/Shulker_Shell_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'IRON_NUGGET': {
    name: 'IRON_NUGGET',
    displayName: 'Iron Nugget',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Iron_Nugget_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  
  'COAL': {
    name: 'COAL',
    displayName: 'Coal',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}a/a6/Coal_JE4_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CHARCOAL': {
    name: 'CHARCOAL',
    displayName: 'Charcoal',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/fc/Charcoal_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'DIAMOND': {
    name: 'DIAMOND',
    displayName: 'Diamond',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}d/d1/Diamond_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'IRON_INGOT': {
    name: 'IRON_INGOT',
    displayName: 'Iron Ingot',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/fc/Iron_Ingot_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GOLD_INGOT': {
    name: 'GOLD_INGOT',
    displayName: 'Gold Ingot',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Gold_Ingot_JE4_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'NETHERITE_INGOT': {
    name: 'NETHERITE_INGOT',
    displayName: 'Netherite Ingot',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}5/50/Netherite_Ingot_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'epic'
  },
  'NETHERITE_SCRAP': {
    name: 'NETHERITE_SCRAP',
    displayName: 'Netherite Scrap',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}1/15/Netherite_Scrap_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'COPPER_INGOT': {
    name: 'COPPER_INGOT',
    displayName: 'Copper Ingot',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Copper_Ingot_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'RAW_IRON': {
    name: 'RAW_IRON',
    displayName: 'Raw Iron',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}1/15/Raw_Iron_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'RAW_GOLD': {
    name: 'RAW_GOLD',
    displayName: 'Raw Gold',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Raw_Gold_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'RAW_COPPER': {
    name: 'RAW_COPPER',
    displayName: 'Raw Copper',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}f/f6/Raw_Copper_JE2_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'LAPIS_LAZULI': {
    name: 'LAPIS_LAZULI',
    displayName: 'Lapis Lazuli',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}1/14/Lapis_Lazuli_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'REDSTONE': {
    name: 'REDSTONE',
    displayName: 'Redstone Dust',
    category: 'redstone',
    textureUrl: `${TEXTURE_BASE_URL}d/d0/Redstone_Dust_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  
  'APPLE': {
    name: 'APPLE',
    displayName: 'Apple',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}5/59/Apple_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GOLDEN_APPLE': {
    name: 'GOLDEN_APPLE',
    displayName: 'Golden Apple',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Golden_Apple_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'rare'
  },
  'ENCHANTED_GOLDEN_APPLE': {
    name: 'ENCHANTED_GOLDEN_APPLE',
    displayName: 'Enchanted Golden Apple',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}2/2d/Enchanted_Golden_Apple_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'epic'
  },
  'BREAD': {
    name: 'BREAD',
    displayName: 'Bread',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f4/Bread_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'WHEAT': {
    name: 'WHEAT',
    displayName: 'Wheat',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}8/89/Wheat_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'WHEAT_SEEDS': {
    name: 'WHEAT_SEEDS',
    displayName: 'Wheat Seeds',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}9/94/Wheat_Seeds_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PORKCHOP': {
    name: 'PORKCHOP',
    displayName: 'Raw Porkchop',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Raw_Porkchop_JE4_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_PORKCHOP': {
    name: 'COOKED_PORKCHOP',
    displayName: 'Cooked Porkchop',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Cooked_Porkchop_JE4_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COD': {
    name: 'COD',
    displayName: 'Raw Cod',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f3/Raw_Cod_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_COD': {
    name: 'COOKED_COD',
    displayName: 'Cooked Cod',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/77/Cooked_Cod_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SALMON': {
    name: 'SALMON',
    displayName: 'Raw Salmon',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f3/Raw_Salmon_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_SALMON': {
    name: 'COOKED_SALMON',
    displayName: 'Cooked Salmon',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/77/Cooked_Salmon_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'TROPICAL_FISH': {
    name: 'TROPICAL_FISH',
    displayName: 'Tropical Fish',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f3/Tropical_Fish_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'PUFFERFISH': {
    name: 'PUFFERFISH',
    displayName: 'Pufferfish',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f3/Pufferfish_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'COOKIE': {
    name: 'COOKIE',
    displayName: 'Cookie',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f5/Cookie_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MELON_SLICE': {
    name: 'MELON_SLICE',
    displayName: 'Melon Slice',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Melon_Slice_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PUMPKIN_SEEDS': {
    name: 'PUMPKIN_SEEDS',
    displayName: 'Pumpkin Seeds',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}9/94/Pumpkin_Seeds_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MELON_SEEDS': {
    name: 'MELON_SEEDS',
    displayName: 'Melon Seeds',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}9/94/Melon_Seeds_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BEEF': {
    name: 'BEEF',
    displayName: 'Raw Beef',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Raw_Beef_JE3_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_BEEF': {
    name: 'COOKED_BEEF',
    displayName: 'Steak',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Steak_JE4_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CHICKEN': {
    name: 'CHICKEN',
    displayName: 'Raw Chicken',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Raw_Chicken_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_CHICKEN': {
    name: 'COOKED_CHICKEN',
    displayName: 'Cooked Chicken',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Cooked_Chicken_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ROTTEN_FLESH': {
    name: 'ROTTEN_FLESH',
    displayName: 'Rotten Flesh',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8b/Rotten_Flesh_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CARROT': {
    name: 'CARROT',
    displayName: 'Carrot',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8c/Carrot_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POTATO': {
    name: 'POTATO',
    displayName: 'Potato',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Potato_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BAKED_POTATO': {
    name: 'BAKED_POTATO',
    displayName: 'Baked Potato',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/77/Baked_Potato_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'POISONOUS_POTATO': {
    name: 'POISONOUS_POTATO',
    displayName: 'Poisonous Potato',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}8/8b/Poisonous_Potato_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'PUMPKIN_PIE': {
    name: 'PUMPKIN_PIE',
    displayName: 'Pumpkin Pie',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f5/Pumpkin_Pie_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'RABBIT': {
    name: 'RABBIT',
    displayName: 'Raw Rabbit',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Raw_Rabbit_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_RABBIT': {
    name: 'COOKED_RABBIT',
    displayName: 'Cooked Rabbit',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Cooked_Rabbit_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'RABBIT_STEW': {
    name: 'RABBIT_STEW',
    displayName: 'Rabbit Stew',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f4/Rabbit_Stew_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'MUTTON': {
    name: 'MUTTON',
    displayName: 'Raw Mutton',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}d/d2/Raw_Mutton_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'COOKED_MUTTON': {
    name: 'COOKED_MUTTON',
    displayName: 'Cooked Mutton',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}7/74/Cooked_Mutton_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BEETROOT': {
    name: 'BEETROOT',
    displayName: 'Beetroot',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Beetroot_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BEETROOT_SEEDS': {
    name: 'BEETROOT_SEEDS',
    displayName: 'Beetroot Seeds',
    category: 'misc',
    textureUrl: `${TEXTURE_BASE_URL}9/94/Beetroot_Seeds_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BEETROOT_SOUP': {
    name: 'BEETROOT_SOUP',
    displayName: 'Beetroot Soup',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f4/Beetroot_Soup_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'MUSHROOM_STEW': {
    name: 'MUSHROOM_STEW',
    displayName: 'Mushroom Stew',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f4/Mushroom_Stew_JE2_BE2.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'common'
  },
  'SUSPICIOUS_STEW': {
    name: 'SUSPICIOUS_STEW',
    displayName: 'Suspicious Stew',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}f/f4/Suspicious_Stew_JE1_BE1.png`,
    stackable: false,
    maxStackSize: 1,
    rarity: 'uncommon'
  },
  'DRIED_KELP': {
    name: 'DRIED_KELP',
    displayName: 'Dried Kelp',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Dried_Kelp_JE1_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'SWEET_BERRIES': {
    name: 'SWEET_BERRIES',
    displayName: 'Sweet Berries',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Sweet_Berries_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GLOW_BERRIES': {
    name: 'GLOW_BERRIES',
    displayName: 'Glow Berries',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}c/c2/Glow_Berries_JE2_BE2.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'uncommon'
  },
  'HONEY_BOTTLE': {
    name: 'HONEY_BOTTLE',
    displayName: 'Honey Bottle',
    category: 'food',
    textureUrl: `${TEXTURE_BASE_URL}1/12/Honey_Bottle_JE1_BE1.png`,
    stackable: true,
    maxStackSize: 16,
    rarity: 'uncommon'
  },
  
  'WHITE_WOOL': {
    name: 'WHITE_WOOL',
    displayName: 'White Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/White_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'ORANGE_WOOL': {
    name: 'ORANGE_WOOL',
    displayName: 'Orange Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Orange_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'MAGENTA_WOOL': {
    name: 'MAGENTA_WOOL',
    displayName: 'Magenta Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Magenta_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'LIGHT_BLUE_WOOL': {
    name: 'LIGHT_BLUE_WOOL',
    displayName: 'Light Blue Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Light_Blue_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'YELLOW_WOOL': {
    name: 'YELLOW_WOOL',
    displayName: 'Yellow Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Yellow_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'LIME_WOOL': {
    name: 'LIME_WOOL',
    displayName: 'Lime Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Lime_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PINK_WOOL': {
    name: 'PINK_WOOL',
    displayName: 'Pink Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Pink_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GRAY_WOOL': {
    name: 'GRAY_WOOL',
    displayName: 'Gray Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Gray_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'LIGHT_GRAY_WOOL': {
    name: 'LIGHT_GRAY_WOOL',
    displayName: 'Light Gray Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Light_Gray_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'CYAN_WOOL': {
    name: 'CYAN_WOOL',
    displayName: 'Cyan Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Cyan_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'PURPLE_WOOL': {
    name: 'PURPLE_WOOL',
    displayName: 'Purple Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Purple_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BLUE_WOOL': {
    name: 'BLUE_WOOL',
    displayName: 'Blue Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Blue_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BROWN_WOOL': {
    name: 'BROWN_WOOL',
    displayName: 'Brown Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Brown_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'GREEN_WOOL': {
    name: 'GREEN_WOOL',
    displayName: 'Green Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Green_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'RED_WOOL': {
    name: 'RED_WOOL',
    displayName: 'Red Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Red_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  },
  'BLACK_WOOL': {
    name: 'BLACK_WOOL',
    displayName: 'Black Wool',
    category: 'building_blocks',
    textureUrl: `${TEXTURE_BASE_URL}f/ff/Black_Wool_JE3_BE3.png`,
    stackable: true,
    maxStackSize: 64,
    rarity: 'common'
  }
};

export function getTextureInfo(material: string): MinecraftTexture | null {
  return MINECRAFT_TEXTURES[material.toUpperCase()] || null;
}

export function getTexturesByCategory(category: string): MinecraftTexture[] {
  return Object.values(MINECRAFT_TEXTURES).filter(texture => texture.category === category);
}

export function searchTextures(query: string): MinecraftTexture[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(MINECRAFT_TEXTURES).filter(texture => 
    texture.name.toLowerCase().includes(lowerQuery) ||
    texture.displayName.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  const categories = new Set(Object.values(MINECRAFT_TEXTURES).map(texture => texture.category));
  return Array.from(categories).sort();
}

export function isValidMaterial(material: string): boolean {
  return material.toUpperCase() in MINECRAFT_TEXTURES;
}

export function getFallbackTextureUrl(material: string): string {
  return `${TEXTURE_BASE_URL}9/9d/Stone_JE5_BE3.png`;
}

export function getOptimizedTextureUrl(material: string, size: number = 64): string {
  const texture = getTextureInfo(material);
  if (!texture) {
    return getFallbackTextureUrl(material);
  }
  
  return texture.textureUrl;
}
