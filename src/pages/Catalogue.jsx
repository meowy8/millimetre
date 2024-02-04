import MediumFilmIcon from "../components/MediumFilmIcon";
import { FilmCatalogue } from "../context/FilmCatalogueContext";

const Catalogue = () => {
  const { filmCatalogue } = FilmCatalogue();

  return (
    <div className="flex justify-center items-center">
      <div id="catalogue-container" className="grid grid-cols-2 gap-4">
        {filmCatalogue.map((film) => {
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
