const CatalogueSearchBar = ({ displaySearchBar, searchBarDisplay, handleInputChange, searchInput }) => {
  return (
    <div className="pl-4 pb-4">
      {!displaySearchBar ? (
        <button
          onClick={searchBarDisplay}
          className="font-light bg-[#28143e] p-1 rounded-md"
        >
          Search films
        </button>
      ) : (
        <div className="flex gap-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search catalogue"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button onClick={searchBarDisplay} className="bg-[#28143e] p-2">
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogueSearchBar;
