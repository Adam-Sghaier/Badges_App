import React, { useEffect, useState } from "react";
import styles from "./verifyadmin.module.css";
import axios from "axios";
import check_mark from "../../../images/check-mark.png";
import { Link, useParams } from "react-router-dom";
const VerifyAdmin = () => {
  // manage the url state
  const [validUrl, setValidUrl] = useState(false);
  const [message, setMessage] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const res = await axios.get(
          `/employes/verify/${params.adminId}/${params.tokenAdmin}`
        );
        setMessage(res.data.message);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [params]);
  return (
    <div className={styles.bg_black}>
      {validUrl ? (
        <div className={styles.verifContainer}>
          <img src={check_mark} alt="success_img" />
          <h1>{message}</h1>

          <Link to="/etablissement/login">
            <button className={styles.blue_btn}>Connexion</button>
          </Link>
        </div>
      ) : (
        <h1>404 not found </h1>
      )}
    </div>
  );
};

export default VerifyAdmin;
