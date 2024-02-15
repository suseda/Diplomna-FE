import { UPDATE_LIKES } from "../api/urls";
import axios from "../api/axios";


const UpdateLikes = async(recipeId: number,likes: number) =>
{
    let NEW_URL = `${UPDATE_LIKES}/${recipeId}?likes=${likes}`;

    try {
        const response = await axios.patch(NEW_URL, null,{
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error updating recipe likes:", error);
      }
}

export default UpdateLikes;