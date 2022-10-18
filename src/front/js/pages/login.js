import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert";

export const Login = (props) => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await actions.login(username, password);
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      const user = JSON.parse(localStorage.getItem("user_info"));
      navigate(`/user/${user.id}`);
    } else {
      swal("Contraseña y/o Usuario incorrecto");
      setPassword("");
    }
  };
  return (
    <>
      {store.token ? (
        navigate("/")
      ) : (
        <div className="container text-center">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 my-5 pb-5">
              <div className="card text-bg-secondary mb-5 pb-5">
                <div className="card-body">
                  <h5 className="card-title fw-bolder fs-2 pb-2">Login</h5>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <input
                    className="w-75 my-2 border-0 py-2 rounded ps-3"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <input
                    className="w-75 my-2 border-0 py-2 rounded ps-3"
                    required
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="card-body d-flex justify-content-around">
                  <a
                    href="#"
                    className="btn btn-primary ms-5"
                    onClick={handleSubmit}
                  >
                    Login
                  </a>
                  <a href="/" className="btn btn-info me-5">
                    {" "}
                    Home{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
