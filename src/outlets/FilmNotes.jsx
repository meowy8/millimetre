import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Link, useParams } from "react-router-dom";
import NoteMain from "../components/NoteMain";
import { FilmCatalogue } from "../context/FilmCatalogueContext";

const FilmNotes = () => {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [filmData, setFilmData] = useState([])

  const { filmCatalogue } = FilmCatalogue();

  const { filmId, title } = useParams();

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
            filmId: noteData.filmId
          };
        });
        setListOfNotes(fetchedNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilmNotes();
  }, [filmId]);

  useEffect(() => {
    const data = filmCatalogue.find(film => film.id === parseInt(filmId))
    setFilmData(data)
  }, [filmCatalogue, filmId]);

  useEffect(() => console.log(listOfNotes), [listOfNotes]);
  return (
    <div>
      <h1 className="m-4 flex gap-2">
        Notes for 
        <Link to={`/film/${filmId}/${title}`} className="hover:underline">
          {filmData?.title}
        </Link>
        </h1>
      <div className="flex flex-col gap-4">
        {listOfNotes.length > 0 ? (
          listOfNotes.map((note) => {
            const urlTitle = note.title?.toLowerCase().split(" ").join("-");
            return (
              <NoteMain
                key={note.noteId}
                posterUrl={note.posterUrl}
                noteContent={note.noteContent}
                displayTitle={note.title}
                urlTitle={urlTitle}
                type={note.type}
                filmId={note.filmId}
                profileImg={note.profileImg}
                username={note.postedBy}
              />
            );
          })
        ) : (
          <p className="text-sm">No notes have been created for this film yet...</p>
        )}
      </div>
    </div>
  );
};

export default FilmNotes;