import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import casa from "../../img/casa-lujo-playa_98.webp";
import mapita from "../../img/mapita.png";
import fondo_cards2 from "../../img/fondo_cards2.jpg";
import listado from "../../img/listado.png";
import publicar from "../../img/publicar.png";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.clearLocalStorageNoUser();
    actions.resetStoreVariables(); // Variables de Publicar, Home y Dashboard
  }, []);

  const handleClick = async () => {
    if (store.operacion != "todas") {
      await actions.fillLocalStorage();
      await actions.createRequest();
      await actions.getProperties();
      navigate("/dashboard");
    } else {
      swal("Debe seleccionar al menos el tipo de operación");
    }
  };

  return (
    <div
      className="homepage-body pt-2"
      style={{ background: "RGB(230,255,240)" }}
    >
      <div
        className="contenedor-foto container d-flex justify-content-center pb-4 mt-2"
        style={{ backgroundImage: `url(${casa})` }}
      >
        <div
          className="plantilla container rounded-3 mb-4 text-dark bg-light"
          style={{ opacity: "0.85" }}
        >
          <div className="titulo container ps-4 pt-3 pb-2">
            <h3 className="fw-bolder">Elige tu propiedad</h3>
          </div>

          {/*--------------------------------------------- INICIO DE LOS FILTROS SELECT ----------------------------------------------*/}
          <div className="filtros container d-lg-flex justify-content-evenly pt-3 pb-2">
            {/* tipo de operacion */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Operación</span>
              </div>
              <select
                onChange={actions.updateOperacion}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.operacion}
              >
                <option className="">{"<elegir>"}</option>
                <option className="">alquiler</option>
                <option className="">compra</option>
              </select>
            </div>
            {/* comunidad */}
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Comunidad Autónoma</span>
              </div>
              <select
                onChange={actions.updateComunidad}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.comunidad}
              >
                <option className="">todas</option>
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
            <div className="selector mx-3">
              <div className="pb-2 text-center">
                <span className="">Provincia</span>
              </div>
              <select
                onChange={actions.updateProvincia}
                className="form-select mb-3"
                aria-label="Default select example"
                value={store.provincia}
              >
                <option className="">todas</option>
                {store.listaprovincias.map((elem) => (
                  <option key={elem} className="">
                    {elem}
                  </option>
                ))}
              </select>
            </div>

            {/* rango de precio */}
            <div className="selector mx-3 mb-3">
              <div className="pb-2 text-center">
                <span className="">Rango de Precio</span>
              </div>
              {store.operacion == "todas" || store.operacion == "alquiler" ? (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1 mb-3"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">500</option>
                    <option className="">750</option>
                    <option className="">1000</option>
                    <option className="">1250</option>
                    <option className="">1500</option>
                    <option className="">1750</option>
                    <option className="">2000</option>
                    <option className="">2500</option>
                    <option className="">3000</option>
                    <option className="">3500</option>
                    <option className="">4000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1 mb-3"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">500</option>
                    <option className="">750</option>
                    <option className="">1000</option>
                    <option className="">1250</option>
                    <option className="">1500</option>
                    <option className="">1750</option>
                    <option className="">2000</option>
                    <option className="">2500</option>
                    <option className="">3000</option>
                    <option className="">3500</option>
                    <option className="">4000</option>
                  </select>
                </div>
              ) : (
                <div className="d-flex">
                  <select
                    onChange={actions.updatePreciomin}
                    className="form-select me-1 mb-3"
                    aria-label="Default select example"
                    value={store.preciomin == 0 ? "Mín" : store.preciomin}
                  >
                    <option className="">Mín</option>
                    <option className="">100000</option>
                    <option className="">150000</option>
                    <option className="">200000</option>
                    <option className="">250000</option>
                    <option className="">300000</option>
                    <option className="">350000</option>
                    <option className="">400000</option>
                    <option className="">450000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                  <select
                    onChange={actions.updatePreciomax}
                    className="form-select ms-1 mb-3"
                    aria-label="Default select example"
                    value={
                      store.preciomax == 999999999 ? "Máx" : store.preciomax
                    }
                  >
                    <option className="">Máx</option>
                    <option className="">100000</option>
                    <option className="">150000</option>
                    <option className="">200000</option>
                    <option className="">250000</option>
                    <option className="">300000</option>
                    <option className="">350000</option>
                    <option className="">400000</option>
                    <option className="">450000</option>
                    <option className="">500000</option>
                    <option className="">750000</option>
                    <option className="">1000000</option>
                  </select>
                </div>
              )}
            </div>
            {/*--------------------------------------------- FIN DE LOS FILTROS SELECT ----------------------------------------------*/}

            {/*--------------------------------------------- BOTON DE PASE AL DASHBOARD----------------------------------------------*/}
            <div className="row align-items-end text-center">
              <div className="mb-3">
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary mb-3 fw-bolder"
                >
                  Resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------ TARJETAS INFORMATIVAS -------------------------------------- */}

      <div className="contenedor_cards container py-3 ">
        <div
          className="container fondo_tarjetas col-11 bg-white p-2"
          style={{ backgroundImage: `url(${fondo_cards2})` }}
        >
          <div className="contenedor_info container col-11 px-0 mt-0">
            <div className="container d-flex">
              <div className="col-12 d-flex justify-content-end">
                <div
                  className="card rounded-3 mt-4"
                  style={{
                    maxWidth: "620px",
                    boxShadow: "20px 20px 50px grey",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src={listado}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ height: "100%" }}
                      />
                    </div>
                    <div
                      className="col-md-7"
                      style={{ background: "RGB(177,212,229)" }}
                    >
                      <div className="card-body tarjeta_info">
                        <h5 className="card-title">
                          Encuentra tu vivienda de lujo a sólo un click
                        </h5>
                        <p className="card-text">
                          Ahora puedes encontrar la vivienda que más se adapte a
                          tu estilo, selecciona tus preferencias y encuentra
                          rápidamente lo que buscas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contenedor_info container col-11  px-0 mt-3">
            <div className="container d-flex">
              <div className="col-12 d-flex justify-content-start">
                <div
                  className="card rounded-3 mt-4"
                  style={{
                    maxWidth: "620px",
                    boxShadow: "20px 20px 50px grey",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src={mapita}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ height: "100%" }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div
                        className="card-body tarjeta_info"
                        style={{
                          background: "RGB(177,212,229)",
                        }}
                      >
                        <h5 className="card-title">
                          Descubre propiedades por ubicación geográfica
                        </h5>
                        <p className="card-text">
                          Si te gusta explorar mapas, puedes encontrar la
                          vivienda de lujo que más te guste en el lugar que
                          prefieras y sin salir de casa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contenedor_info container col-11 px-0 mt-3">
            <div className="container d-flex">
              <div className="col-12 d-flex justify-content-end">
                <div
                  className="card rounded-3 my-4 "
                  style={{
                    maxWidth: "620px",
                    boxShadow: "20px 20px 50px grey",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src="https://ak-d.tripcdn.com/images/22071e000001gamro1BDC_Z_1100_824_R5_Q70_D.jpg"
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ height: "100%" }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div
                        className="card-body tarjeta_info"
                        style={{
                          background: "RGB(177,212,229)",
                        }}
                      >
                        <h5 className="card-title">
                          Quieres alquilar o vender una propiedad?
                        </h5>
                        <p className="card-text">
                          Anuncia gratis tus propiedades de alquiler o venta. Y
                          si tienes prisa, tenemos para ti el servicio Premium,
                          con mayor visibilidad por sólo € 29.90.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
