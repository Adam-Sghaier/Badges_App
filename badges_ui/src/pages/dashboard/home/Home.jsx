import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import {  useEffect, useState } from "react";
import axios from "axios";
import { arrayBufferToBase64 } from "../../../utils/arrayBufferHandler";

const Home = ({ admin }) => {
  const [etabInfo, setEtabInfo] = useState({});
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const getEtab = async () => {
      await axios
        .get(`/etablissements/${admin.etablissementId}`)
        .then((res) => {
          setEtabInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEtab();
  }, [admin]);

  useEffect(() => {
    const base64String = arrayBufferToBase64(etabInfo?.logo?.data?.data);
    setImgSrc(`data:${etabInfo?.logo?.data?.type};base64,${base64String}`);
  }, [etabInfo]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="etabInfo">
            <img
              src={`${imgSrc}`}
              alt=""
              className="etabLogo"
            />
            <h1>{etabInfo.denominationSociale}</h1>
          </div>
          <div className="stats">
            <Widget type="employes" etabId={admin.etablissementId} />
            <Widget type="demandes" etabId={admin.etablissementId} />
            <Widget type="badges" etabId={admin.etablissementId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
