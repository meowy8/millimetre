import { useEffect } from "react";

const EditNoteModal = ({
  sendAllNoteData,
  noteContent,
  newNoteContent,
  setNewNoteContent,
  closeModal,
  filmTitle,
  deleteNoteData,
}) => {
  const texturePath = "/texture.svg";

  useEffect(
    () => setNewNoteContent(noteContent),
    [noteContent, setNewNoteContent],
  );

  const handleChange = (e) => {
    setNewNoteContent(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (newNoteContent) {
      sendAllNoteData();
    }
  };

  const handleDelete = () => {
    deleteNoteData();
    closeModal();
  };

  useEffect(() => {
    console.log(newNoteContent);
  }, [newNoteContent]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur bg-black">
      <div
        style={{ backgroundImage: `url(${texturePath})` }}
        className="bg-gray-950 p-4 shadow-xl shadow-black"
      >
        <form
          action="submit"
          className="flex flex-col gap-4 max-w-96"
          onSubmit={(e) => handleSave(e)}
        >
          <div className="flex justify-between">
            <h1 className="text-lg">
              Edit Note for <span className=" text-gray-400">{filmTitle}</span>
            </h1>
            <button
              type="button"
              onClick={closeModal}
              className="text-3xl ml-4"
            >
              &times;
            </button>
          </div>
          <div className="flex justify-between"></div>
          <label htmlFor="note" className="flex flex-col">
            Note:
            <input
              type="text"
              id="note"
              value={newNoteContent}
              onChange={handleChange}
            />
          </label>
          <div className="flex justify-between">
            <button type="submit" className="bg-green-800 p-1 rounded-md">
              Save Note
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-800 p-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
