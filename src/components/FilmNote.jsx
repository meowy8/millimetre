import SmallUserIcon from "./SmallUserIcon";
import { Link } from "react-router-dom";

const FilmNote = ({ filmId, title }) => {
  return (
    <div className="bg-[#351951] p-2 flex gap-2">
      <div>
        <SmallUserIcon />
      </div>
      <Link to={`/notes/${filmId}/${title}`}>
        <div id="note-text">
          <p className="text-sm">Note text goes here</p>
        </div>
      </Link>
    </div>
  );
};

export default FilmNote;
