import { useEffect, useState } from "react";

const EditNoteModal = ({
  updateAllNoteData,
  noteContent,
  newNoteContent,
  setNewNoteContent,
  closeModal,
  filmTitle,
  deleteNoteData,
}) => {
  const [errorDisplay, setErrorDisplay] = useState(false);

  const texturePath = "/texture.svg";

  useEffect(
    () => setNewNoteContent(noteContent),
    [noteContent, setNewNoteContent]
  );

  const handleChange = (e) => {
    setNewNoteContent(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (newNoteContent) {
      updateAllNoteData();
    } else {
      setErrorDisplay(true);
    }
  };

  const handleDelete = () => {
    deleteNoteData();
  };

  useEffect(() => {
    console.log(newNoteContent);
  }, [newNoteContent]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur bg-black">
      <div className="bg-[#000000] p-2 shadow-xl shadow-black rounded-sm border border-yellow-50 w-4/5 max-w-[500px]">
        <div
          style={{ backgroundImage: `url(${texturePath})` }}
          className="bg-gray-950 p-8 rounded-sm flex justify-center"
        >
          <form
            action="submit"
            className="flex flex-col gap-4 max-w-96 w-full"
            onSubmit={(e) => handleSave(e)}
          >
            <div className="flex justify-between">
              <h1 className="text-lg">
                Edit Note for{" "}
                <span className=" text-gray-400">{filmTitle}</span>
              </h1>
              <button
                type="button"
                onClick={closeModal}
                className="text-3xl ml-4"
              >
                &times;
              </button>
            </div>
            {errorDisplay && (
              <span className="text-red-500">A note can&apos;t be empty</span>
            )}
            <label htmlFor="note" className="flex flex-col mb-4">
              Note:
              <textarea
                type="text"
                id="note"
                value={newNoteContent}
                onChange={handleChange}
                className="text-black p-1 rounded-sm"
              />
            </label>
            <div className="flex justify-between">
              <button
                type="submit"
                className="p-2 rounded-md bg-green-900 hover:bg-green-800 w-2/6"
              >
                Save Note
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-900/90 hover:bg-red-900 p-1 rounded-md w-1/6"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
