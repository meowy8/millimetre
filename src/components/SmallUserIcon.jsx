import { Link } from "react-router-dom";

const SmallUserIcon = ({ username, profileImg }) => {
  return (
    <Link to={`/user/${username}`}>
      <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center">
        <img
          src={profileImg}
          alt=""
          className="flex w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default SmallUserIcon;
