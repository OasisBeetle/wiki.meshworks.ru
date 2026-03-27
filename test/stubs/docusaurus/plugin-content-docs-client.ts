export function isActiveSidebarItem(): boolean {
  return false;
}

export function findFirstSidebarItemLink(): string | undefined {
  return undefined;
}

export function useDocSidebarItemsExpandedState() {
  return {
    expandedItem: null,
    setExpandedItem() {},
  };
}

export function useVisibleSidebarItems<T>(items: T[]): T[] {
  return items;
}
