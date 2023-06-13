import React, { Component, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Ajout from './pages/etablissement/ajout/Ajout';
import Image from './components/Image/Image';
import Verify from './pages/etablissement/verify/verify';
import AddAdmin from './pages/etablissement/addAdmin/AddAdmin';
import { employeInputs } from './formSource';
import VerifyAdmin from './pages/etablissement/verifyAdmin/VerifyAdmin';
import NotFound from './pages/notFound/NotFound';
import Login from './pages/etablissement/login/Login';
import Homepage from './pages/homepage/Homepage';
import Home from './pages/dashboard/home/Home';
import ForgotPass from './pages/etablissement/forgot_password/ForgotPass';
import ResetPassword from './pages/etablissement/reset_password/ResetPassword';
import List from './pages/dashboard/list/List';
import { employeColumns } from "./datatablesource"
import AjoutEmploye from './pages/dashboard/employe/ajout/AjoutEmploye';
function App() {
  // const { darkMode } = useContext(DarkModeContext);

  // const ProtectedRoute = ({ children }) => {

  //   // const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  //   const { user, dispatch } = useContext(AuthContext);
  //   if (!user) {
  //     return <Navigate to="/etablissement" />;
  //   }

  //   const verifyAdmin = async () => {
  //     try {
  //       await axios.get("/users/admin");
  //     } catch (error) {
  //       if (error.response.status === 404) {
  //         removeCookie('access_token');
  //         dispatch({ type: "LOGOUT" });
  //       }

  //     }
  //   };

  //   verifyAdmin();

  //   return children;
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Homepage />
            }
          />
          <Route
            path='image'
            element={
              <Image />
            }
          />
          <Route
            path="etablissement"
          >
            <Route path="login">
              <Route index element={<Login />} />
              <Route path="forgot_password" element={<ForgotPass />} />
              <Route path="password_reset/:id/:token" element={<ResetPassword />} />
            </Route>
            <Route
              path="ajout"
              element={
                <Ajout />
              }
            />
            <Route
              path="verify/:etabId/:tokenEtab"
              element={
                <Verify />
              }
            />
            <Route
              path="addAdmin"
            >
              <Route
                index
                element={
                  <AddAdmin inputs={employeInputs} />
                }
              />
              <Route
                path="verify/:adminId/:tokenAdmin"
                element={
                  <VerifyAdmin />
                }
              />
            </Route>

          </Route>
          <Route path="dashboard">
            <Route
              index
              element={
                <Home />
              }
            />
            <Route
              path="employes"
            >
              <Route
                index
                element={
                  <List columns={employeColumns} />
                }
              />
              <Route
                path="add"
                element={
                  <AjoutEmploye inputs={employeInputs} />
                }
              />
            </Route>
          </Route>
          <Route path="employe">
            {/* <Route
              index
              element={
                <Home />
              }
            /> */}
            <Route
              path="verify/:id/:token"
              element={
                <List columns={employeColumns} />
              }
            >


            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
