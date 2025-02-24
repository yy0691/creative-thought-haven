import { useState } from 'react';
import { cn } from '../lib/utils';

type Category = {
  id: string;
  name: string;
  description?: string;
  subcategories?: Category[];
};

type CategorySelectorProps = {
  categories: Category[];
  onSelect: (categoryId: string, subcategoryId?: string) => void;
  selectedCategory: string;
  selectedSubcategory?: string;
  className?: string;
};

export const CategorySelector = ({
  categories,
  onSelect,
  selectedCategory,
  selectedSubcategory,
  className,
}: CategorySelectorProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

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
              'relative p-4 rounded-lg transition-all duration-300',
              'border border-white/20 backdrop-blur-sm overflow-hidden',
              selectedCategory === category.id
                ? 'bg-gradient-to-br from-purple-100/10 to-purple-100/5 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'bg-gradient-to-br from-purple-50/5 to-transparent hover:from-purple-100/10 hover:to-purple-800/5',
              'group before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent',
              'before:bg-gradient-to-r before:from-purple-100/30 before:via-purple-100/20 before:to-purple-200/30',
              'before:transition-all before:duration-100 before:opacity-0 hover:before:opacity-100',
              'before:[background-size:200%_100%] hover:before:[animation:shine_2s_ease-in-out_infinite]',
              'after:absolute after:inset-[1px] after:rounded-lg after:bg-white/95 after:-z-[1]'
            )}
          >
            <h3 className="text-lg font-semibold mb-2 text-primary transition-colors duration-300 relative z-10">
              {category.name}
            </h3>
            {category.description && (
              <p
                className={cn(
                  'text-sm text-muted-foreground transition-all duration-300 relative z-10',
                  hoveredCategory === category.id || selectedCategory === category.id
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-70 transform translate-y-1'
                )}
              >
                {category.description}
              </p>
            )}
          </button>
        ))}
      </div>

      {selectedCategoryData?.subcategories && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{selectedCategoryData.name}</span>
            {selectedSubcategory && (
              <>
                <span>/</span>
                <span className="text-primary">
                  {selectedCategoryData.subcategories.find(sub => sub.id === selectedSubcategory)?.name}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedCategoryData.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelect(selectedCategory, sub.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-all duration-300',
                  'border border-white/20 backdrop-blur-sm',
                  selectedSubcategory === sub.id
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'hover:bg-primary/5 hover:text-primary hover:border-primary/20'
                )}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};