// @/store/menuPermissions.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuPermissions {
  menuUrl: string;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canApprove: boolean;
  };
}

interface MenuPermissionsStore {
  permissionsMap: Map<string, MenuPermissions['permissions']>;
  version: number;

  setPermissions: (menus: MenuPermissions[]) => void;
  getPermissionsByUrl: (menuUrl: string) => MenuPermissions['permissions'] | null;
  clearPermissions: () => void;
  refreshPermissions: () => void;
  updatePermissions: (updates: MenuPermissions[]) => void;
}

export const useMenuPermissionsStore = create<MenuPermissionsStore>()(
  persist(
    (set, get) => ({
      permissionsMap: new Map(),
      version: 0,

      setPermissions: (menus: MenuPermissions[]) => {
        const permissionsMap = new Map();

        const processMenu = (menu: MenuPermissions) => {
          if (menu.menuUrl) {
            permissionsMap.set(menu.menuUrl, menu.permissions);
          }
        };

        menus.forEach(processMenu);

        set({
          permissionsMap,
          version: get().version + 1
        });
      },

      getPermissionsByUrl: (menuUrl: string) => {
        const { permissionsMap } = get();

        // Ensure permissionsMap is a Map
        if (!(permissionsMap instanceof Map)) {
          return null;
        }

        const exactMatch = permissionsMap.get(menuUrl);
        if (exactMatch) return exactMatch;

        for (const [key, value] of permissionsMap.entries()) {
          if (menuUrl.startsWith(key) && key !== '/') {
            return value;
          }
        }

        const rootPermission = permissionsMap.get('/');
        if (rootPermission) return rootPermission;

        return null;
      },

      clearPermissions: () => {
        set({
          permissionsMap: new Map(),
          version: get().version + 1
        });
      },

      refreshPermissions: () => {
        set({ version: get().version + 1 });
        console.log('version is upgrade')
      },

      updatePermissions: (updates: MenuPermissions[]) => {
        const { permissionsMap } = get();
        const newMap = new Map(permissionsMap instanceof Map ? permissionsMap : []);

        updates.forEach(update => {
          if (update.menuUrl) {
            newMap.set(update.menuUrl, update.permissions);
          }
        });

        set({
          permissionsMap: newMap,
          version: get().version + 1
        });
      },
    }),
    {
      name: 'menu-permissions-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          try {
            const parsed = JSON.parse(str);

            const storedMap = parsed?.state?.permissionsMap;

            return {
              state: {
                ...parsed.state,
                permissionsMap: Array.isArray(storedMap)
                  ? new Map(storedMap)
                  : new Map(),
              },
            };
          } catch (error) {
            console.error('Error parsing stored permissions:', error);
            return null;
          }
        },

        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              permissionsMap: Array.from(
                value.state.permissionsMap instanceof Map
                  ? value.state.permissionsMap.entries()
                  : []
              ),
            },
          });
          localStorage.setItem(name, str);
        },

        removeItem: (name) => localStorage.removeItem(name),
      }
    }
  )
);