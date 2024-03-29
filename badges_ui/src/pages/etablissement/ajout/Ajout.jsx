import React, { useContext, useState } from "react";
import styles from "./ajout.module.css";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Ajout = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [message, setMessage] = useState("");
  const [addState, setAddState] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  const handleSubmit = async (e) => {
    // to prevent to page refresh
    e.preventDefault();
    // update the INITAL_STATE
    setLoading(true);
    // prepare form Data
    let formData = new FormData();
    formData.append("logo", file);
    for (var i of Object.entries(info)) {
      formData.append(i[0], i[1]);
    }
    for (var key of formData.entries()) {
      console.log(key[0] + " , " + key[1]);
    }

    await axios
      .post("/etablissements", formData)
      .then((res) => {
        setLoading(false);
        setMessage(res.data.message);
        setAddState("Ajout avec Succées");
        setIsSuccessAlertVisible(true);
        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 4000);
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
        <form
          className={styles.form_container}
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1>Ajout Etablissement</h1>
          <input
            type="text"
            placeholder="Dénomination Sociale"
            id="denominationSociale"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <div className={styles.imageWrapper}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className={styles.etabImg}
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
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            required
            className={styles.input}
          />
          {addState === "Validation Error" && isErrorAlertVisible && (
            <div className={styles.error_msg}>{message}</div>
          )}

          {addState === "Ajout avec Succées" && isSuccessAlertVisible && (
            <div className={styles.success_msg}>{message}</div>
          )}

          <button type="submit" disabled={loading} className={styles.blue_btn}>
            Ajout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ajout;
