type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <section className='search-hero'>
      <h2>Find your perfect stay</h2>

      <form className='search-bar' onSubmit={(event) => event.preventDefault()}>
        <input
          type='text'
          placeholder='Search venues or locations'
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <button type='submit'>Search</button>
      </form>
    </section>
  );
}

export default SearchBar;
