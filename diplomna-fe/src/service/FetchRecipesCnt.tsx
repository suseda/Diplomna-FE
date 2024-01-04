import axios from "../api/axios";
import { RECIPES } from "../api/urls";

const FetchRecipesCnt = async (searchedWord: string): Promise<number> => {
  try {
    
    let NEW_URL = `${RECIPES}`;

    if(searchedWord !== "")
      NEW_URL = `${RECIPES}/${searchedWord}`;
    
    const response = await axios.get(NEW_URL, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response || !response.data) {
      console.log("Error");
      return 0;
    }

    console.log(response.data);

    return response.data;

  } catch (error) {
    console.error("Error fetching recipes count:", error);
    return 0;
  }
};

export default FetchRecipesCnt;