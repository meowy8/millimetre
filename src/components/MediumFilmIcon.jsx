import { Link } from "react-router-dom";

const MediumFilmIcon = ({ id, posterUrl, filmTitle }) => {
  return (
    <div className="flex max-w-36 max-h-56 overflow-hidden rounded-sm">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className=" flex h-full" />
      </Link>
    </div>
  );
};

export default MediumFilmIcon;
