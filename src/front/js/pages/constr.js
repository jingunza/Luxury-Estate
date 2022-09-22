import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const Constr = () => {
  const { store, actions } = useContext(Context);
  const [q, setq] = useState(0);

  return (
    <div>
      <h1 className="m-5 p-5 text-center">
        ... página en construcción, disculpe las molestias ...
      </h1>
    </div>
  );
};
