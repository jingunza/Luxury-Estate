import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const infoFromStorage = JSON.parse(localStorage.getItem("user_info"));
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState(infoFromStorage.full_name);
  const [email, setEmail] = useState(infoFromStorage.email);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (changePassword && password.length < 8) {
      swal("La contraseña debe tener al menos 8 caracteres");
    } else if (changePassword && password !== confirmPassword) {
      swal("Las contraseñas no coinciden");
      return false;
    } else if (!email || !fullName) {
      swal("Debe rellenar todos los campos");
      return false;
    }
    if (
      fullName !== localStorage.getItem("full_name") ||
      email !== localStorage.getItem("email") ||
      password ||
      store.selectedImages.length > 0
    ) {
      if (store.selectedImages.length != 0) {
        await actions.uploadProfilePicToCloudinary();
      }
      const fotoUrl = JSON.parse(localStorage.getItem("pub_userpic_url"));
      console.log(fotoUrl);
      const resp = await actions.updateUser(fullName, email, password, fotoUrl);
      if (resp.message == "Nothing to update") {
        swal("nada que actualizar");
        setPassword("");
      } else if (resp.message == "Updated user succesfully") {
        swal("Datos actualizados");
        actions.clearSelectedImages();
        setChangePassword(false);
        setPassword("");
      }
    } else {
      swal("nada que actualizar");
      setPassword("");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {localStorage.getItem("token") ? (
        <div className="card text-bg-secondary mb-5 w-sm-50">
          <div className="card-body text-center">
            <h5 className="card-title fw-bold text-black">Cambia tus datos</h5>
          </div>

          <div className="d-flex flex-column align-items-center">
            <input
              className="w-75 my-2"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              className="w-75 my-2"
              value={email}
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="fotos_input mx-3 mb-2 mt-2">
            <label for="formFile" className="form-label pb-2">
              Subir foto de perfil
            </label>
            <input
              className="form-control w-100"
              id="formFile"
              multiple
              type="file"
              onChange={actions.uploadImagesToStore}
            />
          </div>
          {changePassword ? (
            <div className="password-box">
              <input
                className="w-75 my-2"
                value={password}
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva Contraseña"
              />
              <input
                className="w-50 my-2"
                value={confirmPassword}
                required
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu Contraseña"
              />
            </div>
          ) : (
            <a
              href="#"
              className="card-link "
              onClick={() => setChangePassword(true)}
            >
              ¿Cambiar Contraseña?
            </a>
          )}
          {deleteUser ? (
            <a
              href="#"
              className="card-link btn btn-outline-danger mt-1"
              onClick={actions.deleteUser}
            >
              Sí, deseo eliminar mi cuenta
            </a>
          ) : (
            <a
              href="#"
              className="card-link mt-1"
              onClick={() => setDeleteUser(true)}
            >
              ¿Eliminar cuenta?
            </a>
          )}
          <div className="card-body text-center">
            <a href="#" className="btn btn-info" onClick={handleSubmit}>
              Save
            </a>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "100vh" }}
        >
          <h5>Unauthorized...</h5>
        </div>
      )}
    </div>
  );
};
