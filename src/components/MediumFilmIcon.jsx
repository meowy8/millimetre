import { Link } from "react-router-dom";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import { useEffect, useState } from "react";

const MediumFilmIcon = ({ id, posterUrl, filmTitle, toggleFaded }) => {
  const [faded, setFaded] = useState('opacity-100');

  const { userWatchedFilmsId } = FilmCatalogue();

  useEffect(() => {
    if (toggleFaded) {
      if (userWatchedFilmsId.includes(id)) {
        setFaded('opacity-50')
      }
    } else {
      setFaded('opacity-100')
    }
  }, [toggleFaded, userWatchedFilmsId, id])



  return (
    <div className="flex max-w-36 max-h-56 overflow-hidden rounded-sm bg-black hover:border-white border-transparent border">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className={" flex w-full h-full " + faded} />
      </Link>
    </div>
  );
};

export default MediumFilmIcon;
