import { GiCook } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextValue } from "../api/AuthProvider";
import "../styles.css";
import Recipe from "../components/Recipe";
import FetchUserFavourites from "../service/FetchUserFavourites";

interface Recipe {
  name: string;
  likes: number;
  type: string;
  time_for_cooking: number;
}

function Favourites() {
  const { auth } = useContext(AuthContext) as AuthContextValue;

  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  const user = auth.user;

  const fetchInfo = async () => {
    const recipes: Recipe[] = await FetchUserFavourites(user.id);
    setUserRecipes(recipes);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 flex flex-col items-center justify-center bg-favourites-img bg-cover">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center">
            <GiCook className="h-14 w-12" />
          </div>
          <div>
            <div className="text-xl font-medium text-black">
              Welcome {user.name}
            </div>
              <p className="text-slate-500">See your favourites recipes here!</p>
            </div>
        </div>

        <div className="bg-green-500 rounded-md w-1/3 mt-4 p-2 mb-4">
          <h1 className="font-bold">Your favourite recipes:</h1>
        </div>

        {Array.isArray(userRecipes) && userRecipes.length > 0 ? 
          (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {
                (userRecipes.map((recipe, index) => (
                <Recipe
                  key={index}
                  name={recipe.name}
                  photoUrl={
                    "https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg"
                  }
                  likes={recipe.likes}
                  time_for_cooking={recipe.time_for_cooking}
                />)
            ))}
            </div>
          ) : (
            <h1 className="bg-green-500 rounded-md w-1/3">First you must add your favourite recipes</h1>
          )}
        
      </div>
    </div>
  );
}

export default Favourites;
