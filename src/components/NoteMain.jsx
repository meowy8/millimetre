import { Link } from "react-router-dom";
import SmallFilmIcon from "./SmallFilmIcon";
import SmallUserIcon from "./SmallUserIcon";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import EditNoteModal from "./EditNoteModal";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const NoteMain = ({
  noteContent,
  profileImg,
  posterUrl,
  urlTitle,
  displayTitle,
  filmId,
  type,
  userId,
  noteId,
}) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [dataSentToUserNotes, setDataSentToUserNotes] = useState(false);
  const [dataSentToFilmNotes, setDataSentToFilmNotes] = useState(false);
  const [username, setUsername] = useState(null);

  const { user } = UserAuth();

  // make sure that the most up to date username is retrieved
  useEffect(() => {
    const fetchUsername = async () => {
      const userRef = doc(db, "users", userId);
      try {
        await getDoc(userRef).then((doc) => setUsername(doc.data().username));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsername();
  }, [userId]);

  useEffect(() => {
    console.log(noteId);
  }, [noteId]);

  const closeModal = () => {
    setModalDisplay(false);
  };

  const openModal = () => {
    setModalDisplay(true);
  };

  const updateUserNote = async (noteId) => {
    const docRef = doc(db, "users", user.uid, "notes", noteId);
    try {
      await updateDoc(docRef, {
        noteContent: newNoteContent,
      }).then(() => setDataSentToUserNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const updateFilmNote = async (noteId) => {
    const docRef = doc(db, "filmNotes", filmId, "notes", noteId);
    try {
      await updateDoc(docRef, {
        noteContent: newNoteContent,
      }).then(() => setDataSentToFilmNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const updateAllNoteData = async () => {
    try {
      await Promise.all([updateUserNote(noteId), updateFilmNote(noteId)]);
  
      location.reload()
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    dataSentToFilmNotes && dataSentToUserNotes ? closeModal() : null;
  }, [dataSentToFilmNotes, dataSentToUserNotes]);

  const deleteFromUserNotes = async () => {
    const docRef = doc(db, "users", user.uid, "notes", noteId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromFilmNotes = async () => {
    const docRef = doc(db, "filmNotes", filmId, "notes", noteId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteData = async () => {
    try {
      await Promise.all([deleteFromFilmNotes(), deleteFromUserNotes()]);

      closeModal();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
          {user?.uid === userId && (
            <button onClick={openModal} className="text-sm">
              Edit
            </button>
          )}
        </div>
        <div className="flex p-2 bg-[#14091f] rounded-sm m-2 min-h-24">
          <p className="text-sm p-2 note">{noteContent}</p>
        </div>
      </div>
      {modalDisplay && (
        <EditNoteModal
          closeModal={closeModal}
          noteContent={noteContent}
          filmTitle={displayTitle}
          newNoteContent={newNoteContent}
          setNewNoteContent={setNewNoteContent}
          updateAllNoteData={updateAllNoteData}
          deleteNoteData={deleteNoteData}
        />
      )}
    </div>
  );
};

export default NoteMain;
