import React, { useState } from "react";
import "../styles/header.scss";

import { Link } from "react-router-dom";
import logoIcon from "../assets/main-logo.png";
import { HashLink } from "react-router-hash-link";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="header">
      <Link to={"/"} className="site-logo">
        <img src={logoIcon} alt="Coinomatic" />
        <h1>Coinomatic</h1>
      </Link>
      <menu>
        <HashLink to={"/#home"}>Home</HashLink>
        <Link to={"/exchanges"}>Exchanges</Link>
        <Link to={"/coins"}>Coins</Link>
        <HashLink to={"/#aboutUs"}>About Us</HashLink>
        <HashLink to={"/#contactUs"}>Contact Us</HashLink>
      </menu>
      <div className="mobilemenu">
        <button id="togglebtn" onClick={toggleMenu}>
          {menuOpen ? <IoCloseCircleOutline /> : <CiMenuKebab />}
        </button>
        <div
          id="mobile-menu"
          className="menu"
          style={{ display: menuOpen ? "flex" : "none" }}
        >
          <HashLink to={"/#home"}>Home</HashLink>
          <Link to={"/exchanges"}>Exchanges</Link>
          <Link to={"/coins"}>Coins</Link>
          <HashLink to={"/#aboutUs"}>About Us</HashLink>
          <HashLink to={"/#contactUs"}>Contact Us</HashLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
