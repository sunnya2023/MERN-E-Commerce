import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <div className="container nav__container">
        <div className="logo">
          <img src={assets.logo} alt="logo" />
        </div>

        <ul className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-nav" : "")}
          >
            Contact
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
