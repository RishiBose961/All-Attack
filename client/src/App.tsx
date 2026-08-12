import LoginPage from "./pages/Auth/LoginPage";

import { Route, Routes } from "react-router";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
