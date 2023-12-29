import axios from "../api/axios";
import { ALL_RECIPES_WITH_PAGINATION_URL } from "../api/urls";
import { RecipeProps } from "../interface";


const FetchAllRecipes = async (searchedWord: string, page: number): Promise<RecipeProps[]> => {
  try {

    let NEW_URL = `${ALL_RECIPES_WITH_PAGINATION_URL}?page=${page}`;

    if(searchedWord !== "")
      NEW_URL = `${ALL_RECIPES_WITH_PAGINATION_URL}WithSearch?page=${page}&searchedWord=${searchedWord}`;

  
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
