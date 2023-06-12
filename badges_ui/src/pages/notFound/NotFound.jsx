import React from "react";
import styles from "./notfound.module.css";
import notFoundLogo from "../../images/404-error.png"
const NotFound = () => {
  return (
    <div className={styles.bg_black}>
      <img src={notFoundLogo} alt="logo page non trouvé" />
      <div class={styles.typewriter}>
        <h1>Page Non Trouvée</h1>
      </div>
    </div>
  );
};

export default NotFound;
