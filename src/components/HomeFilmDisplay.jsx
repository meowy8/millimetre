import MediumFilmIcon from "./MediumFilmIcon";

const HomeFilmDisplay = ({filmDisplay}) => {
  return (
    <div
    id="films-container"
    className="bg-[#1d0e2f] flex items-center justify-center py-8 rounded-md mt-6 w-full border border-black md:w-4/5 lg:w-3/5"
  >
    <div className="grid grid-cols-2 gap-4">
      {filmDisplay?.map((film) => {
        const filmTitle = film.title.toLowerCase().split(" ").join("-");
        const posterUrl =
          "https://image.tmdb.org/t/p/original/" + film.poster_path;
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
  )
}

export default HomeFilmDisplay

