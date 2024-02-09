const AddToWatchedButton = ({
  watched,
  deleteWatchedData,
  sendWatchedData,
}) => {
  return (
    <div className="flex justify-center mt-8 md:justify-start">
      {watched ? (
        <button onClick={deleteWatchedData} className="bg-green-900 w-3/5 rounded-sm hover:text-green-900 hover:bg-yellow-50 md:w-3/6 lg:w-2/6">
          Watched
        </button>
      ) : (
        <button className="bg-slate-900 w-3/5 rounded-sm hover:text-slate-900 hover:bg-yellow-50 md:w-3/6 lg:w-2/6" onClick={sendWatchedData}>
          Add to Watched
        </button>
      )}
    </div>
  );
};

export default AddToWatchedButton;
