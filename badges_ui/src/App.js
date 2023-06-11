import React, { Component, useContext } from 'react';
import Home from './pages/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Ajout from './pages/etablissement/ajout/Ajout';
import Image from './components/Image/Image';
import Verify from './pages/etablissement/verify/verify';
import AddAdmin from './pages/etablissement/addAdmin/AddAdmin';
import { employeInputs } from './formSource';

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
            <Route
              path="ajout"
              element={
                <Ajout />
              }
            />
            <Route
              path="verify/:etabId/:token"
              element={
                <Verify />
              }
            />
            <Route
              path="addAdmin"
              element={
                <AddAdmin inputs={employeInputs}/>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
