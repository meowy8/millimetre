import { useState } from "react";

const CreateNoteModal = ({
  sendAllNoteData,
  noteContent,
  setNoteContent,
  filmTitle,
  closeModal,
}) => {
  const texturePath = "/texture.svg";
  const [errorDisplay, setErrorDisplay] = useState(false)

  const handleChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (noteContent.length > 0) {
      sendAllNoteData();
    } else {
      setErrorDisplay(true)
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur bg-black ">
      <div className="bg-[#000000] p-2 shadow-xl shadow-black rounded-sm border border-yellow-50 w-4/5 max-w-[500px]">
        <div
          style={{ backgroundImage: `url(${texturePath})` }}
          className="bg-gray-950 p-8 rounded-sm flex justify-center"
        >
          <form
            action="submit"
            className="flex flex-col gap-4 max-w-96"
            onSubmit={(e) => handleSave(e)}
          >
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-lg">
                Create Note for{" "}
                <span className=" text-gray-400">{filmTitle}</span>
              </h1>
              <button type="button" onClick={closeModal} className="text-3xl">
                &times;
              </button>
            </div>
            {errorDisplay && <span className="text-red-500">A note can&apos;t be empty</span>}
            <label htmlFor="note" className="flex flex-col">
              Note:
              <textarea
                type="text"
                id="note"
                value={noteContent}
                onChange={handleChange}
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 rounded-md bg-green-900 hover:bg-green-800 w-3/6"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
