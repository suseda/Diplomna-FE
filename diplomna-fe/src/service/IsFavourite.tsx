import axios from "../api/axios";
import { RECIPES } from "../api/urls";


const IsFavourite = async (recipeId: number, userId: number) => {
  try {

    let NEW_URL = `${RECIPES}/favConnectionExist?recipeId=${recipeId}&userId=${userId}`;
  
    const response = await axios.get(NEW_URL, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response || !response.data) {
      console.log("Error");
      return false;
    }

    console.log(response.data);

    return response.data;

  } catch (error) {
    console.error("Error fetching IsFav:", error);
    return false;
  }
};

export default IsFavourite;