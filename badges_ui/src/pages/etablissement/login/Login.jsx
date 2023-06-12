import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { AuthContext } from "../../../context/AuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const location = useLocation();
  const s_message = location.state?.message;
  const [isSuccessMAlertVisible, setIsSuccessMAlertVisible] = useState(false);
  const isNull = s_message === undefined;
  const [info, setInfo] = useState();
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
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
    setIsSuccessMAlertVisible(true);
    setTimeout(() => {
      setIsSuccessMAlertVisible(false);
    }, 3000);
  }, [isNull]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    // to prevent to page refresh
    e.preventDefault();
    // update the INITAL_STATE
    dispatch({ type: "LOGIN_START" });
    try {
      // post data to api server
      const res = await axios.post("/auth/login", info);
      // update the state data
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/dashboard");
      } else {
        setMessage(res.data);
        setIsSuccessAlertVisible(true);
        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 3000);
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
      // send error to auth context
      setIsErrorAlertVisible(true);
      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.bg_black}>
      {s_message !== undefined && isSuccessMAlertVisible && (
        <div className={styles.success_alert}>{s_message}</div>
      )}
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Connexion Admin</h1>
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
            <Link
              to="/etablissement/login/forgot_password"
              className={styles.fPass}
            >
              <p>Mot De passe Oublié ?</p>
            </Link>
            {isErrorAlertVisible && (
              <div className={styles.error_msg}>{error}</div>
            )}
            {isSuccessAlertVisible && (
              <div className={styles.success_msg}>{message}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.blue_btn}
            >
              Se Connecter
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <Link to="/etablissement/addAdmin">
            <button type="button" className={styles.white_btn}>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
