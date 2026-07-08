interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function SearchBar({
  search,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}

export default SearchBar;