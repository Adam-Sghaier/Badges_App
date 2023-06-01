import React, { useContext, useState } from "react";
import "./ajout.css";
import image from "../../../images/OACA.jpg"
import { useNavigate } from "react-router-dom";
import { EtabContext } from "../../../context/EtabContext";
const Ajout = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  // const { loading, error, dispatch } = useContext(EtabContext);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div className="bg-black">  
      <div class="typewriter">
        <h1>Bienvenue au gestionnaire des demandes de badges</h1>
      </div>

      <div className="btns">
        <button
          class="button-86"
          role="button"
          onClick={() => navigate("/etablissement/ajout")}
        >
          Ajout Etablissement
        </button>
        <button
          class="button-86"
          role="button"
          onClick={() => navigate("/etablissement/login")}
        >
          Connexion
        </button>
      </div>
      <div className="footer">
        <h2 className="footerTitle">Sous L'administration de</h2>
        <img src={image} alt="" className="footerImg" />
      </div>
    </div>
  );
};

export default Ajout;



