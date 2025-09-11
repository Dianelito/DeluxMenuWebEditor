import { DeluxeMenuConfig, BackupEntry } from '../types/deluxemenu';

const BACKUP_STORAGE_KEY = 'deluxemenu_backups';
const MAX_BACKUPS = 10;

export class BackupManager {
  static saveBackup(name: string, config: DeluxeMenuConfig): void {
    const backups = this.getBackups();
    const newBackup: BackupEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      name: name || `Backup ${new Date().toLocaleString()}`,
      config: JSON.parse(JSON.stringify(config))
    };

    backups.unshift(newBackup);
    
    if (backups.length > MAX_BACKUPS) {
      backups.splice(MAX_BACKUPS);
    }

    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backups));
  }

  static getBackups(): BackupEntry[] {
    const stored = localStorage.getItem(BACKUP_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static restoreBackup(backupId: string): DeluxeMenuConfig | null {
    const backups = this.getBackups();
    const backup = backups.find(b => b.id === backupId);
    return backup ? backup.config : null;
  }

  static deleteBackup(backupId: string): void {
    const backups = this.getBackups();
    const filtered = backups.filter(b => b.id !== backupId);
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(filtered));
  }

  static autoBackup(config: DeluxeMenuConfig): void {
    this.saveBackup(`Auto-backup ${new Date().toLocaleString()}`, config);
  }
}
