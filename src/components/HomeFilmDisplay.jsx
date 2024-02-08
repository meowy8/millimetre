import MediumFilmIcon from "./MediumFilmIcon";

const HomeFilmDisplay = ({filmDisplay}) => {
  return (
    <div
    id="films-container"
    className="bg-[#231236] flex items-center justify-center py-8 rounded-md mt-6 w-full border border-black architect-pattern"
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

