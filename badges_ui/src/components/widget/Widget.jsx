import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Widget = ({ type, etabId }) => {
  
  const [etabStats, setEtabStats] = useState({});
  let data;

  useEffect(() => {
    const countdata = async () => {
      await axios
        .get(`/etablissements/countByEtab/${etabId}`)
        .then((result) => {
          setEtabStats(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    countdata();
  },[type]);
  //temporary
  const diff = 20;

  switch (type) {
    case "employes":
      data = {
        title: "Employés",
        link: "Consulter Liste Employés",
        count: etabStats.employes,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "demandes":
      data = {
        title: "Demandes",
        link: "Consulter Liste Demandes",
        count: etabStats.demandes,
        icon: (
          <AssignmentIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "badges":
      data = {
        title: "Badges",
        link: "Consulter Liste Badges",
        count: etabStats.badges,
        icon: (
          <AssignmentIndIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <Link to={`/dashboard/${type}`} className="link">
        <span >{data.link}</span>
        </Link>
        
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
