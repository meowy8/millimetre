import { Link } from "react-router-dom";

const MediumFilmIcon = ({ id, posterUrl, filmTitle }) => {
  return (
    <div className="max-w-32 max-h-42 overflow-hidden rounded-sm">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className="flex w-full" />
      </Link>
    </div>
  );
};

export default MediumFilmIcon;
