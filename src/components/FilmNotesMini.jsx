import { Link } from "react-router-dom";
import FilmNote from "./FilmNote";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NoteMain from "./NoteMain";

const FilmNotesMini = ({ filmId, title, openModal }) => {
  const [listOfNotes, setListOfNotes] = useState([]);

  useEffect(() => {
    const fetchFilmNotes = async () => {
      const collectionRef = collection(db, "filmNotes", filmId, "notes");
      try {
        const notesSnapShot = await getDocs(collectionRef);
        const fetchedNotes = notesSnapShot.docs.map((note) => {
          const noteData = note.data();
          return {
            noteContent: noteData.noteContent,
            noteId: noteData.noteId,
            userId: noteData.userId,
            postedBy: noteData.postedBy,
            profileImg: noteData.profileImg,
            type: noteData.type,
            title: noteData.filmTitle,
            filmId: noteData.filmId,
          };
        });
        setListOfNotes(fetchedNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilmNotes();
  }, [filmId]);

  return (
    <div className="flex flex-col gap-2 bg-[#150921] p-4 w-full">
      <div className="flex justify-between">
        <Link
          className="text-xl hover:underline"
          to={`/notes/${filmId}/${title}`}
        >
          Notes
        </Link>
        <button onClick={openModal} className="text-sm">
          + Create new note
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {listOfNotes.length > 0 ?
          listOfNotes.map((note) => {
            const urlTitle = note.title?.toLowerCase().split(" ").join("-");
            return (
              <NoteMain
                key={note.noteId}
                username={note.postedBy}
                posterUrl={note.posterUrl}
                noteContent={note.noteContent}
                displayTitle={note.title}
                urlTitle={urlTitle}
                type={note.type}
                filmId={note.filmId}
                profileImg={note.profileImg}
              />
            );
          }) : (
            <p className="text-sm">There are no notes for this film yet...</p>
          )}
      </div>
    </div>
  );
};

export default FilmNotesMini;
