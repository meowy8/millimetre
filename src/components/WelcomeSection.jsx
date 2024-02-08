const WelcomeSection = () => {
  return (
    <div className="p-4 text-md light-font">
      <p className="flex flex-col gap-4">
        <span className="text-2xl">
          Welcome to <span className="main-title">MILLIMETRE</span>,
        </span>
        <span className=" leading-8 text-lg">
          A place where you can start your journey into experimental cinema!
          Check out the catalogue of films and sign up to start adding films to
          your watched list and create notes to add your thoughts.
        </span>
        <span className="text-lg">Here&apos;s some films to get you started...</span>
      </p>
    </div>
  );
};

export default WelcomeSection;
