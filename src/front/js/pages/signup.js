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
              <h5 className="card-title fw-bolder fs-2">Signup</h5>
              <p className="card-text pt-2 fs-4">
                Únete y anuncia con nosotros.
              </p>
            </div>
            <ul className="list-group list-group-flush d-flex flex-column align-items-center">
              <input
                className="list-group-item w-75 my-2"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre y Apellidos"
              />
              <input
                className="list-group-item w-75 my-2"
                value={email}
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <input
                className="list-group-item w-75 my-2"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de Usuario"
              />
              <input
                className="list-group-item w-75 my-2"
                value={password}
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
              <input
                className="list-group-item w-75 my-2"
                value={confirmPassword}
                required
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma Contraseña"
              />
              <div className="card-body d-flex justify-content-around">
                <a
                  href="#"
                  className="btn btn-primary me-5"
                  onClick={handleSubmit}
                >
                  Inscríbete
                </a>
                <a href="/" className="btn btn-info ms-5">
                  {" "}
                  Inicio{" "}
                </a>{" "}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
