import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Aside } from "../component/aside";
import { Tablero } from "../component/tablero";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid" style={{ background: "RGB(230,255,240)" }}>
      <div className="dashboard-contenedor container d-lg-flex px-0 py-2">
        {/* lateral de filtros */}
        <Aside />
        {/* tablero de resultados */}
        <Tablero />
      </div>
    </div>
  );
};
