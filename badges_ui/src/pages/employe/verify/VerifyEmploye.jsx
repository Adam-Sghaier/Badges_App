import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmploye = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const param = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const res = await axios.get(
          `/resetPass/verify/${param.id}/${param.token}`
        );
        console.log(res.data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param]);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/resetPass/reset/${param.id}/${param.token}`,
        { password }
      );
      const message = data.message;
      navigate("/etablissement/login", { state: { message } });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);

      setIsErrorAlertVisible(true);
      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 3000);
    }
  };
  return <div>VerifyEmploye</div>;
};

export default VerifyEmploye;
