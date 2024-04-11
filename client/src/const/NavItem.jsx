import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ item }) => {
  return (
    <Link
      to={item.path}
      className="hover:text-[color:var(--accent)] hover:font-semibold"
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
