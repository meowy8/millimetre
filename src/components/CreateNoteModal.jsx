const CreateNoteModal = ({
  sendAllNoteData,
  noteContent,
  setNoteContent,
  filmTitle,
  closeModal
}) => {
  const texturePath = "/texture.svg";

  const handleChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (noteContent) {
      sendAllNoteData();
    }
  };

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
              Create Note for <span className=" text-gray-400">{filmTitle}</span>
            </h1>
            <button type="button" onClick={closeModal} className="text-3xl ml-4">
              &times;
            </button>
          </div>
          <div className="flex justify-between"></div>
          <label htmlFor="note" className="flex flex-col">
            Note:
            <input type="text" id="note" onChange={handleChange} />
          </label>
          <button type="submit">Save Note</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
