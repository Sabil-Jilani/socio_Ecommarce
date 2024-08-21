import React from "react";
import { Link } from "react-router-dom";
import { useGetProfilesQuery } from "../api_slices/profileApiSlice";
import { BASE_URL } from "../constants";

const ProfileScreen = () => {
  const { data, isLoading, error } = useGetProfilesQuery();

  return (
    <section className="profile">
      <div className="profile__box pb-y-md">
        <form className="serch__box">
          <div className="serch__group">
            <input
              type="text"
              name=""
              id="secrch"
              className="serch__input"
              placeholder="serch with atleast 3 letters"
            />
            <label for="serch" className="serch__label">
              serch with atleast 3 letters
            </label>
          </div>

          <button type="submit" className="serch__button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <h3 className="profile__heading">people you may know</h3>
      {isLoading ? (
        <h1>Loading.............</h1>
      ) : error ? (
        <h3>{error?.data?.message || error?.message}</h3>
      ) : (
        data.map((x) => (
          <div className="profile__box" key={x._id}>
            <div className="profile__photo">
              <img
                src={`${BASE_URL}img/${x.profilePic}`}
                alt={`${x.user}`}
                className="profile__photo--box absolute-center"
              />
            </div>
            <div className="profile__main">
              <div className="profile__name">{x.user.name}</div>
              <div className="profile__location">{x.loaction}</div>
              <Link
                to={`/profile/${x.user._id}`}
                className="btn-1"
                style={{ "margin-top": "2rem", "margin-left": "-.7rem" }}
              >
                see profile
              </Link>
            </div>
            <ul className="profile__hobbies">
              {x.products.map((y, index) => (
                <li className="profile__hobbies--list" key={index}>
                  <i className="fa-solid fa-check"></i>
                  {y}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
};

export default ProfileScreen;
