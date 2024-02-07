import { Link } from "react-router-dom";
import SmallFilmIcon from "./SmallFilmIcon";
import SmallUserIcon from "./SmallUserIcon";

const NoteMain = ({
  noteContent,
  profileImg,
  posterUrl,
  urlTitle,
  displayTitle,
  filmId,
  type,
  username
}) => {

  return (
    <div className="bg-[#351951] p-4 flex gap-2 rounded-md">
      <div>
        {type !== "user note" ? (
          <SmallUserIcon profileImg={profileImg} username={username}/>
        ) : (
          <SmallFilmIcon posterUrl={posterUrl} urlTitle={urlTitle} id={filmId} />
        )}
      </div>
      <div id="note-text">
        <Link to={`/film/${filmId}/${urlTitle}`}>
          <h1 className="p-2 hover:underline">{displayTitle}</h1>
        </Link>
        <div className="p-2 bg-[#14091f] rounded-sm">
          <p className="text-sm p-2">{noteContent}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteMain;
