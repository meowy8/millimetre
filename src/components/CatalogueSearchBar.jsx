const CatalogueSearchBar = ({
  displaySearchBar,
  searchBarDisplay,
  handleInputChange,
  searchInput,
}) => {
  return (
    <div className="">
      {!displaySearchBar ? (
        <button
          onClick={searchBarDisplay}
          className=""
        >
          Search films...
        </button>
      ) : (
        <div className="flex h-full">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search catalogue"
            value={searchInput}
            onChange={handleInputChange}
            className="rounded-s-sm text-sm"
          />
          <button onClick={searchBarDisplay} className="bg-[#231236] px-2 py-1 rounded-e-md text-sm">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogueSearchBar;
