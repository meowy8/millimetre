import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Notes = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default Notes;
