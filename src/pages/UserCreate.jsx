import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

const UserCreate = () => {
  const { user, userAccount } = UserAuth();

  const [username, setUsername] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  if (userAccount) {
    return <Navigate to={"/"} />;
  }

  if (!user) {
    return <Navigate to={"/signin"} />;
  }

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    uploadFile(); //make sure image is uploaded before setting data
    if (username.length > 0 && profileImg) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          profileImg: profileImg,
        }).then(() => {
          setUsername("");
          console.log("main data sent");
          navigate(`/users/${username}`);
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
    await uploadBytes(mediaStorRef, fileToUpload).then(() =>
      console.log("uploaded")
    );
    await getDownloadURL(mediaStorRef).then((url) => setProfileImg(url));
  };

  return (
    <div className=" bg-[#150921] p-2 md:m-10 w-full md:h-full md:w-3/5">
      <div className="">
        <h1 className="text-xl">Create your Account</h1>
        <form
          action="submit"
          onSubmit={(e) => sendData(e)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <label htmlFor="profile-img">
            Select Profile Image
            <div className="w-full flex flex-col items-center gap-4">
              <input type="file" id="profile-img" onChange={handleFile} />
              <div className="flex bg-red-400 w-32 h-32 rounded-full overflow-hidden">
                <img src={previewImage} alt="" className=" w-full " />
              </div>
            </div>
          </label>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              value={username}
              id="username"
              onChange={(e) => handleChange(e)}
              className="m-2"
            />
          </label>
          <button type="submit" className="p-2 rounded-md bg-green-900 hover:bg-green-800">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
