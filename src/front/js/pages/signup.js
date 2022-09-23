import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import swal from "sweetalert";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (password.length < 8) {
      swal("La contraseña debe tener al menos 8 caracteres");
      return false;
    } else if (password !== confirmPassword) {
      swal("Las contraseñas no coinciden");
      return false;
    } else if (!username || !email || !fullName) {
      swal("Debe rellenar todos los campos");
      return false;
    }
    await actions.signup(username, password, fullName, email);
    await actions.login(username, password);
    const user = JSON.parse(localStorage.getItem("user_info"));
    navigate(`/user/${user.id}`);
  };
  return (
    <div className="container text-center">
      <div className="row justify-content-center mt-5">
        <div className="col-sm-8 col-lg-6 mt-5 mb-5 pb-5">
          <div className="card w-100 text-bg-secondary mb-5 pb-5">
            <div className="card-body">
              <h5 className="card-title">Signup</h5>
              <p className="card-text pt-2">
                Join us now and start exploring our listings
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <input
                className="list-group-item w-100"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                className="list-group-item w-100"
                value={email}
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </ul>
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
                value={password}
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                className="list-group-item w-100"
                value={confirmPassword}
                required
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </ul>
            <div className="card-body d-flex justify-content-around">
              <a href="#" className="btn btn-primary" onClick={handleSubmit}>
                Signup
              </a>
              <Link to={"/"}>
                {" "}
                <a href="#" className="btn btn-info">
                  {" "}
                  Home{" "}
                </a>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
