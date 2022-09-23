import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Message } from "../component/user/message";
import { Properties } from "../component/user/properties";
import { Edit } from "../component/user/edit";
import { Publicar } from "../component/user/publicar";
import "bootswatch/dist/cerulean/bootstrap.min.css";
import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const user = JSON.parse(localStorage.getItem("user_info"));
  useEffect(() => {
    actions.syncUserInfo();
  }, []);
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="page-body">
          <div className="container-fluid">
            <div className="row banner-test">
              <div className="col-sm-3 d-flex justify-content-center">
                {user.imagen_perfil ? (
                  <img
                    src={user.imagen_perfil}
                    className="mt-5 profile-pic"
                    style={{
                      width: "200px",
                      height: "200px",
                      top: "3rem",
                      border: "solid 5px black",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <img
                    src={process.env.DEFAULT_PROFILE_PIC}
                    className="mt-5 profile-pic"
                    style={{
                      height: "auto",
                      top: "3rem",
                      border: "solid 5px black",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
              <div className="col-sm-7 text-center">
                <h3 className="text-white mt-5">Bienvenido</h3>
                <div className="d-flex justify-content-center align-items-center">
                  <h1 className="text-white fw-bold">
                    {store.userInfo.full_name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid text-center bg-light">
            <div className="row">
              <div
                className="nav flex-column nav-pills align-items-center col-sm-3 mt-5 pe-sm-0 mb-sm-5 pb-sm-5"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="active side-link"
                  id="v-pills-inmuebles-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-inmuebles"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-inmuebles"
                  aria-selected="false"
                >
                  Mis Inmuebles
                </a>
                <a
                  className="side-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Mensajes
                </a>
                <a
                  className="side-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  Editar
                </a>
                <a
                  className="side-link"
                  id="v-pills-publicar-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-publicar"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-publicar"
                  aria-selected="false"
                >
                  Publicar un anuncio
                </a>
              </div>
              <div
                class="tab-content col-sm-9 col-xxl-7 mt-4 px-sm-0 mt-sm-5 align-items-center justify-content-center"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane fade show active w-100"
                  id="v-pills-inmuebles"
                  role="tabpanel"
                  aria-labelledby="v-pills-inmuebles-tab"
                  tabindex="0"
                >
                  <Properties />
                </div>
                <div
                  className="tab-pane fade w-100"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                  tabindex="0"
                >
                  <Message />
                </div>
                <div
                  className="tab-pane fade w-100"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                  tabindex="0"
                >
                  <Edit />
                </div>
                <div
                  className="tab-pane fade pb-5 w-100"
                  id="v-pills-publicar"
                  role="tabpanel"
                  aria-labelledby="v-pills-publicar-tab"
                  tabindex="0"
                >
                  <Publicar />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>UNAUTHORIZED</h1>
      )}
    </>
  );
};
