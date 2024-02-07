import { Link } from "react-router-dom";
import SmallFilmIcon from "./SmallFilmIcon";
import SmallUserIcon from "./SmallUserIcon";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const NoteMain = ({
  noteContent,
  profileImg,
  posterUrl,
  urlTitle,
  displayTitle,
  filmId,
  type,
  username,
  userId,
}) => {
  const { user } = UserAuth();

  useEffect(() => {
    console.log(userId)
  }, [userId]);

  return (
    <div className="bg-[#351951] p-4 flex gap-2 rounded-md border border-black">
      <div>
        {type !== "user note" ? (
          <SmallUserIcon profileImg={profileImg} username={username} />
        ) : (
          <SmallFilmIcon
            posterUrl={posterUrl}
            urlTitle={urlTitle}
            id={filmId}
          />
        )}
      </div>
      <div id="note-text" className="w-full">
        <div className="flex justify-between">
          <Link to={`/film/${filmId}/${urlTitle}`}>
            <h1 className="p-2 hover:underline">{displayTitle}</h1>
          </Link>
          {user.uid === userId && <button className="text-sm">Edit</button>}
        </div>
        <div className="p-2 bg-[#14091f] rounded-sm">
          <p className="text-sm p-2">{noteContent}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteMain;
