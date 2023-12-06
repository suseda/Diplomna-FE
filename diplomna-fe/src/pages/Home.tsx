import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Recipe from "../components/Recipe";
import FetchAllRecipes from "../service/FetchAllRecipes";

interface Recipe {
  name: string;
  likes: number;
  time_for_cooking: number;
  type: string;
}

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchRecipes, setSearchedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRecipes: Recipe[] = await FetchAllRecipes();
      setRecipes(fetchedRecipes);
      setSearchedRecipes(fetchedRecipes);
    };

    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedRecipes(filtered);
  };

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {searchRecipes.map((recipe, index) => (
          <Recipe
            key={index}
            name={recipe.name}
            photoUrl={"https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg"}
            likes={recipe.likes}
            time_for_cooking={recipe.time_for_cooking}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
