import SmallUserIcon from "./SmallUserIcon";
import { Link } from "react-router-dom";

const FilmNote = ({ filmId, title, profileImg, username, noteContent }) => {
  let path = "";
  if (username) {
    path = `/notes/${username}`;
  } else {
    path = `/notes/${filmId}/${title}`;
  }

  return (
    <div className="bg-[#351951] p-2 flex gap-2">
      <div>
        <SmallUserIcon profileImg={profileImg} />
      </div>
      <Link to={path}>
        <div id="note-text">
          <p className="text-sm">{noteContent}</p>
        </div>
      </Link>
    </div>
  );
};

export default FilmNote;
