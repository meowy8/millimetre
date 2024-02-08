import { useEffect, useState } from "react";
import MediumFilmIcon from "../components/MediumFilmIcon";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import CatalogueSearchBar from "../components/CatalogueSearchBar";
import ToggleFadedButton from "../components/ToggleFadedButton";
import { UserAuth } from "../context/AuthContext";

const Catalogue = () => {
  const { filmCatalogue } = FilmCatalogue();

  const [displaySearchBar, setdisplaySearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCatalogue, setFilteredCatalogue] = useState([]);
  const [toggleFaded, setToggleFaded] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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

    const filteredList = filmCatalogue.filter((film) => {
      return film.title.toLowerCase().includes(e.target.value);
    });

    setFilteredCatalogue(filteredList);
  };

  const handleToggleChange = () => {
    if (toggleFaded) {
      setToggleFaded(false);
    } else {
      setToggleFaded(true);
    }
  };

  return (
    <div className="flex flex-col items-center min-w-96 md:min-w-[600px] lg:min-w-[1000px]">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-between items-end px-2 pb-4 w-full md:w-5/6 lg:max-w-[650px]">
          <CatalogueSearchBar
            searchBarDisplay={searchBarDisplay}
            displaySearchBar={displaySearchBar}
            handleInputChange={handleInputChange}
            searchInput={searchInput}
          />
          <ToggleFadedButton
            handleToggleChange={handleToggleChange}
            togglefaded={toggleFaded}
            user={user}
          />
        </div>
        <div
          id="catalogue-container"
          className="grid grid-cols-3 justify-center gap-4 lg:grid-cols-4"
        >
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
                toggleFaded={toggleFaded}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
