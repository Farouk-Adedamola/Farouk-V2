'use client';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { useRecoilState } from 'recoil';

import { pageState } from '@/states/page';

export default function Paginate({
  totalPages,
  elementToScroll,
}: {
  totalPages: number;
  elementToScroll: HTMLElement | null;
}) {
  const [page, setPage] = useRecoilState(pageState);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);

    elementToScroll &&
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  return (
    <ReactPaginate
      className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium transition-all duration-200"
      pageCount={totalPages}
      previousLabel={<AiOutlineLeft />}
      nextLabel={<AiOutlineRight />}
      breakLabel={<FiMoreHorizontal />}
      onPageChange={handlePageChange}
      forcePage={page - 1}
      renderOnZeroPageCount={() => null}
    />
  );
}
