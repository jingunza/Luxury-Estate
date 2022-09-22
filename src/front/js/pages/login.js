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
    if (store.isLoggedIn) {
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
        <h1>You are already logged in</h1>
      ) : (
        <div className="container text-center">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 my-5 pb-5">
              <div className="card text-bg-secondary mb-5 pb-5">
                <div className="card-body">
                  <h5 className="card-title text-black fw-bold pb-2 border-bottom">
                    Login
                  </h5>
                  <p className="card-text">Welcome back!</p>
                </div>
                <ul className="list-group list-group-flush">
                  <input
                    className="list-group-item w-100"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <input
                    className="list-group-item w-100"
                    required
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </ul>
                <div className="card-body d-flex justify-content-around">
                  <a
                    href="#"
                    className="btn btn-primary ms-5"
                    onClick={handleSubmit}
                  >
                    Login
                  </a>
                  <Link to={"/"}>
                    {" "}
                    <a href="#" className="btn btn-info me-5">
                      {" "}
                      Home{" "}
                    </a>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
