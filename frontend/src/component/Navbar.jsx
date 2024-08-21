import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../constants";
import Nav_user_admin_links from "./Nav_user_admin_links";

const Navbar = () => {
  const data = useSelector((state) => state.userCredentials);
  const cart = useSelector((state) => state.cart);
  return (
    <div class="nav">
      <Link to="/">
        <div class="nav__brand">
          <img
            src={`${BASE_URL}img/vecteezy_good-logo-and-icon-template_6800468.jpg`}
            alt="brand logo"
            class="nav__logo"
          />
        </div>
      </Link>
      <ul class="nav__list--1">
        <NavLink to="/">
          <li class="nav__items">products</li>
        </NavLink>
        <NavLink to="profiles">
          <li class="nav__items">profiles</li>
        </NavLink>
        <NavLink to="posts">
          <li class="nav__items">posts</li>
        </NavLink>
      </ul>
      <Nav_user_admin_links user={data.user} cart={cart} />
    </div>
  );
};

export default Navbar;
