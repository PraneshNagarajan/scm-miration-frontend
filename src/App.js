import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/main";
import LoginPage from "./components/login";

function App() {
  const isAuthenticated = sessionStorage.getItem("access_token") ? true : false;
  console.log(isAuthenticated)
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
