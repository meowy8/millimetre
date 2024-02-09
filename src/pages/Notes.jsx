import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Notes = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="p-4 w-full md:w-4/5 max-w-[700px]">
      <Outlet />
    </div>
  );
};

export default Notes;
