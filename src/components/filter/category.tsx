'use client';

import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';

import { categoriesState } from '@/states/categories';

export default function Category({ category }: { category: string }) {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const isSelected = categories.selected.includes(category);
  const isActive = categories.active.includes(category);

  const handleClick = () => {
    setCategories((prev) => ({
      ...prev,
      selected: isSelected
        ? prev.selected.filter((c) => c !== category)
        : [...prev.selected, category],
    }));
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        relative flex items-center justify-center gap-2
        rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
        ${
          isSelected
            ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50'
            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
        }
        ${!isActive && !isSelected && 'opacity-60 '}
      `}
    >
      {category}

      {isActive && !isSelected && (
        <span
          className=" h-1.5 w-1.5  
          rounded-full bg-emerald-400"
        />
      )}
    </motion.button>
  );
}
