'use client';

import { ChangeEvent } from 'react';

import { Search, X } from 'lucide-react';
import { useRecoilState } from 'recoil';

import useFocus from '@/hooks/use-focus';
import useHover from '@/hooks/use-hover';
import { queryState } from '@/states/query';

export default function SearchBar() {
  const [query, setQuery] = useRecoilState(queryState);
  const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>();
  const { ref: focusRef, isFocusing } = useFocus<HTMLInputElement>();

  const handleInputClear = () => {
    setQuery('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const isActive = isHovering || isFocusing;

  return (
    <div ref={hoverRef} className="relative mx-auto mb-8 w-full max-w-2xl">
      <div
        className={`
          relative flex items-center rounded-full 
          bg-gray-900/50 backdrop-blur-sm transition-all duration-200
          ${isActive ? 'ring-2 ring-emerald-500/50' : 'ring-1 ring-white/10'}
        `}
      >
        <Search
          className={`
            absolute left-4 h-5 w-5 transition-colors duration-200
            ${isActive ? 'text-emerald-400' : 'text-gray-400'}
          `}
        />

        <input
          ref={focusRef}
          type="text"
          placeholder="Search posts..."
          onChange={handleInputChange}
          value={query}
          className="w-full bg-transparent py-4 pl-12 pr-12 text-lg font-medium 
            text-gray-200 placeholder-gray-400 transition-colors duration-200
            focus:text-white focus:outline-none"
        />

        {query && (
          <button
            onClick={handleInputClear}
            className="group absolute right-4 rounded-full p-1.5
              transition-all duration-200 hover:bg-white/10"
            aria-label="Clear search"
          >
            <X
              className="h-4 w-4 text-gray-400 transition-colors 
              duration-200 group-hover:text-white"
            />
          </button>
        )}
      </div>
    </div>
  );
}
