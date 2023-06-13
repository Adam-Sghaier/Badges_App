import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { arrayBufferToBase64 } from "../../../utils/arrayBufferHandler";

const Home = () => {
  const { employe } = useContext(AuthContext);
  const [etabInfo, setEtabInfo] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const getEtab = async () => {
      await axios
        .get(`/etablissements/${employe.etablissementId}`)
        .then((res) => {
          setEtabInfo(res.data);
          const base64String = arrayBufferToBase64(etabInfo.logo.data.data);
          setImgSrc(`data:${etabInfo?.logo.data.type};base64,` + base64String);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEtab();
  }, [employe]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="etabInfo">
            <img src={imgSrc} alt="" className="etabLogo" />
            <h1>{etabInfo?.denominationSociale}</h1>
          </div>
          <div className="stats">
            <Widget type="employes" etabId={employe.etablissementId} />
            <Widget type="demandes" etabId={employe.etablissementId} />
            <Widget type="badges" etabId={employe.etablissementId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
