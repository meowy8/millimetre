import { Link } from "react-router-dom";
import MediumFilmIcon from "./MediumFilmIcon";

const HomeFilmDisplay = ({ filmDisplay }) => {
  return (
    <div
      id="films-container"
      className="bg-[#1d0e2f] flex items-center justify-center p-4 rounded-sm mt-6 w-full border border-black md:w-4/5 lg:w-3/5"
    >
      <div className="grid grid-cols-2 gap-4 bg-black/70 p-2 rounded-md">
        {filmDisplay?.map((film) => {
          const filmTitle = film.title.toLowerCase().split(" ").join("-");
          const posterUrl =
            "https://image.tmdb.org/t/p/original/" + film.poster_path;
          return (
            <Link to={`/film/${film.id}/${filmTitle}`} key={film.id} className="flex gap-2 shadow-md shadow-black transition-transform hover:scale-[1.02] duration-100 bg-[#150921]">
              <MediumFilmIcon
                id={film.id}
                posterUrl={posterUrl}
                filmTitle={filmTitle}
              />
              <div className="w-3/5 hidden p-2 md:block">
                  <h1 className="text-lg hover:underline line-clamp-2">{film.title}</h1>
                <div className="flex overflow-hidden mt-2">
                  <p className="text-sm line-clamp-4 text-zinc-400">{film.overview}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeFilmDisplay;
