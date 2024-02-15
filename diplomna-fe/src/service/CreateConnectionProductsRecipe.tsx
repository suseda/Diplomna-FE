import { RECIPE_PRODUCT} from "../api/urls";
import axios from "../api/axios";
import { Product } from "../interface";

const CreateConnectionProductsRecipe = async(recipeId: number, products: Product[]) =>
{
    let NEW_URL = `${RECIPE_PRODUCT}/${recipeId}`;

    try {
        const response = await axios.post(NEW_URL, {body: `${products}`} ,{
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error creating product-recipe conection:", error);
      }
}

export default CreateConnectionProductsRecipe;