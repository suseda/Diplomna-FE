import { useContext, useEffect, useState } from "react";
import { FaHeart, FaStar, FaCheck  } from "react-icons/fa";
import UpdateLikes from "../service/UpdateLikes";
import AuthContext from "../api/AuthProvider";
import UpdateUserFavourites from "../service/UpdateUserFavourites";
import FetchRecipe from "../service/FetchRecipe";
import { useParams } from "react-router-dom";
import { AuthContextValue, Product, RecipeProps } from "../interface";
import FetchProductGrams from "../service/FetchProductGrams";
import IsFavourite from "../service/IsFavourite";
import UpdateUserLikes from "../service/UpdateUserLikes";
import IsLiked from "../service/IsLiked";

function View_recipe_page() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext) as AuthContextValue;
  const [recipe, setRecipe] = useState({} as RecipeProps);
  const [isLiked,setIsLiked] = useState(false);
  const [isFav,setIsFav] = useState(false);
  const [products,setProducts] = useState<Product[]>([]);
  const user = auth.user;
  const [recipeLikes, setRecipeLikes] = useState(0);
 

  useEffect(() => {
    const fetchData = async () => {
      try {

        const fetchRecipePromise: RecipeProps = await FetchRecipe(Number(id));
        const fetchProductsGramsPromise: Product[] = await FetchProductGrams(Number(id));
        const isFavRecipePromise: boolean = await IsFavourite(Number(id), user.id);
        const isLikedRecipePromise: boolean = await IsLiked(Number(id), user.id);
        const [data, productsData,isFavRecipe, isLikedRecipe] = await Promise.all([
          fetchRecipePromise,
          fetchProductsGramsPromise,
          isFavRecipePromise,
          isLikedRecipePromise
        ]);
        
        setRecipe(data);
        setProducts(productsData);
        setIsFav(isFavRecipe);
        setIsLiked(isLikedRecipe)
        setRecipeLikes(data.likes);

      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchData();
  }, [id, recipeLikes]);

  const handleLike = async () => {
    let likes: number;
    if (isLiked)
      likes = recipeLikes - 1;
    else
      likes = recipeLikes + 1;

    

    const updateLikesPromise = await UpdateLikes(recipe.id,likes);
    const updateLikesConnectionPromise = await UpdateUserLikes(user.id, recipe.id,!isLiked);

    await Promise.all([
      updateLikesPromise,
      updateLikesConnectionPromise
    ]);
    
    setIsLiked(!isLiked);
    setRecipeLikes(likes);
  };

  
  const handleAddToFavourites = async () => {
    await UpdateUserFavourites(user.id,recipe.id,true);
    setIsFav(true);
  };

  const handleRemoveFromFavourites = async () => {
    await UpdateUserFavourites(user.id,recipe.id,false);
    setIsFav(false);
  }

  return (
    <div className="bg-gradient-to-r from-green-200 to-green-300">
      <div className="grid grid-cols-6 grid-rows-1 gap-4 mb-4">
        <div className="col-start-2 col-span-4 row-start-1 row-span-1 bg-green-500 rounded-md h-auto flex items-center justify-center">
          <h1>{recipe.name}</h1>
        </div>
      </div>

      <div className="grid grid-rows-1 grid-cols-2 gap-4">
        <div className="grid grid-rows-4">
            <div className="grid-row-1 flex items-center justify-center">
              <h1>{recipe.likes}</h1>
              <button
                  className="btn-circle bg-rose-400 m-2 flex items-center justify-center"
                  onClick={handleLike}
              >
                  <FaHeart  style={{ color: isLiked ? 'red' : 'white' }} />
              </button>
            </div>

            <div className="grid-row-2 flex items-center justify-center">
              <h1>Add to favourites</h1>
              <button
                className="btn-circle bg-yellow-400 m-2 flex items-center justify-center"
                onClick={isFav? handleRemoveFromFavourites : handleAddToFavourites}
              >
                <FaStar style={{ color: isFav ? 'yellow' : 'white' }} />
              </button>
            </div>

            <div className="grid-row-3 flex items-center justify-center">
              <h1>Recipe type: {recipe.type}</h1>
            </div>

            <div className="grid-row-4 flex items-center justify-center">
              <h1>Time for cooking: {recipe.time_for_cooking} mins</h1>
            </div>
        </div>
        <div className="grid-cols-2 grid-flow-col gap-4 flex items-center justify-center">
          <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="rounded-md"><img src="https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg" alt="Recipe photo" /></figure>
          </div>
        </div>
      </div> 
      <div className="divider divider-success">Products</div>
      {
        Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
              <div className="flex items-center justify-center">
                <FaCheck style={{ color: 'green' }} />
                <p className="ml-2">{product.grams} grams {product.productName}</p>
              </div>
          ))
          ) : (
          <p>No products.</p>
          )
      }
      <div className="divider divider-success">Description</div>
      <div>{recipe.description}</div>
      <div className="divider divider-success">Comments</div>
    </div>
  );
}

export default View_recipe_page;
