import { useEffect, useState } from "react";
import MediumFilmIcon from "../components/MediumFilmIcon";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import CatalogueSearchBar from "../components/CatalogueSearchBar";

const Catalogue = () => {
  const { filmCatalogue } = FilmCatalogue();

  const [displaySearchBar, setdisplaySearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCatalogue, setFilteredCatalogue] = useState([]);

  useEffect(() => setFilteredCatalogue(filmCatalogue), [filmCatalogue]);

  const searchBarDisplay = () => {
    if (displaySearchBar) {
      setdisplaySearchBar(false);
    } else {
      setdisplaySearchBar(true);
    }

    setFilteredCatalogue(filmCatalogue);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value === "") {
      setFilteredCatalogue(filmCatalogue);
    } else {
      const filteredList = filmCatalogue.filter((film) => {
        return film.title.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredCatalogue(filteredList);
    }
  };

  return (
    <div className="flex flex-col">
      <CatalogueSearchBar
        searchBarDisplay={searchBarDisplay}
        displaySearchBar={displaySearchBar}
        handleInputChange={handleInputChange}
        searchInput={searchInput}
      />
      <div id="catalogue-container" className="grid grid-cols-3 gap-4">
        {filteredCatalogue.map((film) => {
          const posterUrl =
            "https://image.tmdb.org/t/p/original/" + film.poster_path;
          const filmTitle = film.title.toLowerCase().split(" ").join("-");
          return (
            <MediumFilmIcon
              key={film.id}
              id={film.id}
              posterUrl={posterUrl}
              filmTitle={filmTitle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Catalogue;
