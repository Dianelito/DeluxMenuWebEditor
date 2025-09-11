import { CommandPanelsConfig, CommandPanel, CommandPanelItem, DeluxeMenuConfig, DeluxeMenuItem, MATERIAL_MAPPING } from '../types/commandpanels';
import { parseYAML, stringifyYAML } from './yaml';

export class CommandPanelsConverter {
  
  static convertFromYAML(yamlContent: string): string {
    try {
      const commandPanelsConfig = parseYAML(yamlContent) as CommandPanelsConfig;
      const deluxeMenus: { [key: string]: DeluxeMenuConfig } = {};
      
      Object.entries(commandPanelsConfig.panels || {}).forEach(([panelName, panel]) => {
        deluxeMenus[panelName] = this.convertPanel(panelName, panel);
      });
      
      if (Object.keys(deluxeMenus).length === 1) {
        return stringifyYAML(Object.values(deluxeMenus)[0]);
      }
      
      return stringifyYAML(deluxeMenus);
    } catch (error) {
      console.error('Error converting CommandPanels config:', error);
      throw new Error(`Error converting CommandPanels configuration: ${error.message}`);
    }
  }
  
  private static convertPanel(panelName: string, panel: CommandPanel): DeluxeMenuConfig {
    const deluxeMenu: DeluxeMenuConfig = {
      menu_title: this.convertTitle(panel.title),
      size: panel.rows * 9,
      items: {}
    };
    
    if (panel.commands && panel.commands.length > 0) {
      if (panel.commands.length === 1) {
        deluxeMenu.open_command = panel.commands[0];
      } else {
        deluxeMenu.open_command = panel.commands;
      }
    }
    
    if (panel.perm) {
      deluxeMenu.open_requirement = {
        requirements: {
          permission: {
            type: 'has permission',
            permission: panel.perm,
            deny_commands: ['[message] &cYou do not have permission to open this menu!']
          }
        }
      };
    }
    
    if (panel.item) {
      Object.entries(panel.item).forEach(([itemName, item]) => {
        deluxeMenu.items[itemName] = this.convertItem(item);
      });
    }
    
    if (panel['empty-slot-item']) {
      deluxeMenu.items['filler_item'] = this.createFillerItem(panel);
    }
    
    return deluxeMenu;
  }
  
  private static convertItem(item: CommandPanelItem): DeluxeMenuItem {
    const deluxeItem: DeluxeMenuItem = {
      material: this.convertMaterial(item.id, item.damage),
      display_name: this.convertTitle(item.name)
    };
    
    if (Array.isArray(item.slot)) {
      deluxeItem.slots = item.slot;
    } else {
      deluxeItem.slot = item.slot;
    }
    
    if (item.lore && item.lore.length > 0) {
      deluxeItem.lore = item.lore.map(line => this.convertTitle(line));
    }
    
    if (item.commands && item.commands.length > 0) {
      const convertedCommands = item.commands.map(cmd => this.convertCommand(cmd));
      deluxeItem.left_click_commands = convertedCommands;
      deluxeItem.right_click_commands = convertedCommands;
      
      if (item['close-on-click']) {
        deluxeItem.left_click_commands.push('[close]');
        deluxeItem.right_click_commands.push('[close]');
      }
    }
    
    if (item.permission) {
      const requirement = {
        requirements: {
          permission: {
            type: 'has permission',
            permission: item.permission,
            deny_commands: ['[message] &cYou do not have permission to use this item!']
          }
        }
      };
      
      deluxeItem.view_requirement = requirement;
    }
    
    if (item['update-item']) {
      deluxeItem.update = true;
    }
    
    if (item.enchanted) {
      deluxeItem.enchantments = ['UNBREAKING;1'];
      deluxeItem.hide_enchantments = true;
    }
    
    if (item.damage !== undefined && item.damage > 0) {
      deluxeItem.data = item.damage;
    }
    
    return deluxeItem;
  }
  
  private static convertMaterial(id: number, damage?: number): string {
    if (damage !== undefined && damage > 0) {
      if (id === 35) {
        const woolColors = [
          'WHITE_WOOL', 'ORANGE_WOOL', 'MAGENTA_WOOL', 'LIGHT_BLUE_WOOL',
          'YELLOW_WOOL', 'LIME_WOOL', 'PINK_WOOL', 'GRAY_WOOL',
          'LIGHT_GRAY_WOOL', 'CYAN_WOOL', 'PURPLE_WOOL', 'BLUE_WOOL',
          'BROWN_WOOL', 'GREEN_WOOL', 'RED_WOOL', 'BLACK_WOOL'
        ];
        return woolColors[damage] || 'WHITE_WOOL';
      }
      
      if (id === 95) {
        const glassColors = [
          'WHITE_STAINED_GLASS', 'ORANGE_STAINED_GLASS', 'MAGENTA_STAINED_GLASS', 'LIGHT_BLUE_STAINED_GLASS',
          'YELLOW_STAINED_GLASS', 'LIME_STAINED_GLASS', 'PINK_STAINED_GLASS', 'GRAY_STAINED_GLASS',
          'LIGHT_GRAY_STAINED_GLASS', 'CYAN_STAINED_GLASS', 'PURPLE_STAINED_GLASS', 'BLUE_STAINED_GLASS',
          'BROWN_STAINED_GLASS', 'GREEN_STAINED_GLASS', 'RED_STAINED_GLASS', 'BLACK_STAINED_GLASS'
        ];
        return glassColors[damage] || 'WHITE_STAINED_GLASS';
      }
      
      if (id === 5) {
        const woodTypes = ['OAK_PLANKS', 'SPRUCE_PLANKS', 'BIRCH_PLANKS', 'JUNGLE_PLANKS', 'ACACIA_PLANKS', 'DARK_OAK_PLANKS'];
        return woodTypes[damage] || 'OAK_PLANKS';
      }
      
      if (id === 17) {
        const logTypes = ['OAK_LOG', 'SPRUCE_LOG', 'BIRCH_LOG', 'JUNGLE_LOG'];
        return logTypes[damage] || 'OAK_LOG';
      }
      
      if (id === 18) {
        const leafTypes = ['OAK_LEAVES', 'SPRUCE_LEAVES', 'BIRCH_LEAVES', 'JUNGLE_LEAVES'];
        return leafTypes[damage] || 'OAK_LEAVES';
      }
      
      if (id === 1) {
        const stoneTypes = ['STONE', 'GRANITE', 'POLISHED_GRANITE', 'DIORITE', 'POLISHED_DIORITE', 'ANDESITE', 'POLISHED_ANDESITE'];
        return stoneTypes[damage] || 'STONE';
      }
      
      if (id === 12) {
        return damage === 1 ? 'RED_SAND' : 'SAND';
      }
      
      if (id === 24) {
        const sandstoneTypes = ['SANDSTONE', 'CHISELED_SANDSTONE', 'CUT_SANDSTONE'];
        return sandstoneTypes[damage] || 'SANDSTONE';
      }
    }
    
    return MATERIAL_MAPPING[id] || 'STONE';
  }
  
  private static convertCommand(command: string): string {
    if (command.startsWith('console:')) {
      return `[console] ${command.substring(8)}`;
    } else if (command.startsWith('player:')) {
      return `[player] ${command.substring(7)}`;
    } else if (command.startsWith('message:')) {
      return `[message] ${command.substring(8)}`;
    } else if (command.startsWith('sound:')) {
      return `[sound] ${command.substring(6)}`;
    } else if (command.startsWith('close')) {
      return '[close]';
    } else if (command.startsWith('refresh')) {
      return '[refresh]';
    } else {
      return `[player] ${command}`;
    }
  }
  
  private static convertTitle(title: string): string {
    if (!title) return '';
    
    return title.replace(/&([0-9a-fk-or])/g, '&$1');
  }
  
  private static createFillerItem(panel: CommandPanel): DeluxeMenuItem {
    const fillerItem: DeluxeMenuItem = {
      material: this.convertMaterial(panel['empty-slot-item'] || 160, panel['empty-slot-item-damage']),
      display_name: panel['empty-slot-item-name'] ? this.convertTitle(panel['empty-slot-item-name']) : ' ',
      slots: this.generateFillerSlots(panel.rows * 9)
    };
    
    return fillerItem;
  }
  
  private static generateFillerSlots(totalSlots: number): number[] {
    const slots: number[] = [];
    
    for (let i = 0; i < totalSlots; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      const totalRows = Math.floor(totalSlots / 9);
      
      if (row === 0 || row === totalRows - 1 || col === 0 || col === 8) {
        slots.push(i);
      }
    }
    
    return slots;
  }
  
  static isCommandPanelsConfig(yamlContent: string): boolean {
    try {
      const config = parseYAML(yamlContent);
      return config && typeof config === 'object' && 'panels' in config;
    } catch {
      return false;
    }
  }
  
  static getConfigInfo(yamlContent: string): { version: string; panelCount: number; panels: string[] } {
    try {
      const config = parseYAML(yamlContent) as CommandPanelsConfig;
      const panels = Object.keys(config.panels || {});
      
      let version = 'v3';
      Object.values(config.panels || {}).forEach(panel => {
        if (panel['open-with-item'] !== undefined || panel['update-item'] !== undefined) {
          version = 'v4';
        }
      });
      
      return {
        version,
        panelCount: panels.length,
        panels
      };
    } catch (error) {
      throw new Error(`Error analyzing configuration: ${error.message}`);
    }
  }
}
