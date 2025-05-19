import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center text-white">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Return Home
      </Link>
    </div>
  );
}
