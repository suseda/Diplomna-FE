import { RECIPES } from "../api/urls";
import axios from "../api/axios";


const FetchProductGrams = async(recipeId: number) =>
{
    let NEW_URL = `${RECIPES}/recipe-products?recipeId=${recipeId}`;

    try {
        const response = await axios.get(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
          return [];
        }

        return response.data;

    
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
}

export default FetchProductGrams;