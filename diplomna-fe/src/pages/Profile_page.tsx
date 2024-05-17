import { GiCook } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../api/AuthProvider";
import "../styles.css";
import FetchUserRecipes from "../service/FetchUserRecipes";
import Recipe from "../components/Recipe";
import { AuthContextValue, RecipeProps } from "../interface";

function Profile() {
  const { auth } = useContext(AuthContext) as AuthContextValue;
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  const [userRecipes, setUserRecipes] = useState<RecipeProps[]>([]);
  const user = auth.user;

  const fetchInfo = async () => {
    try {
      const recipes: RecipeProps[] = await FetchUserRecipes(user.id);
      setUserRecipes(recipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete or encountered an error
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="top-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-green-400">
      <div className="mt-4 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center">
          <GiCook className="h-14 w-12" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">
            Welcome {user.name}
          </div>
          <p className="text-slate-500">See your recipes here!</p>
        </div>
      </div>

      <div className="bg-green-500 rounded-md w-1/3 mt-4 p-2 mb-4 flex items-center justify-center">
        <h1 className="font-bold">Your recipes:</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>  
      ) : (
        Array.isArray(userRecipes) && userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {userRecipes.map((recipe, index) => (
              <Recipe
                key={index}
                name={recipe.name}
                photo={recipe.photoText}
                likes={recipe.likes}
                time_for_cooking={recipe.time_for_cooking}
                type={recipe.type}
                description={recipe.description}
                id={recipe.id}
              />
            ))}
          </div>
        ) : (
          <div className="bg-green-500 rounded-md w-1/3 flex items-center justify-center">
            <h1>You don't have recipes yet</h1>
          </div>
        )
      )}
    </div>
  );
}

export default Profile;
