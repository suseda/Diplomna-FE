import axios from "../api/axios";
import { USER_FAVOURITES } from "../api/urls";

const FetchUserFavourites = async (id:number) =>
{
    const NEW_URL = `${USER_FAVOURITES}/${id}`;

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
        console.error("Error fetching user favourites:", error);
        return [];
      }
}

export default FetchUserFavourites;