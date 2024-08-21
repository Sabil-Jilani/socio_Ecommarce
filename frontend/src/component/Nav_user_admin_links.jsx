import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { globalContext } from "../App";
import { useLogoutApiMutation } from "../api_slices/authApiSlice";
import { logout } from "../api_slices/authSlices";
import { OPEN_LOGIN_MODAL, OPEN_REGISTER_MODAL } from "../constants";
import { ToastSuccess } from "./Toast";

const Nav_user_admin_links = ({ user, cart }) => {
  const Usedispatch = useDispatch();
  const [logoutApi] = useLogoutApiMutation();
  const { dispatch } = useContext(globalContext);
  const onLogout = async (e) => {
    try {
      const response = await logoutApi().unwrap();
      Usedispatch(logout());
      ToastSuccess(response.message);
    } catch (error) {
      console.log(error);
    }
  };
  const showLogInModal = () => {
    return dispatch({ type: OPEN_LOGIN_MODAL });
  };

  return (
    <ul class="nav__list--2">
      {user ? (
        user.isAdmin ? (
          <>
            <NavLink to="cart">
              <li class="nav__items relative">
                {cart.cartItems.length > 0 && (
                  <span className="nav__cart">{cart.cartItems.length}</span>
                )}
                cart
              </li>
            </NavLink>
            <NavLink to="profile">
              <li class="nav__items">profile</li>
            </NavLink>
            <div className="dropdown__list">
              <li className="nav__items  ">Admin</li>
              <div className="dropdown__content">
                <NavLink to="products">
                  <li className="nav__items">Products</li>
                </NavLink>
                <NavLink to="orders">
                  <li className="nav__items">Orders</li>
                </NavLink>
                <NavLink to="users">
                  <li className="nav__items">Users</li>
                </NavLink>
              </div>
            </div>

            <li class="nav__items" onClick={onLogout}>
              logout
            </li>
          </>
        ) : (
          <>
            {" "}
            <NavLink to="cart">
              <li class="nav__items reative">
                {" "}
                {cart.cartItems.length > 0 && (
                  <span className="nav__cart">{cart.cartItems.length}</span>
                )}
                cart
              </li>
            </NavLink>
            <NavLink to="profile">
              <li class="nav__items">profile</li>
            </NavLink>{" "}
            <li class="nav__items" onClick={onLogout}>
              logout
            </li>
          </>
        )
      ) : (
        <>
          <NavLink to="cart">
            <li class="nav__items relative">
              {cart.cartItems.length > 0 && (
                <span className="nav__cart">{cart.cartItems.length}</span>
              )}
              cart
            </li>
          </NavLink>
          <li class="nav__items" onClick={showLogInModal}>
            logIn
          </li>
          <li
            class="nav__items"
            onClick={() => dispatch({ type: OPEN_REGISTER_MODAL })}
          >
            register
          </li>
        </>
      )}
    </ul>
  );
};

export default Nav_user_admin_links;
