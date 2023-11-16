import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Login_page from "./pages/Login_page";
import Layout from "./components/Layout";
import Sign_up_page from "./pages/Sign_up_page";

import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login_page />} />
        <Route path="/signup" element={<Sign_up_page />} />
        <Route path="*" element={<Navigate to={"/login"} />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App


