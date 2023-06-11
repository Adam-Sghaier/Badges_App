import { useState } from "react";
import styles from "./verify.module.css";
import check_mark from "../../../images/check-mark.png";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Verify = () => {
  // manage the url state
  const [validUrl, setValidUrl] = useState(false);
  const [message, setMessage] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const res = await axios.get(
          `/etablissements/verify/${params.etabId}/${params.token}`
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

          <Link to="/etablissement/addAdmin">
            <button className={styles.blue_btn}>Add Admin</button>
          </Link>
        </div>
      ) : (
        <h1>404 not found </h1>
      )}
    </div>
  );
};

export default Verify;
