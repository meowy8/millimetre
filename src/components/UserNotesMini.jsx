import { Link } from "react-router-dom";
import UserNote from "./UserNote";
import FilmNote from "./FilmNote";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NoteMain from "./NoteMain";

const UserNotesMini = ({
  username,
  profileImg,
  userDocId,
  setModalDisplay,
}) => {
  const [listOfNotes, setListOfNotes] = useState([]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      const collectionRef = collection(db, "users", `${userDocId}`, "notes");
      try {
        const notesSnapShot = await getDocs(collectionRef);
        const fetchedNotes = notesSnapShot.docs
          .filter((note, index) => index < 3)
          .map((note) => {
            const noteData = note.data();
            return {
              noteContent: noteData.noteContent,
              noteId: noteData.noteId,
              postedBy: noteData.postedBy,
              posterUrl: noteData.posterUrl,
              type: noteData.type,
              filmId: noteData.filmId,
              title: noteData.filmTitle,
            };
          });
        setListOfNotes(fetchedNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserNotes();
  }, [userDocId]);

  useEffect(() => console.log(listOfNotes), [listOfNotes]);

  return (
    <div className="flex flex-col gap-2 bg-[#150921] p-4 w-full">
      <div className="flex justify-between">
        <Link to={`/notes/${username}`} className="hover:underline">
          Notes by {username}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {listOfNotes.length > 0 ? (
          listOfNotes.map((note) => {
            const urlTitle = note.title?.toLowerCase().split(" ").join("-");
            return (
              <NoteMain
                key={note.noteId}
                username={username}
                posterUrl={note.posterUrl}
                noteContent={note.noteContent}
                displayTitle={note.title}
                urlTitle={urlTitle}
                type={note.type}
                filmId={note.filmId}
              />
            );
          })
        ) : (
          <p className="text-sm">{username} has not created any notes yet...</p>
        )}
        {listOfNotes.length > 0 && (
          <div className="flex justify-center p-2">
            <Link to={`/notes/${username}`} className="hover:underline">
              more...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotesMini;
