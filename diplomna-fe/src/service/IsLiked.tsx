import axios from "../api/axios";
import { RECIPES } from "../api/urls";


const IsLiked = async (recipeId: number, userId: number) => {
  try {

    let NEW_URL = `${RECIPES}/likeConnectionExist?recipeId=${recipeId}&userId=${userId}`;
  
    const response = await axios.get(NEW_URL, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response || !response.data) {
      console.log("Error");
      return false;
    }

    return response.data;

  } catch (error) {
    console.error("Error fetching IsLiked:", error);
    return false;
  }
};

export default IsLiked;