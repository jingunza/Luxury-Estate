import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const Properties = () => {
  const { store, actions } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      await actions.getUserProperties();
      setProperties(JSON.parse(localStorage.getItem("userProperties")));
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <div className="mb-5">
      {!isloading ? (
        <div className="contenedor-propiedades">
          {properties ? (
            properties.map((property, i) => (
              <div
                className="card-propiedad card text-bg-secondary mb-3"
                key={i}
              >
                <div className="card-header">
                  {/* <div className="col-3">
                      {`Anuncio ${
                        property.premium == true ? "Premium" : "Gratuito"
                      }`}
                    </div> */}

                  <div className="">
                    <h3 className="fw-bold">{property.comunidad}</h3>
                    {property.direccion}
                  </div>

                  {/* <div className="col-3">
                      {property.premium == false ? (
                        <button className="btn btn-success">
                          Cambiar a Premium
                        </button>
                      ) : (
                        ""
                      )}
                    </div> */}
                </div>

                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-sm-12 col-xl-9 d-flex justify-content-center mb-3 mb-sm-0">
                      <img
                        src={property.fotos[0]}
                        className="img-thumbnail rounded property-foto"
                        style={{ width: "70%", height: "auto" }}
                        onClick={() => {
                          localStorage.setItem(
                            "resp_element",
                            JSON.stringify(property)
                          );
                          navigate("/single/" + property.id);
                        }}
                      />
                    </div>
                    <div className="col-sm-12">
                      <div className=" d-flex justify-content-around mt-4">
                        <h5 className="card-title fw-bold">
                          {property.tipo_operacion}
                        </h5>
                        <h5 className="card-title fw-bold">
                          {property.tipo_vivienda}
                        </h5>
                        <h5 className="card-title fw-bold">
                          {property.habitaciones} hab.
                        </h5>
                        <h5 className="card-title fw-bold">
                          {property.baños} baños
                        </h5>
                      </div>
                      <h5 className="text-black mt-1">
                        {property.descripcion}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No hay propiedades</div>
          )}
        </div>
      ) : (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};
