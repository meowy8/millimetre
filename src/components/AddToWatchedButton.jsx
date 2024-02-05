const AddToWatchedButton = ({
  watched,
  deleteWatchedData,
  sendWatchedData,
}) => {
  return (
    <>
      {watched ? (
        <button onClick={deleteWatchedData} className="bg-green-900">
          Watched
        </button>
      ) : (
        <button className="bg-slate-900" onClick={sendWatchedData}>
          Add to Watched
        </button>
      )}
    </>
  );
};

export default AddToWatchedButton;
