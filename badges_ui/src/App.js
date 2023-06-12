import React, { Component, useContext } from 'react';
import Home from './pages/home/Home';
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
              <Home />
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
              {/* <Route path="forgot_password" element={<ForgotPass />} />
              <Route path="password_reset/:id/:token" element={<PasswordReset />} /> */}
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
