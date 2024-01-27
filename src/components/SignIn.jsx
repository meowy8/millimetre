import GoogleButton from "react-google-button"

const SignIn = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl m-10">Sign In</h1>
      <div>
        <GoogleButton />
      </div>
    </div>
  )
}

export default SignIn