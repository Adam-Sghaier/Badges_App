import axios from "axios";
import React, { useState } from "react";
import styles from "./forgotpass.module.css";
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `/resetPass/send`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setLoading(false);
      setError("");
      setIsSuccessAlertVisible(true);
      setTimeout(() => {
        setIsSuccessAlertVisible(false);
      }, 4000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setIsErrorAlertVisible(true);
      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 4000);
    }
  };
  return (
    <div className={styles.bg_black}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        {isErrorAlertVisible && <div className={styles.error_msg}>{error}</div>}
        {isSuccessAlertVisible && (
          <div className={styles.success_msg}>{msg}</div>
        )}
        <button type="submit" disabled={loading} className={styles.blue_btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
