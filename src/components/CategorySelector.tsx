import { useState } from 'react';
import { cn } from '../lib/utils';

type Category = {
  id: string;
  name: string;
  description?: string;
};

type CategorySelectorProps = {
  categories: Category[];
  onSelect: (categoryId: string) => void;
  selectedCategory: string;
  className?: string;
};

export const CategorySelector = ({
  categories,
  onSelect,
  selectedCategory,
  className,
}: CategorySelectorProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={cn(
              'relative p-4 rounded-lg transition-all duration-300 transform hover:scale-105',
              'border border-white/20 backdrop-blur-sm',
              selectedCategory === category.id
                ? 'bg-primary/20 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20',
              'group'
            )}
          >
            <h3 className="text-lg font-semibold mb-2 text-primary">
              {category.name}
            </h3>
            {category.description && (
              <p
                className={cn(
                  'text-sm text-muted-foreground transition-opacity duration-300',
                  hoveredCategory === category.id || selectedCategory === category.id
                    ? 'opacity-100'
                    : 'opacity-70'
                )}
              >
                {category.description}
              </p>
            )}
            <div
              className={cn(
                'absolute inset-0 border-2 rounded-lg transition-opacity duration-300',
                selectedCategory === category.id
                  ? 'border-primary opacity-100'
                  : 'border-transparent opacity-0 group-hover:opacity-50'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};