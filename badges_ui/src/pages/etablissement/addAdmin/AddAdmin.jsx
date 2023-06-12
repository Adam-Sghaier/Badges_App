import React, { useContext, useEffect, useState } from "react";
import styles from "./addadmin.module.css";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
const AddAdmin = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [etabId, setEtabId] = useState(location.state?.etabId);
  const [info, setInfo] = useState({
    isAdmin: true,
    fonction: "Admin",
    etablissementId: etabId,
  });
  console.log(info);
  const [message, setMessage] = useState("");
  const [addState, setAddState] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  
  const handleSubmit = async (e) => {
    // to prevent to page refresh
    e.preventDefault();
    // update the INITAL_STATE
    setLoading(true);
    // prepare form Data
    let formData = new FormData();
    formData.append("img", file);
    await axios
      .post("/employes", info)
      .then(async (res) => {
        formData.append("id", res.data.id);
        await axios.post("/images", formData).then(() => {
          setLoading(false);
          setMessage(res.data.message);
          setAddState("Ajout avec Succées");
          setIsSuccessAlertVisible(true);
          setTimeout(() => {
            setIsSuccessAlertVisible(false);
          }, 3000);
        });
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        setAddState("Validation Error");
        setIsErrorAlertVisible(true);
        setTimeout(() => {
          setIsErrorAlertVisible(false);
        }, 3000);
      });
  };
  return (
    <div className={styles.bg_black}>
      <div className={styles.ajoutContainer}>
        <div className={styles.left}>
          <form
            className={styles.form_container}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className={styles.adminImg}
                required
              />

              <div className="formInput">
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            {inputs.map((input) => (
              <div className={styles.formInput} key={input.id}>
                <input
                  onChange={handleChange}
                  type={input.id === "password" ? passwordType : input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  className={styles.input}
                />
                {input.id === "password" && (
                  <button
                    type="button"
                    className={styles.pButton}
                    onClick={(e) => togglePassword(e)}
                  >
                    {passwordType === "password" ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                )}
              </div>
            ))}
            {addState === "Validation Error" && isErrorAlertVisible && (
              <div className={styles.error_msg}>{message}</div>
            )}

            {addState === "Ajout avec Succées" && isSuccessAlertVisible && (
              <div className={styles.success_msg}>{message}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.blue_btn}
            >
              Ajout
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <Link to="/etablissement/login">
            <button
              type="submit"
              disabled={loading}
              className={styles.white_btn}
            >
              Connexion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
