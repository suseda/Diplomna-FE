import { Routes, Route, Navigate } from "react-router-dom";

import Login_page from "./pages/Login_page";
import Layout from "./components/Layout";
import Sign_up_page from "./pages/Sign_up_page";

import Home from "./pages/Home";
import Profile from "./pages/Profile_page";
import Favourites from "./pages/Favourites_page";
import View_recipe from "./pages/View_recipe_page";
import CreateRecipePage from "./pages/Create_recipe_page";
import SearchByGramsPage from "./pages/SearchByGramsPage";



function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/view_recipe/:id" element={<View_recipe />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
          <Route path="/search-by-grams" element={<SearchByGramsPage />} />
        </Route>
        <Route path="/login" element={<Login_page />} />
        <Route path="/signup" element={<Sign_up_page />} />
        <Route path="*" element={<Navigate to={"/login"} />} /> 
      </Routes>
  )
}

export default App


