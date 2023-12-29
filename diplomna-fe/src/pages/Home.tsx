import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FetchAllRecipes from '../service/FetchAllRecipes';
import Recipe from '../components/Recipe';
import Pagination from '../components/Pagination';
import FetchRecipesCnt from '../service/FetchRecipesCnt';
import { RecipeProps } from '../interface';

function Home() {
  const [searchRecipes, setSearchedRecipes] = useState<RecipeProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchedWord,setSearchWord] = useState<string>('');

  const handleSearch = async (searchedWord: string) => {
    setSearchWord(searchedWord);
    const recipes: RecipeProps[] = await FetchAllRecipes(searchedWord, currentPage);
    const pages: number = await FetchRecipesCnt(searchedWord);
    setSearchedRecipes(recipes);
    setTotalPages(pages+1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleSearch(searchedWord);
  }, [currentPage]);

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 flex-grow">
        {Array.isArray(searchRecipes) && searchRecipes.length > 0 ? (
          searchRecipes.map((recipe, index) => (
            <Recipe
              key={index}
              id={recipe.id}
              name={recipe.name}
              photoUrl={'https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg'}
              likes={recipe.likes}
              time_for_cooking={recipe.time_for_cooking} 
              type={recipe.type} 
              description={recipe.description}            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </div>
  );
}

export default Home;
