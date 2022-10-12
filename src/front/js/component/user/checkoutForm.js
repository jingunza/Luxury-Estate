import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const { store, actions } = useContext(Context);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleCard = async () => {
    await actions.switchOnCharging();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod; // id no es una variable, es una propiedad de objeto importada, por lo que tiene key y value
      let opts = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id, // no requiere darle un value porque id ya tiene key y value pues es una propiedad de paymentMethod (por destructuracion)
          amount: 2990,
        }),
      };
      try {
        //   status: "succeeded"
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/checkout",
          opts
        );
        if (resp.status != 200 || resp.status == undefined) {
          console.log(resp.status);
          localStorage.setItem("pub_premium", false);
          localStorage.setItem("pub_pay", "failed");
          throw new Error("The payment has failed");
        }
        const respAsJson = await resp.json();
        console.log(respAsJson.status);
        localStorage.setItem("pub_premium", true);
        localStorage.setItem("pub_pay", "succeed");
      } catch (error) {
        console.log("The payment has failed: ", error);
      }
    }
    actions.switchOffCharging();
  };

  const handleClick = async () => {
    await handleCard();
    await actions.handlePublish();
    const user = JSON.parse(localStorage.getItem("user_info"));
    if (store.pubSuccess == "Yes") {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <div className="card card-body p-4 bg-light">
      <div className="text-start pb-4">
        <h4 className="text-black">{"Sucripción Luxury Estate Premium:"}</h4>
        <h4 className="text-black">{" 29.90 Euros"}</h4>
        <h6 className="text-black">{"Validez: 30 días"}</h6>
      </div>
      <CardElement />
      {store.charging == true ? (
        <div className="py-4">
          <div className="text-center d-flex justify-content-center">
            <div
              className="spinner-border text-center d-flex justify-content-center"
              role="status"
            >
              <span className="visually-hidden text-center d-flex justify-content-center">
                Loading...
              </span>
            </div>
          </div>
          <div className="text-center ">...procesando el pago...</div>
        </div>
      ) : (
        <div className="text-center">
          <button onClick={handleClick} className="btn btn-primary btn-sm mt-3">
            Publicar
          </button>
        </div>
      )}
    </div>
  );
};
