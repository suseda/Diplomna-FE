import { useNavigate } from "react-router-dom";
import logo from "../images/logo-no-background.png"
import { useState } from "react";
import { NavBarProps } from "../interface";

function NavBar({onSearch}: NavBarProps) 
{

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("None");

    const types = ["None","Soup", "Meat","Vegan","Dessert"];

    const handleLogOut = () =>
    {
      sessionStorage.removeItem('authToken');
      navigate("/login");
    }

    const handleProfileEntry = () =>
    {
      navigate("/profile");
    }

    const handleFavouritesEntry = () =>
    {
      navigate("/favourites");
    }

    const handleCreateRecipeEntry = () =>
    {
      navigate("/create-recipe");
    }

    const handleSearchByGramsEntry = () =>
    {
      navigate("/search-by-grams");
    }

    const handleSearch = (e: { target: { value: any; }; }) => {
      const word = e.target.value;
      setSearchTerm(word);
      onSearch(word,type);
    };

    const handleTypeSearch = (e: {target: {value: any};}) =>
    {
      const recipeType = e.target.value;
      setType(recipeType);
      onSearch(searchTerm,recipeType);
    }


    return (
    <div className="w-full navbar bg-green-500">
      <div className="flex-1">
          <h1 className=" rounded-md px-5 py-5 text-bg font-bold text-white"><span className="text-warning font-big">Cook</span>Lab: Your Culinary Companion</h1>
        </div>
      <div className="flex-none gap-2">
      <select className="select select-bordered w-1/4 m-2 bg-green-500 rounded-md border-solid border-2 border-black" value={type} onChange={handleTypeSearch}>
            {types.map((type, index) =>(
                            <option key={index}><a>{type}</a></option>
                        ))
            }
      </select>
      <div className="form-control">
          <input
            type="text"
            placeholder="Search recipe"
            className="input input-bordered w-24 md:w-auto"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className=" dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Logo" src={logo} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-green-500 rounded-box w-52 text-center">
              <li><a onClick={handleProfileEntry}>Profile</a></li>
              <li><a onClick={handleFavouritesEntry}>Favourites</a></li>
              <li><a onClick={handleCreateRecipeEntry}>Create Recipe</a></li>
              <li><a onClick={handleSearchByGramsEntry}>Search by Products</a></li>
              <li><a className="bg-warning hover:bg-yellow-300" onClick={handleLogOut}>Log Out</a></li>
          </ul>
        </div>
      </div>
    </div>
)}
  
  export default NavBar