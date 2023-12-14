import axios from "axios";
import { USER_RECIPES } from "../api/urls";

const FetchUserRecipes = async (id:number) =>
{
    const NEW_URL = `${USER_RECIPES}/${id}`;

    try {
        const response = await axios.get(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
          return [];
        }
    
        console.log(response.data);
    
        return response.data;
    
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        return [];
      }
}

export default FetchUserRecipes;