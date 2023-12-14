import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Recipe from "../components/Recipe";
import FetchAllRecipes from "../service/FetchAllRecipes";
import PaginationComponent from "../components/Pagination";

interface Recipe {
  name: string;
  likes: number;
  time_for_cooking: number;
  type: string;
}

function Home() {
  const [searchRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleSearch = async (term: string) => {
    const recipes: Recipe[] = await FetchAllRecipes(term, currentPage);
    setSearchedRecipes(recipes);
  };

  useEffect(() => {
    handleSearch("");
  }, [currentPage]);

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.isArray(searchRecipes) && searchRecipes.length > 0 ? (
          searchRecipes.map((recipe, index) => (
            <Recipe
              key={index}
              name={recipe.name}
              photoUrl={"https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg"}
              likes={recipe.likes}
              time_for_cooking={recipe.time_for_cooking}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <PaginationComponent cnt={2}/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;