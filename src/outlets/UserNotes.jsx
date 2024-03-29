import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoteMain from "../components/NoteMain";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const UserNotes = () => {
  const [listOfNotes, setListOfNotes] = useState([]);
  const [userDocId, setUserDocId] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const usersCollection = collection(db, "users");
      const usernameQuery = query(
        usersCollection,
        where("username", "==", userId),
      );
      const querySnapshot = await getDocs(usernameQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        setUserDocId(userDoc.id);

        //console.log('User found:', userDoc.data())
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      const collectionRef = collection(db, "users", `${userDocId}`, "notes");
      try {
        const notesSnapShot = await getDocs(collectionRef);
        const fetchedNotes = notesSnapShot.docs.map((note) => {
          const noteData = note.data();
          return {
            noteContent: noteData.noteContent,
            noteId: noteData.noteId,
            posterUrl: noteData.posterUrl,
            type: noteData.type,
            filmId: noteData.filmId,
            title: noteData.filmTitle,
            userId: noteData.userId,
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
    <div>
      <h1 className="flex gap-2">
        Notes by
        <Link to={`/user/${userId}`} className="hover:underline">
          {userId}
        </Link>
      </h1>
      <div className="flex flex-col gap-4 m-2">
        {listOfNotes.length > 0 ? (
          listOfNotes.map((note) => {
            const urlTitle = note.title?.toLowerCase().split(" ").join("-");
            return (
              <NoteMain
                key={note.noteId}
                noteId={note.noteId}
                username={note.postedBy}
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
            No notes have been created by this user yet...
          </p>
        )}
      </div>
    </div>
  );
};

export default UserNotes;
