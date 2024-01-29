import GoogleButton from "react-google-button"
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SignIn = () => {
  const { googleSignIn, user } = UserAuth()

  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    user && navigate('/usercreate')
  }, [user, navigate])
 
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl m-10">Sign In</h1>
      <div>
        <GoogleButton onClick={handleGoogleSignIn}/>
      </div>
    </div>
  )
}

export default SignIn