import axios from "axios";
import { USERS } from "../api/urls";

const FetchUsers = async () =>
{

    try {
        const response = await axios.get(USERS, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
          return [];
        }
    
        console.log(response.data);
    
        return response.data;
    
      } catch (error) {
        console.error("Error fetching user:", error);
        return [];
      }
}

export default FetchUsers;