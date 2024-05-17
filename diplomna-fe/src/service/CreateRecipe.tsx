import { RECIPES } from "../api/urls";
import axios from "../api/axios";
import { CreateRecipeInterface } from "../interface";

const CreateRecipeService = async (user_id: number, recipe: CreateRecipeInterface) => {
    let NEW_URL = `${RECIPES}/${user_id}`;

    try {
        const formData = new FormData();
        formData.append("id", String(recipe.id));
        formData.append("name", recipe.name);
        formData.append("likes", String(recipe.likes));
        formData.append("time_for_cooking", String(recipe.time_for_cooking));
        formData.append("type", recipe.type);
        formData.append("description", recipe.description);
        formData.append("owner_id", String(recipe.owner_id));

        // Check if the photo exists and convert it to base64
        if (recipe.photo) {
            const base64String = await convertFileToBase64(recipe.photo);
            formData.append("photo", base64String);
        }

        formData.append("products", JSON.stringify(recipe.products));


        const response = await axios.post(NEW_URL, formData);

        if (!response) {
            console.log("Error");
        }

    } catch (error) {
        console.error("Error creating recipe:", error);
    }
}

// Function to convert file to base64
const convertFileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result?.toString().split(',')[1] || '');
        };
        reader.onerror = (error) => reject(error);
    });
}

export default CreateRecipeService;
