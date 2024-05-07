import axios from "../api/axios";
import { RECIPES } from "../api/urls";
import { Product } from "../interface";


const FilterByGrams = async (products: Product[]) => {
  try {

    let NEW_URL = `${RECIPES}/filterByGrams`;
    console.log(products);
    const response = await axios.post(NEW_URL,products, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response || !response.data) {
      console.log("Error");
      return false;
    }


    return response.data;

  } catch (error) {
    console.error("Error fetching filtered recipes:", error);
    return false;
  }
};

export default FilterByGrams;