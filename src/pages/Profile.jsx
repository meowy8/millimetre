import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import FavouriteFilmsDisplay from "../components/FavouriteFilmsDisplay";
import UserBio from "../components/UserBio";
import { UserAuth } from "../context/AuthContext";
import WatchedFilmsDisplay from "../components/WatchedFilmsDisplay";
import UserNotesMini from "../components/UserNotesMini";
import CreateNoteModal from "../components/CreateNoteModal";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  const { userId } = useParams();
  const { user } = UserAuth();

  // change to try catch
  useEffect(() => {
    const getUserData = async () => {
      const usersCollection = collection(db, "users");
      const usernameQuery = query(
        usersCollection,
        where("username", "==", userId),
      );
      const querySnapshot = await getDocs(usernameQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        setUserProfile(userDoc.data());
        setUserDocId(userDoc.id);

        //console.log('User found:', userDoc.data())
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  //useEffect(() => console.log(userProfile));

  return (
    <>
      {userProfile && (
        <div className="md:p-10 w-full h-full flex justify-center">
          <div className="bg-[#150921] p-2 rounded-md w-screen lg:w-[1000px] lg:min-h-[700px]  md:w-4/5">
            <div className="flex flex-col h-full rounded-md items-center gap-4 md:gap-4 lg:grid grid-cols-2 bg-black/50 md:p-4">
              <div className="flex flex-col items-center h-full w-full md:p-2 p-6">
                <div className="bg-red-400 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center m-4">
                  <img
                    src={userProfile.profileImg}
                    alt=""
                    className="flex w-full h-full object-cover"
                  />
                </div>
                {user?.uid === userDocId && (
                  <Link
                    to={"/settings"}
                    className="bg-green-900 hover:bg-green-800 p-2 rounded-full text-sm"
                  >
                    Edit Profile
                  </Link>
                )}
                <span id="username" className="text-lg m-4">
                  {userProfile.username}
                </span>
                <UserBio bio={userProfile.bio} />
              </div>
              <div className="h-full flex  md-lg:w-4/5">
                <FavouriteFilmsDisplay
                  username={userProfile.username}
                  userDataId={userDocId}
                />
              </div>
              <div className="lg:h-full md-lg:w-4/5">
                <WatchedFilmsDisplay
                  username={userProfile.username}
                  userDataId={userDocId}
                />
              </div>
              <div className="h-full w-full">
                <UserNotesMini
                  username={userProfile.username}
                  profileImg={userProfile.profileImg}
                  userDocId={userDocId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
