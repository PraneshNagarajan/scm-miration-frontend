import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import MainPage from "./components/main";
import LoginPage from "./components/login";

function App() {
  const isAuthenticated = sessionStorage.getItem("access_token") ? true : false;
  return (
    <Routes>
       <Route path="/" element={ <Navigate to="/auth" />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route
        path="/main"
        element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}

export default App;
