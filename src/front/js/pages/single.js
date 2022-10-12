import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";
import { ContactForm } from "../component/contactform";
import { SingleMap } from "../component/singleMap";
import fondo_cards2 from "../../img/fondo_cards2.jpg";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const [nroFoto, setNroFoto] = useState(0);
  const [periodo, setPeriodo] = useState(
    localStorage.getItem("periodo_alquiler")
  );
  const [elemento, setElemento] = useState(
    JSON.parse(localStorage.getItem("resp_element"))
  );

  const subeFoto = () => {
    if (nroFoto == elemento.fotos.length - 1) {
      setNroFoto(0);
    } else {
      setNroFoto(nroFoto + 1);
    }
  };
  const bajaFoto = () => {
    if (nroFoto == 0) {
      setNroFoto(elemento.fotos.length - 1);
    } else {
      setNroFoto(nroFoto - 1);
    }
  };

  return (
    <div style={{ background: "RGB(230,255,240)" }}>
      <div
        className="contenedor-single container"
        style={{ height: "fit-content" }}
      >
        <nav className="navbar navbar-expand-lg mb-3">
          <div className="container-fluid">
            <Link to={"/dashboard"}>
              <div className="wrap d-flex">
                <div>{"<< Volver a Búsqueda de Propiedades"}</div>
              </div>
            </Link>
          </div>
        </nav>
        <div className="contenedor-carrusel container">
          {/* ------------------------------- INICIO CARRUSEL DE FOTOS ---------------------------------- */}

          {elemento.fotos.length == 0 ? (
            <div
              className="container text-center col-10 bg-secondary d-flex align-items-center border"
              style={{
                height: "30vw",
                width: "80%",
              }}
            >
              <div className="container ">
                <h3 className="text-black">Aviso no tiene fotos</h3>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div
                className="foto img-fluid"
                style={{
                  backgroundImage: `url(${elemento.fotos[nroFoto]})`,
                }}
              ></div>
              <div className="container leyenda-fotos mt-2 d-flex px-5">
                <div className="col-4 d-flex justify-content-end">
                  {elemento.fotos.length > 1 ? (
                    <button
                      onClick={bajaFoto}
                      className="btn btn-primary btn-sm text-white"
                    >
                      {"<< Previa"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-4  text-center ">
                  {elemento.fotos.length > 1 ? (
                    <div>{`Foto ${nroFoto + 1}`}</div>
                  ) : elemento.fotos.length == 1 ? (
                    <div>Foto única</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-4 d-flex justify-content-start">
                  {elemento.fotos.length > 1 ? (
                    <button
                      onClick={subeFoto}
                      className="btn btn-primary btn-sm text-white"
                    >
                      {"Seguir >>"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------- DESCRIPCION DEL INMUEBLE ---------------------------------- */}
        </div>
        <div className="contenedor-datos container">
          <div className="container py-5 px-3">
            <div className="datos-propiedad-arriba d-lg-flex">
              <div className="datos-propiedad-izquierda col-12 col-lg-8 text-black pb-0 px-3 pt-3 mb-0">
                <h2 className="card-title fw-bold pb-3 text-black">
                  Descripción de la Propiedad:
                </h2>
                <h5 className=" text-black">{`Dirección: ${elemento.tipo_vivienda} en ${elemento.direccion}`}</h5>
                <h5 className=" text-black">{`Provincia: ${elemento.provincia}`}</h5>
                <h5 className=" text-black">{`Comunidad Autónoma: ${elemento.comunidad}`}</h5>
                <h5 className="text-primary fw-bolder fs-3">
                  {elemento.tipo_operacion == "alquiler" &&
                  periodo == "por meses"
                    ? `${elemento.precio} Euros/mes`
                    : elemento.tipo_operacion == "alquiler" &&
                      periodo == "por días"
                    ? `${Math.floor(elemento.precio / 25 + 1)} Euros/día`
                    : elemento.tipo_operacion == "compra"
                    ? `${elemento.precio} Euros`
                    : "Información no encontrada"}
                </h5>
                <div className="características wrap pt-2">
                  <h5 className=" text-black fw-bolder">Características:</h5>
                  <h5 className="px-4 text-black fw-bolder">{`- Habitaciones: ${elemento.habitaciones}`}</h5>
                  <h5 className="px-4 text-black fw-bolder">{`- Baños: ${elemento.baños}`}</h5>
                  {elemento.piscina ? (
                    <h5 className="px-4 text-black fw-bolder">- Piscina</h5>
                  ) : (
                    ""
                  )}
                  {elemento.terraza ? (
                    <h5 className="px-4 text-black fw-bolder">- Terraza</h5>
                  ) : (
                    ""
                  )}
                  {elemento.garage ? (
                    <h5 className="px-4 text-black fw-bolder">
                      - Plaza de Garage
                    </h5>
                  ) : (
                    ""
                  )}
                  {elemento.pet ? (
                    <h5 className="px-4 text-black fw-bolder">
                      - Admite Mascotas
                    </h5>
                  ) : (
                    ""
                  )}
                </div>
                <div className="datos-propiedad-abajo">
                  <h5
                    className="card-text pt-2 pb-3 text-black"
                    style={{ textJustify: "justify" }}
                  >
                    {`Información del Propietario: ${elemento.descripcion}`}
                  </h5>
                </div>
              </div>
              <div className="ventana-mensajes container-fluid d-flex col-11 col-lg-4 text-center pt-3 justify-content-center">
                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
            <div className="mapa-propiedad">
              <SingleMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
