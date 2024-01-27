const Home = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl m-10">Home</h1>
      <div id="films-container" className="bg-black w-96 h-96 grid grid-cols-2 p-4 items-center">
        <div className="bg-white w-24 h-32">
          <img src="" alt="" />
        </div>
        <div className="bg-white w-24 h-32">
          <img src="" alt="" />
        </div>
        <div className="bg-white w-24 h-32">
          <img src="" alt="" />
        </div>
        <div className="bg-white w-24 h-32">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home