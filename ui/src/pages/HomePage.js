import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center text-red-700 text-3xl mb-9">HomePage</div>
      <div className="text-center text-xl mb-9">
        Don't have NewMedia account? Please click!
        <Link to="/register">Sign-Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
