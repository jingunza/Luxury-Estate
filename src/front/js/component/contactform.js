import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactForm = () => {
  const { store, actions } = useContext(Context);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const propertyInfo = JSON.parse(localStorage.getItem("resp_element"));
  useEffect(() => {
    const fetchOwnerInfo = async () => {
      await actions.getPropertyOwner(propertyInfo.user_id);
    };
    fetchOwnerInfo();
  }, []);

  const sendMessage = async () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_body: message,
        email: email,
        full_name: name,
        phone: phone,
        recipient_id: propertyInfo.user_id,
        property_id: propertyInfo.id,
      }),
    };
    try {
      const resp = await fetch(
        process.env.BACKEND_URL + "/api/send-message",
        opts
      );
      if (resp.status !== 200) {
        throw new Error("Could not send message");
      }
      const data = await resp.json();
      if (data === "Message posted") {
        return setSent(true);
      }
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  };
  const handleClick = async () => {
    await sendMessage();
    const owner = JSON.parse(localStorage.getItem("ownerInfo"));
    const data = {
      service_id: "gmail",
      template_id: "template_dc4q7qn",
      user_id: "MCYxoqzamAEPLRw1H",
      template_params: {
        name: name,
        email: email,
        message_body: message,
        phone: phone,
        to: owner.email,
      },
    };
    const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <>
      {!sent ? (
        <div
          className="card"
          style={{ width: "100%", background: "RGB(177,212,229)" }}
        >
          <div className="card-body p-3" style={{ width: "18rem" }}>
            <h5 className="card-title text-black">Pregunta al anunciante</h5>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-100"
              style={{ width: "100%" }}
            ></textarea>
            <h6 className="card-subtitle my-2  text-black">Tu email:</h6>
            <input
              className="list-group-item "
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              style={{
                width: "100%",
                background: "white",
                border: "1px grey solid",
              }}
            />
            <h6 className="card-subtitle my-2  text-black">Tu nombre:</h6>
            <input
              className="list-group-item"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: "100%",
                background: "white",
                border: "1px grey solid",
              }}
            />
            <h6 className="card-subtitle my-2  text-black">Tu teléfono:</h6>
            <input
              className="list-group-item"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tu teléfono"
              style={{
                width: "100%",
                background: "white",
                border: "1px grey solid",
              }}
            />
          </div>
          <div className="mb-3">
            <a href="#" onClick={handleClick} className="btn btn-primary">
              Contactar
            </a>
          </div>
        </div>
      ) : (
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Mensaje enviado</h5>
          </div>
        </div>
      )}
    </>
  );
};
