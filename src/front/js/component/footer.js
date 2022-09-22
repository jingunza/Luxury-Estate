import React, { Component } from "react"; // RGB(23,147,209)
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logoDown from "../../img/logoDown.jpg";
import drops from "../../img/drops.jpg";

export const Footer = () => (
  <footer
    className="container-fluid footer pt-2 pb-3 text-center "
    style={{
      background: `RGB(47,153,204)`,
    }}
  >
    <div className="container h1 d-flex d-flex justify-content-center my-3">
      <span className="logod1 display-6 ">LUXURY</span>{" "}
      <span className="logod2 display-6  ">ESTATE</span>
    </div>
    <div className="container d-flex py-2 ">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">¿quiénes somos?</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">trabaja con nosotros</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">integrantes:</div>
      </Link>
    </div>

    <div className="container d-flex py-2 text-white">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">preguntas frecuentes</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">sugerencias</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">Daniel Guzman</div>
      </Link>
    </div>

    <div className="container d-flex py-2 ">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">condiciones generales</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">próximos proyectos</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">Jose Ingunza</div>
      </Link>
    </div>

    <div className="container d-flex py-2 text-white">
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center  ">prensa</div>
      </Link>
      <Link className="col-4 text-decoration-none" to="/constr">
        <div className="text-center ">certificaciones</div>
      </Link>
    </div>
  </footer>
);
