import { RECIPES } from "../api/urls"
import axios from "../api/axios";

const UpdateUserFavourites = async (userId: number, recipeId: number) =>
{
    let NEW_URL = `${RECIPES}/${userId}/favourites/${recipeId}`;

    try {
        const response = await axios.post(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error updating favourite recipe:", error);
      }

}

export default UpdateUserFavourites;