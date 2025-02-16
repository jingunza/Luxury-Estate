import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import swal from "sweetalert";
import "../../styles/publicar.css";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../component/addressInput.js";
import casa2 from "../../img/vista.jpg";

export const Publicar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleClickAlt = async () => {
    await actions.createInmueblesBodyRequest();
    if (store.bodyPubCreated == "On") {
      navigate("/pasarela");
    }
  };

  const handleClick1 = async () => {
    actions.switchOnCharging();
    await actions.uploadImagesToCloudinary();
    actions.createInmueblesBodyRequest();

    // aqui comienza el fetch publicar:
    const request = store.inmueblesBodyRequest;
    let opts = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    };
    try {
      const resp = await fetch(process.env.BACKEND_URL + "/api/publicar", opts);
      if (resp.status != 200) {
        throw new Error("The fetch has failed");
      }
      const respAsJson = await resp.json();
      console.log("confirmacion de la publicación: ", respAsJson);
      actions.updateResponsePublicar(respAsJson);
    } catch (error) {
      console.log("The fetch has failed: ", error);
    }
    // aqui termina el fetch publicar
    if (store.response_publicar != "") {
      await swal("Felicitaciones!", store.response_publicar);
      await actions.switchOffCharging();
      await actions.resetStoreVariables();
      await actions.clearLocalStorageNoUser();
      navigate("/user/:id");
    } else {
      await swal(
        "error",
        "no es posible publicar el anuncio, verifica tus datos"
      );
      await actions.switchOffCharging();
      await actions.resetStoreVariables();
      await actions.clearLocalStorageNoUser();
    }
  };

  const handleClick2 = () => {
    actions.clearLocalStorageNoUser();
    actions.resetStoreVariables();
  };

  useEffect(() => {
    actions.resetStoreVariables();
    actions.clearLocalStorageNoUser();
  }, []);

  return (
    <div
      className="py-4 contenedor-casa2"
      style={{ backgroundImage: `url(${casa2})` }}
    >
      <div className="container col-7 ">
        {localStorage.getItem("token") ? (
          <div className="caja_publicar d-flex justify-content-center">
            <div className="container col-8 px-0 mt-0 w-100 w-md-50">
              <div
                className="container rounded-3 pb-4 pt-3 px-0 "
                style={{ background: "RGBA(233,236,239,0.7)" }}
              >
                <h3 className="text-center mt-3 mb-4 fw-bolder text-primary mx-3">
                  Tómate un minuto para construir tu anuncio
                </h3>

                <div className="caja_selectores container pt-0 pb-2 ">
                  <div className="container d-lg-flex justify-content-between ">
                    {/* ------------------------------ lado izquierdo ----------------------------------------------- */}
                    <div className="tipo_datos selector ms-1 mb-1 me-0 col-12 col-lg-5 ">
                      {/* operación */}
                      <div className="tipo_datos selector mb-3">
                        <div className="pb-2 text-start">
                          <span className="">Operación</span>
                        </div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            actions.updatePublicarOperacion(e);
                            e.target.value == "compra"
                              ? localStorage.setItem("pub_pet", false)
                              : localStorage.setItem(
                                  "pub_pet",
                                  store.caracteristica_pet
                                );
                            localStorage.setItem(
                              "pub_garage",
                              store.caracteristica_garage
                            );
                            localStorage.setItem(
                              "pub_piscina",
                              store.caracteristica_piscina
                            );
                            localStorage.setItem(
                              "pub_terraza",
                              store.caracteristica_terraza
                            );
                            localStorage.setItem("pub_premium", store.premium);
                          }}
                          value={store.operacion}
                        >
                          <option className="">{"<Elige la operación>"}</option>
                          <option className="">alquiler</option>otos
                          <option className="">compra</option>
                        </select>
                      </div>

                      {/* caracteristicas */}
                      <div className="pb-3 text-start">
                        <span className="">Características</span>
                      </div>

                      {store.operacion == "compra" ? (
                        ""
                      ) : (
                        <div className="form-check text-start">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={actions.updatePublicarCaracteristicaPet}
                            checked={store.caracteristica_pet}
                          />
                          <label className="form-check-label">
                            Admite mascotas
                          </label>
                        </div>
                      )}

                      <div className="form-check text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={actions.updatePublicarCaracteristicaGarage}
                          checked={store.caracteristica_garage}
                        />
                        <label className="form-check-label">Garage</label>
                      </div>
                      <div className="form-check text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={actions.updatePublicarCaracteristicaPiscina}
                          checked={store.caracteristica_piscina}
                        />
                        <label className="form-check-label">Piscina</label>
                      </div>
                      <div className="form-check text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={actions.updatePublicarCaracteristicaTerraza}
                          checked={store.caracteristica_terraza}
                        />
                        <label className="form-check-label">Terraza</label>
                      </div>

                      {/* habitaciones */}
                      <div className="selector me-0 my-3">
                        <div className="pb-2 text-start">
                          <span className="">Habitaciones</span>
                        </div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={actions.updatePublicarHabitaciones}
                          value={store.habitaciones}
                        >
                          <option className="">{"<elige cantidad>"}</option>
                          <option className="">1</option>
                          <option className="">2</option>
                          <option className="">3</option>
                          <option className="">4</option>
                          <option className="">5</option>
                          <option className="">6</option>
                          <option className="">7</option>
                          <option className="">8</option>
                          <option className="">9</option>
                        </select>
                      </div>

                      {/* baños */}
                      <div className="selector me-0 mb-3">
                        <div className="pb-2 text-start">
                          <span className="">Baños</span>
                        </div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={actions.updatePublicarBaños}
                          value={store.baños}
                        >
                          <option className="">{"<elige cantidad>"}</option>
                          <option className="">1</option>
                          <option className="">2</option>
                          <option className="">3</option>
                          <option className="">4</option>
                          <option className="">5</option>
                        </select>
                      </div>
                    </div>

                    {/* lado derecho*/}
                    <div className="tipo_datos mb-1 ms-1 me-1 col-12 col-lg-5 text-start">
                      {/* precio */}
                      <div className="tipo_datos mb-3 input-precio text-start">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label "
                        >
                          Precio (Euros)
                        </label>
                        <input
                          onChange={actions.updatePublicarPrecio}
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="<Escribe el precio>"
                          value={store.precio}
                        />
                      </div>

                      {/* tipo */}
                      <div className="selector me-0 mb-3">
                        <div className="text-start pb-2">
                          <span className="">Tipo de Vivienda</span>
                        </div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={actions.updatePublicarTipoVivienda}
                          value={store.tipo_vivienda}
                        >
                          <option className="">
                            {"<Elige el tipo de vivienda>"}
                          </option>
                          <option className="">Piso</option>
                          <option className="">Chalet</option>
                          <option className="">Villa</option>
                        </select>
                      </div>

                      {/* ------------------ switch premium ----------------- */}

                      <div className="mb-3  mx-3">
                        <div className="form-check form-switch text-start">
                          <input
                            onChange={actions.updatePublicarPremium}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={store.premium == true ? true : false}
                          />
                          <label
                            className="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            ¿Anuncio Premium?
                          </label>
                        </div>
                      </div>

                      {/* ------------------ descripcion ----------------- */}

                      <div className="mb-3 input-descripcion text-start">
                        <label
                          for="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Descripción de la propiedad
                        </label>
                        <textarea
                          onChange={actions.updatePublicarDescripcion}
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="6"
                          placeholder="<Describe aquí las características de la propiedad>"
                          value={store.descripcion}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <hr />

                  {/* --------------------------- fotos --------------------------------- */}
                  {store.selectedImages.length == 0 ? (
                    <div className="fotos_input mx-3 mb-4 text-start">
                      <label for="formFileMultiple" className="form-label pb-2">
                        Fotos de la propiedad
                      </label>
                      <input
                        className="form-control"
                        id="formFileMultiple"
                        multiple
                        type="file"
                        onChange={actions.uploadImagesToStore}
                      />
                    </div>
                  ) : (
                    <div className="fotos_input mx-3 mb-3">
                      <label for="formFileMultiple" className="form-label pb-2">
                        Fotos de la propiedad
                      </label>
                      <div className="caja-reemplazo d-flex justify-content-between">
                        <div className="ps-3 text-start">{`>> Carga realizada: ${store.selectedImages.length} foto(s)`}</div>
                        <div>
                          <button
                            onClick={actions.clearSelectedImages}
                            type="button"
                            className="btn btn-outline-secondary btn-sm me-3"
                          >
                            Borrar Fotos
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <hr />

                  {/* --------------------------- ubicacion --------------------------------- */}
                  <div className="container d-lg-flex justify-content-between ">
                    {/* comunidad autónoma */}
                    <div className="tipo_datos selector ms-1 mb-3 me-2 col-12 col-lg-5">
                      <div className="pb-2 text-start">
                        <span className="">Comunidad Autónoma</span>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={actions.updatePublicarComunidad}
                        value={store.comunidad}
                      >
                        <option className="">
                          {"<Elige la comunidad autónoma>"}
                        </option>
                        {store.listacomunidades.map((item) => {
                          let comunidad = Object.keys(item);
                          return (
                            <option key={comunidad} className="">
                              {comunidad}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* provincia */}
                    <div className="tipo_datos mb-3 ms-1 me-1 col-12 col-lg-5 text-start">
                      <div className="pb-2 text-start">
                        <span className="">Provincia</span>
                      </div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={actions.updatePublicarProvincia}
                        value={store.provincia}
                      >
                        <option className="">{"<Elige la provincia>"}</option>
                        {store.listaprovincias.map((elem) => (
                          <option key={elem} className="">
                            {elem}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* direccion */}
                  <div className="tipo_ubicacion mb-3 ms-3 me-2 me-lg-3 input-direccion text-start">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Dirección
                    </label>
                    <div>
                      <AddressInput />
                    </div>
                    {/* <input
                        onChange={actions.updatePublicarDireccion}
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="<Escribe la dirección>"
                        value={store.direccion}
                      /> */}
                  </div>

                  {/* ----------------  botones o spinner ---------------------- */}
                  {store.charging == true && store.premium == true ? (
                    <div className="pb-5">
                      <div className="text-center d-flex justify-content-center">
                        <div
                          className="spinner-border text-center d-flex justify-content-center"
                          role="status"
                        >
                          <span className="visually-hidden text-center d-flex justify-content-center">
                            Loading...
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        ...transfiriendo a la zona de pagos...
                      </div>
                    </div>
                  ) : store.charging == true && store.premium == false ? (
                    <div className="pb-5">
                      <div className="text-center d-flex justify-content-center">
                        <div
                          className="spinner-border text-center d-flex justify-content-center"
                          role="status"
                        >
                          <span className="visually-hidden text-center d-flex justify-content-center">
                            Loading...
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        ...cargando tu publicación...
                      </div>
                    </div>
                  ) : (
                    <div className="botones-contenedor mx-3 px-0 d-flex justify-content-evenly">
                      <div className="text-center">
                        <button
                          onClick={() => {
                            if (store.premium == false) {
                              handleClick1();
                            } else {
                              handleClickAlt();
                            }
                          }}
                          type="button"
                          className="btn btn-primary mb-3 mt-3"
                        >
                          {store.premium == true ? "Pagar" : "Publicar"}
                        </button>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={handleClick2}
                          type="button"
                          className="btn btn-info mb-3 mt-3"
                        >
                          Reiniciar
                        </button>
                      </div>
                    </div>
                  )}
                  {/* ----------------  fin de los selectores y botones ---------------------- */}
                </div>
              </div>
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
    </div>
  );
};
