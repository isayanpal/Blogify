import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="my-[1rem] flex sm:flex-row flex-col justify-between items-center">
      <Link to={"/"} className="text-2xl text-gray-400 font-semibold">
        Blogify
      </Link>
      <div className="text-gray-400 text-12">All rights reserved.</div>
    </div>
  );
};

export default Footer;
