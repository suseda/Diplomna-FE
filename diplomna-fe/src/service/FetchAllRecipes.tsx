import axios from "../api/axios";
import { ALL_RECIPES_WITH_PAGINATION_URL } from "../api/urls";

interface Recipe {
  title: string;
  likes: number;
  cookingTime: number;
  type: string;
}

const FetchAllRecipes = async (term: string, page: number = 0): Promise<Recipe[]> => {
  try {
    
    console.log(page);

    let NEW_URL = `${ALL_RECIPES_WITH_PAGINATION_URL}/${page}`;

    if(term !== "")
      NEW_URL = `${ALL_RECIPES_WITH_PAGINATION_URL}/${page}/${term}`;


    console.log(NEW_URL);  
    const response = await axios.get(NEW_URL, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response || !response.data) {
      console.log("Error");
      return [];
    }

    console.log(response.data);

    return response.data;

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export default FetchAllRecipes;
