import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "features/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "features/auth/pages/AuthPage";
import LoginPage from "features/auth/pages/LoginPage";
import { PrivateRoute } from "components/common/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";
import RouterView from "routes/router";
function App() {
  return (
    <>
      <RouterView />
      <ToastContainer />
    </>
  );
}

export default App;
