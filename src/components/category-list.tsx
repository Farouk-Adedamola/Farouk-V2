import Text from './Text/text';

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap space-x-2">
      {categories.map((category) => (
        <Text
          font="inter"
          size="sm"
          key={category}
          className="rounded-full bg-darkTheme-primary px-4 py-2 text-sm text-white"
        >
          {category}
        </Text>
      ))}
    </div>
  );
}
