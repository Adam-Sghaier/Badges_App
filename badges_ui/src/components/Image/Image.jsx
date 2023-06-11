import React, { useEffect, useState } from "react";
import styles from "./image.module.css";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { arrayBufferToBase64 } from "../../utils/arrayBufferHandler";
const Image = () => {
  const { data } = useFetch(
    "/etablissements/c9ec3711-7cdb-434e-be49-e4edbba028ca"
  );
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    const base64String = arrayBufferToBase64(data.logo.data.data);
    setImgSrc(base64String);
  }, [data]);

  return (
    <div className={styles.bg_black}>
      <div>
        <img src={`data:image/jpg;base64,${imgSrc}`} alt="Array Buffer Image" />
      </div>
    </div>
  );
};

export default Image;
