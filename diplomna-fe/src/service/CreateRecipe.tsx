import { RECIPES } from "../api/urls";
import axios from "../api/axios";
import { CreateRecipeInterface } from "../interface";


const CreateRecipeService = async(user_id: number,recipe: CreateRecipeInterface) =>
{
    let NEW_URL = `${RECIPES}/${user_id}`;

    try {
        const response = await axios.post(NEW_URL, recipe, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
}

export default CreateRecipeService;