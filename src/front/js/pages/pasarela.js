import React, { useEffect, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../component/user/checkoutForm";
import casa from "../../img/terrazas-con-vistas-al-mar.jpeg";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(
  "pk_test_51Lj2kEBX1sQatE26tEVFI3KL7NotboffCWXx7hIwZNedSfrNrl5k5z4RrTyuSAa8aNtzZMNqMijmyE35fIbjnAyd00uBdyzFFI"
);

export const Pasarela = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="py-2" style={{ background: "RGB(230,255,240)" }}>
      <div
        className="contenedor-foto container justify-content-center pt-5 pb-4"
        style={{ backgroundImage: `url(${casa})` }}
      >
        <div className="container p-0 ">
          <h1 className="fw-bolder text-white text-center pt-3 mb-5">
            Estás en un ambiente seguro y relajado...
          </h1>
        </div>
        <div className="contenedor-pasarela container-fluid d-flex justify-content-center">
          <div className="container col-10 col-lg-7 col-xl-6 p-4">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};
