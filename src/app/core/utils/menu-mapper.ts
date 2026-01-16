import { MenuDTO } from '@/models/dto/MenuDTO';
import { MenuItem } from 'primeng/api';

export function buildMenuTree(menus: MenuDTO[]): MenuItem[] {
    const map = new Map<number, MenuItem>();
    const roots: MenuItem[] = [];

    // sort menus
    menus.sort((a, b) => a.sortOrder - b.sortOrder);

    // create menu items WITHOUT items initially
    menus.forEach(menu => {
        map.set(menu.menuId, {
            label: menu.title,
            icon: menu.icon, // already 'pi pi-*'
            routerLink: menu.url ? [menu.url] : undefined
        });
    });

    // build hierarchy
    menus.forEach(menu => {
        const menuItem = map.get(menu.menuId)!;

        if (menu.parentMenuId) {
            const parent = map.get(menu.parentMenuId);

            // ✅ create items ONLY for parents
            if (parent) {
                if (!parent.items) {
                    parent.items = [];
                }
                parent.items.push(menuItem);
            }
        } else {
            roots.push(menuItem);
        }
    });

    return roots;
}