import { FoodItem } from '../utils/nutrition';

export interface UserProfileData {
  userId: string;
  username: string;
  waterIntakeMl: number;
  burnedCalories: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface AuthSessionData {
  key: 'current_session';
  isLoggedIn: boolean;
  username: string;
  userId: string;
  loginTimestamp: number;
}

const DB_NAME = 'CalorieIQ_BetaDatabase';
const DB_VERSION = 1;

class AppDatabase {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB not supported in this environment'));
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;

        // Food logs store
        if (!db.objectStoreNames.contains('food_logs')) {
          const foodStore = db.createObjectStore('food_logs', { keyPath: 'id' });
          foodStore.createIndex('userId', 'userId', { unique: false });
          foodStore.createIndex('category', 'category', { unique: false });
        }

        // User profile store
        if (!db.objectStoreNames.contains('user_profiles')) {
          db.createObjectStore('user_profiles', { keyPath: 'userId' });
        }

        // Auth session store
        if (!db.objectStoreNames.contains('auth_session')) {
          db.createObjectStore('auth_session', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  // --- Food Logs CRUD ---
  async getFoodLogs(userId: string = 'user101'): Promise<FoodItem[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const transaction = db.transaction('food_logs', 'readonly');
        const store = transaction.objectStore('food_logs');
        const request = store.getAll();

        request.onsuccess = () => {
          const items: (FoodItem & { userId?: string })[] = request.result || [];
          const userItems = items.filter((item) => !item.userId || item.userId === userId);
          resolve(userItems);
        };

        request.onerror = () => {
          // Fallback to localStorage
          resolve(this.getFallbackLogs(userId));
        };
      });
    } catch {
      return this.getFallbackLogs(userId);
    }
  }

  async saveFoodLog(food: FoodItem, userId: string = 'user101'): Promise<void> {
    try {
      const db = await this.getDB();
      const itemToSave = { ...food, userId };
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('food_logs', 'readwrite');
        const store = transaction.objectStore('food_logs');
        const request = store.put(itemToSave);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      this.saveFallbackLog(food, userId);
    }
  }

  async deleteFoodLog(id: string, userId: string = 'user101'): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('food_logs', 'readwrite');
        const store = transaction.objectStore('food_logs');
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      this.deleteFallbackLog(id, userId);
    }
  }

  // --- User Profile (Water, Streak) ---
  async getUserProfile(userId: string = 'user101'): Promise<UserProfileData> {
    const defaultProfile: UserProfileData = {
      userId,
      username: 'user101',
      waterIntakeMl: 0,
      burnedCalories: 0,
      streakDays: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };

    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const transaction = db.transaction('user_profiles', 'readonly');
        const store = transaction.objectStore('user_profiles');
        const request = store.get(userId);

        request.onsuccess = () => {
          resolve(request.result || defaultProfile);
        };
        request.onerror = () => resolve(defaultProfile);
      });
    } catch {
      const local = localStorage.getItem(`calorieiq_profile_${userId}`);
      if (local) {
        try {
          return JSON.parse(local);
        } catch {}
      }
      return defaultProfile;
    }
  }

  async saveUserProfile(profile: UserProfileData): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('user_profiles', 'readwrite');
        const store = transaction.objectStore('user_profiles');
        const request = store.put(profile);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      localStorage.setItem(`calorieiq_profile_${profile.userId}`, JSON.stringify(profile));
    }
  }

  // --- Auth Session ---
  async getAuthSession(): Promise<AuthSessionData | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const transaction = db.transaction('auth_session', 'readonly');
        const store = transaction.objectStore('auth_session');
        const request = store.get('current_session');

        request.onsuccess = () => {
          resolve(request.result || null);
        };
        request.onerror = () => {
          const local = localStorage.getItem('calorieiq_session');
          resolve(local ? JSON.parse(local) : null);
        };
      });
    } catch {
      const local = localStorage.getItem('calorieiq_session');
      return local ? JSON.parse(local) : null;
    }
  }

  async setAuthSession(session: Omit<AuthSessionData, 'key'>): Promise<void> {
    const data: AuthSessionData = { ...session, key: 'current_session' };
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('auth_session', 'readwrite');
        const store = transaction.objectStore('auth_session');
        const request = store.put(data);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      localStorage.setItem('calorieiq_session', JSON.stringify(data));
    }
  }

  async clearAuthSession(): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('auth_session', 'readwrite');
        const store = transaction.objectStore('auth_session');
        const request = store.delete('current_session');

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      localStorage.removeItem('calorieiq_session');
    }
  }

  // Fallbacks
  private getFallbackLogs(userId: string): FoodItem[] {
    const raw = localStorage.getItem(`calorieiq_food_logs_${userId}`);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private saveFallbackLog(food: FoodItem, userId: string): void {
    const current = this.getFallbackLogs(userId);
    const existingIndex = current.findIndex((f) => f.id === food.id);
    if (existingIndex >= 0) {
      current[existingIndex] = food;
    } else {
      current.unshift(food);
    }
    localStorage.setItem(`calorieiq_food_logs_${userId}`, JSON.stringify(current));
  }

  private deleteFallbackLog(id: string, userId: string): void {
    const current = this.getFallbackLogs(userId);
    const filtered = current.filter((f) => f.id !== id);
    localStorage.setItem(`calorieiq_food_logs_${userId}`, JSON.stringify(filtered));
  }
}

export const dbService = new AppDatabase();
