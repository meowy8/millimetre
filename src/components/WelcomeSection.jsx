import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="p-4 text-md light-font">
      <p className="flex flex-col gap-4">
        <span className="text-2xl">
          Welcome to <span className="main-title text-3xl">MILLIMETRE</span>,
        </span>
        <span className=" leading-8 text-lg">
          A place where you can start your journey into experimental cinema!
          Check out the <Link to={'/catalogue'} className="underline hover:no-underline">catalogue</Link> of films and sign up to start adding films to
          your watched list and create notes to add your thoughts.
        </span>
        <span className="text-lg mt-4">Here&apos;s some films to get you started...</span>
      </p>
    </div>
  );
};

export default WelcomeSection;
