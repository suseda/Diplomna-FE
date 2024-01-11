import { PRODUCT } from "../api/urls";
import axios from "../api/axios";


const CreateProduct = async(name: string) =>
{
    let NEW_URL = `${PRODUCT}/${name}`;

    try {
        const response = await axios.post(NEW_URL, {
          headers: { 'Content-Type': 'application/json' }
        });
    
        if (response === null || response === undefined) {
          console.log("Error");
        }

    
      } catch (error) {
        console.error("Error creating product:", error);
      }
}

export default CreateProduct;