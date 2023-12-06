import axios from "../api/axios";
import { ALL_RECIPES_URL } from "../api/urls";

interface Recipe {
  title: string;
  likes: number;
  cookingTime: number;
  type: string;
}

const FetchAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get(ALL_RECIPES_URL, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response === null || response === undefined) {
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