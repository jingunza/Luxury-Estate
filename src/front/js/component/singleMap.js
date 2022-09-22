import React, { useContext, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { Context } from "../store/appContext";

export const SingleMap = () => {
  const { store, actions } = useContext(Context);
  const property = JSON.parse(localStorage.getItem("resp_element"));
  const [viewState, setViewState] = useState({
    longitude: property.longitud,
    latitude: property.latitud,
    zoom: 14,
  });
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

  return (
    <div className="d-flex mt-5 justify-content-center">
      <Map
        {...viewState}
        style={{ width: "80%", height: "45vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(e) => {
          setViewState(e.viewState);
          console.log(store.longitude);
        }}
      >
        <Marker longitude={property.longitud} latitude={property.latitud} />;
      </Map>
    </div>
  );
};
