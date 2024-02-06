import { Link } from "react-router-dom";

const UserNote = ({ username }) => {
  return (
    <div className="bg-[#351951] p-2 flex gap-2">
      <Link to={`/notes/${username}`}>
        <div id="note-text">
          <p className="text-sm">Note text goes here</p>
        </div>
      </Link>
    </div>
  );
};

export default UserNote;
