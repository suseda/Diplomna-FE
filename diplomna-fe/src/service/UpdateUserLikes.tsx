import { RECIPES } from "../api/urls"
import axios from "../api/axios";

const UpdateUserLikes = async (userId: number, recipeId: number,flag: boolean) =>
{
    let NEW_URL = `${RECIPES}/${userId}/like/${recipeId}`;
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
        console.error("Error updating like recipe:", error);
      }
    }
    else
    {
      NEW_URL = `${RECIPES}/delete/${userId}/like/${recipeId}`;
      try {
        const response = await axios.delete(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error delete like recipe:", error);
      }
    }


}

export default UpdateUserLikes;