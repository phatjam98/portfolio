export type CategoryId = 'optimization' | 'architecture' | 'infrastructure' | 'vision';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  color: string;
}

export const categoryMap: Record<CategoryId, CategoryMeta> = {
  optimization: { id: 'optimization', label: 'Optimization', color: '#10b981' },
  architecture: { id: 'architecture', label: 'Architecture', color: '#06b6d4' },
  infrastructure: { id: 'infrastructure', label: 'Infrastructure', color: '#8b5cf6' },
  vision: { id: 'vision', label: 'Vision', color: '#f59e0b' },
};

export function getCategory(id: CategoryId): CategoryMeta {
  return categoryMap[id];
}
