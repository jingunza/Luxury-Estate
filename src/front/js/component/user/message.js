import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";

export const Message = () => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      await actions.getMessages();
      setMessages(JSON.parse(localStorage.getItem("messages")));
      setIsLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <div style={{ minWidth: "70%" }}>
      {!isloading ? (
        <div className="contenedor-mensajes mb-5">
          {messages ? (
            messages.map((message, i) => (
              <div
                className="card card-mensaje text-bg-secondary mb-2 "
                key={i}
              >
                <div className="card-header">
                  <h3 className="fw-semibold">{message.sender_name}</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-around">
                    <h5 className="card-title fw-bold text-black">
                      <i className="fa-regular fa-envelope" />{" "}
                      {message.sender_email}
                    </h5>
                    <h5 className="card-title text-black fw-bold">
                      <i class="fa-solid fa-phone" /> {message.sender_phone}
                    </h5>
                  </div>
                  <p className="card-text fw-normal fs-4">{message.body}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-bg-secondary mb-3">
              <div className="card-body">
                <h5 className="card-title">No tienes mensajes aún...</h5>
                <p className="card-text">
                  Quieres darle mayor visibilidad a tu anuncio?
                </p>
                <button
                  onClick={() => {
                    swal(
                      "Publica un anuncio Premium",
                      "Ahora por 29.90 Euros. Solo tienes que ir a la sección Mis Inmuebles y dar click en el enlace de pago del inmueble que quieras visibilizar"
                    );
                  }}
                  className="btn btn-primary"
                >
                  Saber más
                </button>
              </div>
            </div>
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
