import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user_info"))
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleClick = () => {
    actions.clearLocalStorageNoUser();
    actions.resetStoreVariables();
  };

  return (
    <nav className="navbar" style={{ background: "RGB(18,57,98)" }}>
      <div className="container">
        <Link to="/" className="text-decoration-none">
          <span onClick={handleClick} className="mb-0">
            <span className="logo1 display-6 fw-bolder">LUXURY</span>{" "}
            <span className="logo2 display-6 fw-bolder">ESTATE</span>
          </span>
        </Link>

        {store.token ? (
          <div className="d-flex">
            <Link to={`/user/${userInfo.id}`}>
              {JSON.parse(localStorage.getItem("user_info")).imagen_perfil ? (
                <img
                  src={
                    JSON.parse(localStorage.getItem("user_info")).imagen_perfil
                  }
                  className="img-fluid"
                  style={{
                    width: "60px",
                    height: "60px",
                    top: "3rem",
                    border: "solid 5px black",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={process.env.DEFAULT_PROFILE_PIC}
                  className="img-fluid"
                  style={{
                    width: "60px",
                    height: "60px",
                    top: "3rem",
                    border: "solid 5px black",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Link>
            <ul className="dropdown ps-0">
              <a
                className="nav-link dropdown-toggle text-decoration-none text-white pt-3 ps-1"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>
              <ul className="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        ) : (
          <div className="ms-auto">
            <Link to="/login">
              <a href="#" className="btn btn-primary">
                Login
              </a>
            </Link>
            <Link to="/signup">
              <a href="#" className="btn btn-outline-primary">
                Signup
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
