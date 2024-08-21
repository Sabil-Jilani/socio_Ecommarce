import moment from "moment";
import React from "react";

const Footer = () => {
  var year = moment(Date.now()).format("YYYY");
  return (
    <footer className="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h3 className="footer-head">About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam
            purus sit amet luctus maximus.
          </p>
          <ul class="socials">
            <li className="nav__items">
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li className="nav__items">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li className="nav__items m-yb-sm">
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-section links">
          <h3 className="footer-head">Quick Links</h3>
          <ul className="footer--list">
            <li className="nav__items">
              <a href="#">Home</a>
            </li>
            <li className="nav__items">
              <a href="#">About</a>
            </li>
            <li className="nav__items">
              <a href="#">Services</a>
            </li>
            <li className="nav__items">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div class="footer-section contact-form">
          <h3 className="footer-head">Contact Us</h3>
          <form
            action="https://formsubmit.io/send/jilanesk7@gmail.com"
            method="POST"
          >
            {/* <input
              name="_redirect"
              type="hidden"
              id="name"
              value="http://localhost:8000"
            ></input> */}
            <div class="form__group w-100">
              <input
                type="email"
                class="form__input "
                placeholder="Email"
                required
                id="email"
              />
              <label for="email" class="form__label">
                Email
              </label>
            </div>

            <div class="form__group w-100">
              <textarea
                name="password"
                type="text"
                minlength="4"
                rows="2"
                cols="40"
                placeholder="reach us"
                class="form__input"
                required
                id="password"
              />
              <label for="passward" class="form__label">
                reach us
              </label>
            </div>
            <button type="submit" class="btn-1">
              submit
            </button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; {year} SocioEcommerce. All rights reserved. | Designed by{" "}
        <a
          href="https://facebook.com/sheikh.jilane.1"
          target="new"
          className="jilani"
        >
          Sheikh Jilani
        </a>
      </div>
    </footer>
  );
};

export default Footer;
