import { Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom"
import MainPage from "./components/main";

function App() {
  return (
    <MainPage />
  );
}

export default App;
