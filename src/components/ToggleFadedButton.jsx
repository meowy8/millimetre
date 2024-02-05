const ToggleFadedButton = ({ togglefaded, handleToggleChange, user }) => {
  return (
    <div>
      {user && (
        <div className="text-sm">
          {togglefaded ? (
            <button onClick={handleToggleChange}>Unfade Watched</button>
          ) : (
            <button onClick={handleToggleChange}>Fade Watched</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ToggleFadedButton;
