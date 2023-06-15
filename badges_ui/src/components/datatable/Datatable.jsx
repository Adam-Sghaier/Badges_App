import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
const Datatable = ({ columns, admin }) => {
  const location = useLocation();
  // the datatable component is use in common between three pages so we gonna differenciate the api request responses using the path value
  const path = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(
    `/etablissements/${path}/${admin.etablissementId}`
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  // const handleDelete = async (id) => {
  //   try {
  //     if (path === "rooms") {
  //       const { data } = await axios.get(`/${path}/hotel/${id}`);
  //       const hotelId = data[0]._id;
  //       await axios.delete(`/${path}/${id}/${hotelId}`);
  //     } else {
  //       await axios.delete(`/${path}/${id}`);
  //     }
  //     setList(list.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/dashboard/${path}/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/dashboard/${path}/add`} className="link">
          {`Ajout ${path}`}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[7]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
      {/* without the getRowId attribute , the dataGrid component cannot recognize the rows id's because we've canceled the use of temporary data and we're using the mongodb now , so we need access to _id using getRowID to get the problem solved*/}
    </div>
  );
};

export default Datatable;
