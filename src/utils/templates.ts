import { Template } from '../types/deluxemenu';

export const MENU_TEMPLATES: Template[] = [
  {
    id: 'shop',
    name: 'Basic Shop',
    description: 'Shop menu with categories and navigation',
    category: 'Shop',
    menu: {
      title: '&6&lShop',
      size: 45,
      items: [
        {
          id: 'armor',
          material: 'DIAMOND_CHESTPLATE',
          slot: 11,
          displayName: '&b&lArmor',
          lore: ['&7Buy the best', '&7armor here', '', '&eClick to see!'],
          actions: {
            left_click: ['[message] &aOpening armor shop...']
          }
        },
        {
          id: 'weapons',
          material: 'DIAMOND_SWORD',
          slot: 13,
          displayName: '&c&lWeapons',
          lore: ['&7The best weapons', '&7for combat', '', '&eClick to see!'],
          actions: {
            left_click: ['[message] &aOpening weapon shop...']
          }
        },
        {
          id: 'tools',
          material: 'DIAMOND_PICKAXE',
          slot: 15,
          displayName: '&a&lTools',
          lore: ['&7High quality tools', '&7for mining', '', '&eClick to see!'],
          actions: {
            left_click: ['[message] &aOpening tool shop...']
          }
        },
        {
          id: 'close',
          material: 'BARRIER',
          slot: 40,
          displayName: '&c&lClose',
          lore: ['&7Click to close'],
          actions: {
            left_click: ['[close]']
          }
        }
      ]
    }
  },
  {
    id: 'teleport',
    name: 'Teleport',
    description: 'Menu to teleport to different warps',
    category: 'Utility',
    menu: {
      title: '&9&lTeleport',
      size: 27,
      items: [
        {
          id: 'spawn',
          material: 'COMPASS',
          slot: 10,
          displayName: '&a&lSpawn',
          lore: ['&7Teleport to spawn', '', '&eClick to go!'],
          actions: {
            left_click: ['[player] spawn', '[message] &aTeleported to spawn!']
          }
        },
        {
          id: 'pvp',
          material: 'IRON_SWORD',
          slot: 12,
          displayName: '&c&lPvP Zone',
          lore: ['&7Combat zone', '&cBe careful!', '', '&eClick to go!'],
          actions: {
            left_click: ['[player] warp pvp', '[message] &cEntering PvP zone!']
          }
        },
        {
          id: 'market',
          material: 'EMERALD',
          slot: 14,
          displayName: '&6&lMarket',
          lore: ['&7Shopping center', '&7of the server', '', '&eClick to go!'],
          actions: {
            left_click: ['[player] warp market', '[message] &aWelcome to the market!']
          }
        },
        {
          id: 'back',
          material: 'ARROW',
          slot: 18,
          displayName: '&7&lBack',
          lore: ['&7Return to the previous menu'],
          actions: {
            left_click: ['[close]']
          }
        }
      ]
    }
  },
  {
    id: 'admin',
    name: 'Admin Panel',
    description: 'Admin panel with basic tools',
    category: 'Admin',
    menu: {
      title: '&4&lAdmin Panel',
      size: 36,
      requirements: {
        permission: 'admin.panel'
      },
      items: [
        {
          id: 'players',
          material: 'PLAYER_HEAD',
          slot: 10,
          displayName: '&b&lOnline Players',
          lore: ['&7Players: &f%server_online%', '&7Max: &f%server_max_players%'],
          actions: {
            left_click: ['[player] list']
          }
        },
        {
          id: 'weather',
          material: 'SUNFLOWER',
          slot: 12,
          displayName: '&e&lWeather',
          lore: ['&7Control the weather', '&7of the server'],
          actions: {
            left_click: ['[player] weather clear', '[message] &aWeather cleared!']
          }
        },
        {
          id: 'time',
          material: 'CLOCK',
          slot: 14,
          displayName: '&6&lTime',
          lore: ['&7Control the time', '&7of the server'],
          actions: {
            left_click: ['[player] time set day', '[message] &aTime changed to day!']
          }
        }
      ]
    }
  }
];

export function getTemplatesByCategory(): Record<string, Template[]> {
  return MENU_TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);
}
