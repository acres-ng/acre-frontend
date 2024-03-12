import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex flex-col pt-8 md:mx-40">
      <span className="sr-only">Acre </span>

      <Link to="/">
        <img src={logo} alt="acre logo" className="h-10 w-auto" />
      </Link>
    </nav>
  );
};

export default Navbar;
