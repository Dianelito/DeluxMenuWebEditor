export interface MenuItem {
  id: string;
  material: string;
  slot: number;
  displayName: string;
  lore: string[];
  amount?: number;
  data?: number;
  enchantments?: Record<string, number>;
  hideFlags?: number;
  actions?: Record<string, string[]>;
  conditions?: Record<string, string>;
  placeholder?: Record<string, string>;
  update?: boolean;
  viewRequirement?: string;
  priority?: number;
}

export interface Menu {
  id: string;
  title: string;
  size: number;
  items: MenuItem[];
  openActions?: Record<string, string[]>;
  closeActions?: Record<string, string[]>;
  arguments?: Record<string, any>;
  requirements?: Record<string, string>;
}

export interface DeluxeMenuConfig {
  menus: Record<string, Menu>;
  settings: {
    checkUpdates: boolean;
    language: string;
    defaultPermission: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  menu: Omit<Menu, 'id'>;
}

export interface BackupEntry {
  id: string;
  timestamp: number;
  name: string;
  config: DeluxeMenuConfig;
}
