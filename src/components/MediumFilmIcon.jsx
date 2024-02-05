import { Link } from "react-router-dom";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import { useState } from "react";

const MediumFilmIcon = ({ id, posterUrl, filmTitle, toggleFaded }) => {
  const [faded, setFaded] = useState('opacity-100');

  const { watchedFilmsData } = FilmCatalogue();

  if (toggleFaded) {
    if (watchedFilmsData.includes(id)) {
      setFaded('opacity-70')
    }
  }

  return (
    <div className="flex max-w-36 max-h-56 overflow-hidden rounded-sm">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className={" flex w-full h-full " + faded} />
      </Link>
    </div>
  );
};

export default MediumFilmIcon;
