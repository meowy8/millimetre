import { Link } from "react-router-dom";
import FilmNote from "./FilmNote";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NoteMain from "./NoteMain";

const FilmNotesMini = ({ filmId, title, openModal, user }) => {
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
    <div className="flex flex-col gap-2 bg-[#150921] mt-10 p-4 w-full md:mt-6 md:w-4/5">
      <div className="flex justify-between">
        <Link
          className="text-xl hover:underline"
          to={`/notes/${filmId}/${title}`}
        >
          Notes
        </Link>
        {user && (
          <button onClick={openModal} className="text-2xl hover:bg-yellow-50 hover:text-black rounded-full px-3">
            +
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {listOfNotes.length > 0 ? (
          listOfNotes.map((note) => {
            const urlTitle = note.title?.toLowerCase().split(" ").join("-");
            return (
              <NoteMain
                key={note.noteId}
                noteId={note.noteId}
                posterUrl={note.posterUrl}
                noteContent={note.noteContent}
                displayTitle={note.title}
                urlTitle={urlTitle}
                type={note.type}
                filmId={note.filmId}
                profileImg={note.profileImg}
                userId={note.userId}
              />
            );
          })
        ) : (
          <p className="text-sm">
            No notes have been created for this film yet...
          </p>
        )}
      </div>
    </div>
  );
};

export default FilmNotesMini;
