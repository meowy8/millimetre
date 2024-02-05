const AddToFavouritesButton = ({
  favourited,
  sendFavouritesData,
  deleteFavouritesData,
  favSlotsFull,
}) => {
  return (
    <div>
      {favourited ? (
        <button onClick={deleteFavouritesData}>Remove from Favourites</button>
      ) : (
        !favSlotsFull && (
          <button onClick={sendFavouritesData}>Add to Favourites</button>
        )
      )}
    </div>
  );
};

export default AddToFavouritesButton;
