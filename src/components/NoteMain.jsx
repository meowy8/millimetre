import { Link } from "react-router-dom";
import SmallFilmIcon from "./SmallFilmIcon";
import SmallUserIcon from "./SmallUserIcon";

const NoteMain = ({ noteContent, profileImg, posterUrl, title, filmId, type }) => {
  return (
    <div className="bg-[#351951] p-4 flex gap-2">
      <div>
        {type !== "user note" ? (
          <SmallUserIcon profileImg={profileImg} />
        ) : (
          <SmallFilmIcon posterUrl={posterUrl} title={title} id={filmId} />
        )}
      </div>
      <div id="note-text">
        <Link to={`/film/${filmId}/title}`}>
          <h1 className="p-2 hover:underline">{title}</h1>
        </Link>
        <p className="text-sm p-2">{noteContent}</p>
      </div>
    </div>
  );
};

export default NoteMain;
