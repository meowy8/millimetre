const AddToFavouritesButton = ({
  favourited,
  sendFavouritesData,
  deleteFavouritesData,
  favSlotsFull,
}) => {
  return (
    <div className="mt-4">
      {favourited ? (
        <button onClick={deleteFavouritesData}>Remove from Favourites</button>
      ) : !favSlotsFull ? (
        <button onClick={sendFavouritesData}>Add to Favourites</button>
      ) : (
        <span className="text-sm">Your favourites slots are full!</span>
      )}
    </div>
  );
};

export default AddToFavouritesButton;
