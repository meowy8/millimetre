import { useEffect, useState } from "react";
import SmallUserIcon from "./SmallUserIcon";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      const usersListQuery = query(collection(db, "users"));
      const querySnap = await getDocs(usersListQuery);
      const fetchedUserData = querySnap.docs.map((user) => ({
        profileImg: user.data().profileImg,
        username: user.data().username,
        id: user.id,
      }));

      setUserData(fetchedUserData);
    };

    fetchUserList();
  }, []);

  //console.log(userData)
  return (
    <div className="flex flex-col w-4/5 gap-4 bg-[#1d0e2f] m-10 p-4 rounded-md border border-black md:w-3/5 lg:w-3/6">
      <h1 className="text-lg">List of Users</h1>
      <div className="flex flex-wrap gap-1 justify-center bg-black/70 p-4 rounded-lg">
        {userData.map((user) => {
          return (
            <SmallUserIcon
              key={user.id}
              username={user.username}
              profileImg={user.profileImg}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
