const LargeFilmIcon = ({ posterUrl }) => {
  return (
    <div className=" w-48 overflow-hidden rounded-sm ">
      <img src={posterUrl} alt="" className="w-full" />
    </div>
  );
};

export default LargeFilmIcon;
