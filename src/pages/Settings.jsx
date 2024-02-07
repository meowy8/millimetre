import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

const Settings = () => {
  const { user, userAccount } = UserAuth();

  const [username, setUsername] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [bio, setBio] = useState("");

  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  useEffect(() => {
    setPreviewImage(userAccount?.profileImg);
    setProfileImg(userAccount?.profileImg);
  }, [userAccount]);

  useEffect(() => {
    setUsername(userAccount?.username);
  }, [userAccount]);

  useEffect(() => {
    setBio(userAccount?.bio);
  }, [userAccount]);

  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (previewImage !== userAccount.profileImg) {
      uploadFile(); //make sure image is uploaded before setting data
    }
    if (username.length > 0 && profileImg) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          profileImg: profileImg,
          bio: bio,
        }).then(() => {
          setUsername("");
          console.log("main data sent");
          navigate(`/user/${username}`);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileToUpload(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async () => {
    const mediaStorRef = ref(storage, "media/" + user.uid);
    await deleteObject(mediaStorRef).then(() =>
      console.log("file deleted successdully"),
    );
    await uploadBytes(mediaStorRef, fileToUpload).then(() =>
      console.log("uploaded"),
    );
    await getDownloadURL(mediaStorRef).then((url) => setProfileImg(url));
  };



  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <h1 className="text-xl">Settings</h1>
      <form
        action="submit"
        onSubmit={(e) => sendData(e)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <label htmlFor="profile-img">
          Change Profile Image
          <div className="w-full flex flex-col items-center gap-4">
            <input type="file" onChange={handleFile} />
            <div className="flex bg-red-400 w-32 h-32 rounded-full overflow-hidden">
              <img src={previewImage} alt="" className=" w-full " />
            </div>
          </div>
        </label>
        <label htmlFor="username">
          Change Username:
          <input
            type="text"
            value={username || ""}
            onChange={(e) => handleUsernameChange(e)}
          />
        </label>
        <label htmlFor="bio">
          Change Bio:
          <input
            type="text"
            name="bio"
            id="bio"
            value={bio || ""}
            onChange={(e) => handleBioChange(e)}
          />
        </label>
        <button type="submit" className="bg-red-300">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
