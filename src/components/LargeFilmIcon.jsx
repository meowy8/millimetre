const LargeFilmIcon = ({ posterUrl }) => {
  return (
    <div className=" w-48 overflow-hidden rounded-sm shadow-xl shadow-gray-900">
      <img src={posterUrl} alt="" className="w-full " />
    </div>
  );
};

export default LargeFilmIcon;
