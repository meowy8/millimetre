import { useState } from "react"
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { app } from "../firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const UserCreate = () => {

  const { user } = UserAuth()

  const [ username, setUsername ] = useState('')
  const [ fileToUpload, setFileToUpload ] = useState()
  const [ previewImage, setPreviewImage ] = useState('')
  const [ profileImg, setProfileImg ] = useState(null)

  const db = getFirestore(app)
  const storage = getStorage()
  const navigate = useNavigate()

  const handleChange = (e) => { 
    setUsername(e.target.value)
  }

  const sendData = async (e) => {
    e.preventDefault()
    uploadFile() //make sure image is uploaded before setting data
    if (username.length > 0 && profileImg) {
      try {
        await setDoc(doc(db, 'users', username), {
          username: username,
          profileImg: profileImg
        }).then(() => {
          setUsername('')
          console.log('data sent')
          navigate(`/${username}`)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    setFileToUpload(file)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }
  
  const uploadFile = async () => {
    const mediaStorRef = ref(storage, 'media/' + user.uid)
    await uploadBytes(mediaStorRef, fileToUpload).then(() => console.log('uploaded'))
    await getDownloadURL(mediaStorRef).then(url => setProfileImg(url))
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <h1 className="text-xl">Create your Account</h1>
      <form action="submit" onSubmit={(e) => sendData(e)} className="flex flex-col justify-center items-center gap-4">
        <label htmlFor="profile-img">
          Select Profile Image
          <div className="w-full flex flex-col items-center gap-4">
            <input type="file" onChange={handleFile} />
            <div className="flex bg-red-400 w-32 h-32 rounded-full overflow-hidden">
              <img src={previewImage} alt="" className=" w-full "/>
            </div>
          </div>
        </label>
        <label htmlFor="username">
          Username:
          <input type="text" value={username} onChange={(e) => handleChange(e)}/>
        </label>
        <button type="submit" className="bg-red-300">Create Account</button>
      </form>
    </div>
  )
}

export default UserCreate