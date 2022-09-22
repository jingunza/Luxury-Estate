import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import { Context } from "../store/appContext";

export const MapListings = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -3.74922,
    latitude: 40.463667,
    zoom: 6,
  });
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

  const handleClick = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="contenedor-mapa container d-flex justify-content-center pt-4">
      <div className="contenido-mapa container d-flex justify-content-center">
        {store.body_response.length !== 0 &&
        Array.isArray(store.body_response) ? (
          <Map
            {...viewState}
            style={{ width: "59vw", height: "80vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={(e) => setViewState(e.viewState)}
          >
            {" "}
            {store.body_response.map((property, index) => {
              return (
                <Marker
                  key={index}
                  longitude={property.longitud}
                  latitude={property.latitud}
                  onClick={() => {
                    handleClick(property, index);
                  }}
                />
              );
            })}
            {selectedProperty && (
              <Popup
                latitude={selectedProperty.latitud}
                longitude={selectedProperty.longitud}
                anchor="bottom"
                onClose={() => {
                  setSelectedProperty(null);
                }}
              >
                <div>
                  <p>{selectedProperty.descripcion}</p>
                  <a
                    className="btn btn-outline-success"
                    onClick={() => {
                      localStorage.setItem(
                        "resp_element",
                        JSON.stringify(selectedProperty)
                      );
                      navigate("/single/" + selectedProperty.id);
                    }}
                  >
                    Saber mas
                  </a>
                </div>
              </Popup>
            )}
          </Map>
        ) : Array.isArray(store.body_response) &&
          store.body_response.length == 0 ? (
          <div className="m-5 p-5">
            <h3>No se encontró propiedades, intente una búsqueda distinta</h3>
          </div>
        ) : (
          <div className="pb-5">
            <div className="text-center d-flex justify-content-center">
              <div
                className="spinner-border text-center d-flex justify-content-center align-content-center"
                role="status"
              >
                <div
                  className="spinner-grow"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
