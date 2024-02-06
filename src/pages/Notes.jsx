import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Notes = () => {
  const { title, filmId } = useParams();

  const displayTitle = title.split("-").join(" ");

  return (
    <div>
      <h1 className="flex gap-1">
        Notes for
        <Link to={`/film/${filmId}/${title}`} className="hover:underline">{displayTitle}</Link>
      </h1>
    </div>
  );
};

export default Notes;
