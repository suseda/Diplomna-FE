import { RECIPES } from "../api/urls"
import axios from "../api/axios";

const UpdateUserFavourites = async (userId: number, recipeId: number,flag: boolean) =>
{
    let NEW_URL = `${RECIPES}/${userId}/favourites/${recipeId}`;
    if(flag)
    {
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
    else
    {
      NEW_URL = `${RECIPES}/delete/${userId}/favourites/${recipeId}`;
      try {
        const response = await axios.delete(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error delete favourite recipe:", error);
      }
    }


}

export default UpdateUserFavourites;