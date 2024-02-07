import { Link } from "react-router-dom";

const SmallFilmIcon = ({ id, posterUrl, filmTitle }) => {
  return (
    <div className="flex w-24 h-36 overflow-hidden rounded-sm bg-black mt-3">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className=" flex w-full h-full " />
      </Link>
    </div>
  );
};

export default SmallFilmIcon;
