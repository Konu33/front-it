class LocalStorage {
  public readonly prefix: string = '@it-crowd:';

  public getItem(key: string, fallback?: string): string | null {
    const value = localStorage.getItem(this.prefix + key);
    if (value !== null) return value;
    else if (fallback !== undefined) return fallback;
    else return null;
  }

  public getJsonItem<T = unknown>(key: string, fallback?: T): T | null {
    const value = localStorage.getItem(this.prefix + key);
    if (value === null) {
      if (fallback !== undefined) return fallback;
      else return null;
    }

    return JSON.parse(value) as T;
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(this.prefix + key, value);
  }

  public setJsonItem<T>(key: string, value: T): void {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(this.prefix + key, stringifiedValue);
  }

  public isItemSet(key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  public unsetItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}

export default new LocalStorage();
