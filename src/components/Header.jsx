import React from "react";
import "../styles/header.scss";

import { Link } from "react-router-dom";
import logoIcon from "../assets/main-logo.png";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  return (
    <nav className="header">
      <Link to={"/"} className="site-logo">
        <img src={logoIcon} alt="Coinomatic" />
        <h1>Coinomatica</h1>
      </Link>
      <menu>
        <HashLink to={"/#home"}>Home</HashLink>
        <Link to={"/exchanges"}>Exchanges</Link>
        <Link to={"/coins"}>Coins</Link>
        <HashLink to={"/#aboutUs"}>About Us</HashLink>
        <HashLink to={"/#contactUs"}>Contact Us</HashLink>
      </menu>
    </nav>
  );
};

export default Header;
