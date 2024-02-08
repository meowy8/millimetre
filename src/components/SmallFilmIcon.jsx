import { Link } from "react-router-dom";

const SmallFilmIcon = ({ id, posterUrl, urlTitle }) => {
  return (
    <div className="flex w-24 h-36 overflow-hidden rounded-sm bg-black hover:border-white border-transparent border">
      <Link to={`/film/${id}/${urlTitle}`}>
        <img src={posterUrl} alt="" className=" flex w-full h-full " />
      </Link>
    </div>
  );
};

export default SmallFilmIcon;
