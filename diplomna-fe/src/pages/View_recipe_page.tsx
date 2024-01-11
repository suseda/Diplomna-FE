import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import UpdateLikes from "../service/UpdateLikes";
import AuthContext from "../api/AuthProvider";
import UpdateUserFavourites from "../service/UpdateUserFavourites";
import FetchRecipe from "../service/FetchRecipe";
import { useParams } from "react-router-dom";
import { AuthContextValue, RecipeProps } from "../interface";

function View_recipe_page() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext) as AuthContextValue;
  const [recipe, setRecipe] = useState({} as RecipeProps);
  const [isLiked,setIsLiked] = useState(false);
  const [isFav,setIsFav] = useState(false);
  const user = auth.user;

  const [recipeLikes, setRecipeLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchRecipe(Number(id));
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchData();
  }, [id, recipeLikes]);

  const handleLike = async () => {
    if (isLiked) {
      let likes = recipeLikes + 1;
      setRecipeLikes(likes);
      await UpdateLikes(recipe.id,recipeLikes);
      console.log("Recipe liked");
      console.log(recipeLikes);
    } else {
      console.log(recipeLikes);
      let likes = recipeLikes - 1;
      setRecipeLikes(likes);
      await UpdateLikes(recipe.id,recipeLikes);
      console.log("Like removed");
      console.log(recipeLikes);
    }
    setIsLiked(!isLiked);
  };

  
  const handleAddToFavourites = async () => {
    await UpdateUserFavourites(user.id,recipe.id,true);
    setIsFav(true);
    console.log("Recipe added to fav");
  };

  const handleRemoveFromFavourites = async () => {
    await UpdateUserFavourites(user.id,recipe.id,false);
    setIsFav(false);
    console.log("Recipe removed from fav");
  }

  return (
    <div>
      <div className="grid grid-cols-6 grid-rows-1 gap-4">
        <div className="col-start-2 col-span-4 row-start-1 row-span-1 bg-green-500 rounded-md h-auto flex items-center justify-center">
          <h1>{recipe.name}</h1>
        </div>
      </div>

      <div className="grid grid-rows-3 grid-cols-5 gap-4">
        <div className="row-start-1 row-span-1 col-start-1 col-span-3 flex items-center justify-center">
            <h1>{recipe.likes}</h1>
            <button
                className="btn-circle bg-rose-400 m-2 flex items-center justify-center"
                onClick={handleLike}
            >
                <FaHeart  style={{ color: isLiked ? 'red' : 'white' }} />
            </button>
        </div>

        <div className="row-start-2 row-span-1 col-start-1 col-span-3 flex items-center justify-center">
          <h1>Add to favourites</h1>
          <button
            className="btn-circle bg-yellow-400 m-2 flex items-center justify-center"
            onClick={isFav? handleRemoveFromFavourites : handleAddToFavourites}
          >
            <FaStar style={{ color: isFav ? 'yellow' : 'white' }} />
          </button>
        </div>
        <div className="row-start-3 row-span-1 col-start-1 col-span-3 flex items-center justify-center">
          <h1>Recipe type: {recipe.description}</h1>
        </div>
      </div>

      <div className="grid grid-rows-1 grid-cols-2 grid-flow-col gap-4">
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg" alt="Recipe photo" /></figure>
        </div>
      </div>
      <div className="divider divider-success">Products</div>
      <div className="divider divider-success">Description</div>
      <div>{recipe.description}</div>
      <div className="divider divider-success">Comments</div>
    </div>
  );
}

export default View_recipe_page;
