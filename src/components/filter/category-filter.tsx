'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRecoilState } from 'recoil';

import Category from '@/components/filter/category';
import { categoriesState } from '@/states/categories';

export default function CategoryFilter({
  allCategories,
}: {
  allCategories: string[];
}) {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const clearAllActive = categories.selected.length > 0;

  const handleClearAll = () => {
    setCategories({
      selected: [],
      active: [],
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">
          Filter by Topics
        </h2>
        <AnimatePresence>
          {clearAllActive && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={handleClearAll}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 
                text-sm text-gray-400 backdrop-blur-sm transition-all duration-200 
                hover:bg-white/10 hover:text-white"
            >
              Clear All
              <X className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div
        className="relative rounded-xl bg-white/5 p-4 ring-1 
        ring-white/10 backdrop-blur-sm transition-all duration-200 hover:ring-white/20"
      >
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </div>

        {/* Optional: Empty state */}
        {allCategories.length === 0 && (
          <p className="py-2 text-center text-sm text-gray-400">
            No categories available
          </p>
        )}

        {/* Gradient border effect */}
        <div className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden rounded-full">
          <div
            className="h-full w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 
            transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
