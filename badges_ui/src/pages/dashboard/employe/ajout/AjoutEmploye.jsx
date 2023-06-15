import { useContext, useState } from "react";
import "./ajoutemploye.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const AjoutEmploye = ({ inputs, admin }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    etablissementId: admin.etablissementId,
  });
  const [message, setMessage] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
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

    await axios
      .post("/employes", info)
      .then(async (res) => {
        setLoading(false);
        setMessage(res.data.message);
        setIsSuccessAlertVisible(true);
        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        setIsErrorAlertVisible(true);
        setTimeout(() => {
          setIsErrorAlertVisible(false);
        }, 3000);
      });
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Ajout Employe</h1>
        </div>
        <div className="bottom">
          <form className="form_container" onSubmit={(e) => handleSubmit(e)}>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <input
                  onChange={handleChange}
                  type={input.id === "password" ? passwordType : input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  className="input"
                />
                {input.id === "password" && (
                  <button
                    type="button"
                    className="pButton"
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
            <div className="formInput">
              <input
                onChange={handleChange}
                type="text"
                placeholder="Fonction"
                id="fonction"
                className="input"
              />
            </div>

            <button type="submit" disabled={loading} className="blue_btn">
              Ajout
            </button>
            {isErrorAlertVisible && <div className="error_msg">{message}</div>}

            {isSuccessAlertVisible && (
              <div className="success_msg">{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjoutEmploye;
