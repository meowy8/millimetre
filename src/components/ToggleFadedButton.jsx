const ToggleFadedButton = ({ togglefaded, handleToggleChange }) => {
  return (
    <div className="text-sm">
      {togglefaded ? (
        <button onClick={handleToggleChange}>Unfade Watched</button>
      ) : (
        <button onClick={handleToggleChange}>Fade Watched</button>
      )}
    </div>
  );
};

export default ToggleFadedButton;
