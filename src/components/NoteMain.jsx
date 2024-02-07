import { Link } from "react-router-dom";
import SmallFilmIcon from "./SmallFilmIcon";
import SmallUserIcon from "./SmallUserIcon";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import EditNoteModal from "./EditNoteModal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
  noteId,
}) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [dataSentToUserNotes, setDataSentToUserNotes] = useState(false);
  const [dataSentToFilmNotes, setDataSentToFilmNotes] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    console.log(noteId);
  }, [noteId]);

  const closeModal = () => {
    setModalDisplay(false);
  };

  const openModal = () => {
    setModalDisplay(true);
  };

  const sendNotetoUserNotes = async (noteId) => {
    const docRef = doc(db, "users", user.uid, "notes", noteId);
    try {
      await updateDoc(docRef, {
        noteContent: newNoteContent,
      }).then(() => setDataSentToUserNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotetoFilmNotes = async (noteId) => {
    const docRef = doc(db, "filmNotes", filmId, "notes", noteId);
    try {
      await updateDoc(docRef, {
        noteContent: newNoteContent,
      }).then(() => setDataSentToFilmNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const sendAllNoteData = () => {
    sendNotetoFilmNotes(noteId);
    sendNotetoUserNotes(noteId);
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

  const deleteNoteData = () => {
    deleteFromFilmNotes();
    deleteFromUserNotes();
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
          <p className="text-sm p-2">{noteContent}</p>
        </div>
      </div>
      {modalDisplay && (
        <EditNoteModal
          closeModal={closeModal}
          noteContent={noteContent}
          filmTitle={displayTitle}
          newNoteContent={newNoteContent}
          setNewNoteContent={setNewNoteContent}
          sendAllNoteData={sendAllNoteData}
          deleteNoteData={deleteNoteData}
        />
      )}
    </div>
  );
};

export default NoteMain;
