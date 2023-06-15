import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./employelogin.module.css";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const EmployeLogin = () => {
  const location = useLocation();
  const s_message = location.state?.message;
  const isNull = s_message === undefined;
  const [info, setInfo] = useState();
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  useEffect(() => {
    setIsSuccessAlertVisible(true);
    setTimeout(() => {
      setIsSuccessAlertVisible(false);
    }, 4000);
  }, [isNull]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    // to prevent to page refresh
    e.preventDefault();
    // update the INITAL_STATE
    dispatch({ type: "LOGIN_START" });

    // post data to api server
    await axios
      .post("/auth/login", info)
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS_E", payload: res.data.details });
        navigate("/employe");
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: error.response.data.message,
        });

        setIsErrorAlertVisible(true);
        setTimeout(() => {
          setIsErrorAlertVisible(false);
        }, 4000);
      });
  };
  return (
    <div className={styles.bg_black}>
      {s_message !== undefined && isSuccessAlertVisible && (
        <div className={styles.success_alert}>{s_message}</div>
      )}
      <div className={styles.login_form_container}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <h1>Connexion Employe</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <div className={styles.passwordInput}>
            <input
              type={passwordType}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              className={styles.input}
            />
            <button type="button" onClick={togglePassword}>
              {passwordType === "password" ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <Link to="/employe/login/forgot_password" className={styles.fPass}>
            <p>Mot De passe Oublié ?</p>
          </Link>
          {isErrorAlertVisible && (
            <div className={styles.error_msg}>{error}</div>
          )}
          

          <button type="submit" disabled={loading} className={styles.blue_btn}>
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeLogin;
