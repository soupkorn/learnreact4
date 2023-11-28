import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-14 w-full h-screen ">
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default Layout;
