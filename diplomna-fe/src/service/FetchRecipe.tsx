import axios from "../api/axios";
import { RECIPES } from "../api/urls";

const FetchRecipe = async (id: number) =>
{
    try {

        let NEW_URL = `${RECIPES}/recipeId?Id=${id}`;
      
        const response = await axios.get(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response || !response.data) {
          console.log("Error");
          return null;
        }
    
        console.log(response.data);
    
        return response.data;
    
      } catch (error) {
        console.error("Error fetching recipe:", error);
        return null;
      }

}

export default FetchRecipe;