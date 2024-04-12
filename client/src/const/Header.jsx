import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons";
import NavItem from "./NavItem";

const Header = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Explore",
      path: "/explore",
    },
  ];
  return (
    <div className="mt-[1rem] flex flex-row justify-between items-center">
      <Link to={"/"} className="text-3xl text-[color:var(--accent)] font-bold">
        Blogify
      </Link>
      {/* //desktop */}

      <div className="sm:flex sm:flex-row sm:gap-[20px] sm:items-center hidden">
        {navLinks.map((link) => (
          <NavItem item={link} key={link.title} />
        ))}
        {isUserLoggedIn && (
          <>
            <NavItem item={{ title: "Create", path: "/create" }} />
          </>
        )}
      </div>
      <div className="sm:flex sm:items-center hidden">
        {isUserLoggedIn ? (
          <>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button>Log In</button>
            </Link>
          </>
        )}
      </div>

      {/* mobile */}
      <div
        className="cursor-pointer block sm:hidden"
        onClick={() => setOpen((prev) => !prev)}
      >
        <box-icon name="menu" color="#ffffff"></box-icon>
      </div>
      {open && (
        <div className="sm:hidden bg-[#3a31d8] flex flex-col absolute w-[50%] top-[50px] h-[200px] justify-center items-center gap-[10px] z-1 right-[1.5rem] rounded-2xl">
          {navLinks.map((link) => (
            <NavItem item={link} key={link.title} />
          ))}
          {isUserLoggedIn && (
            <>
              <NavItem item={{ title: "Create", path: "/create" }} />
            </>
          )}
          <div className="flex items-center sm:hidden">
            {isUserLoggedIn ? (
              <>
                <button onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button>Log In</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
