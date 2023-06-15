import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Widget from "../../../components/widget/Widget";
import { arrayBufferToBase64 } from "../../../utils/arrayBufferHandler";
import axios from "axios";

const MainPage = ({ employe }) => {
  const [etabInfo, setEtabInfo] = useState({});
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const getEtab = async () => {
      await axios
        .get(`/etablissements/${employe.etablissementId}`)
        .then((res) => {
          setEtabInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEtab();
  }, [location]);

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
            <img src={`${imgSrc}`} alt="" className="etabLogo" />
            <h1>{etabInfo.denominationSociale}</h1>
          </div>
          {/* <div className="stats">
            <Widget type="employes" etabId={employe.etablissementId} />
            <Widget type="demandes" etabId={employe.etablissementId} />
            <Widget type="badges" etabId={employe.etablissementId} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
