import React from "react";
import "./homepage.css";
import image from "../../images/OACA.jpg";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  
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

export default Homepage;
