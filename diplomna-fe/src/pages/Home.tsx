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
  const [type, setType] = useState<string>("None");
  const [loading, setLoading] = useState<boolean>(true); 

  const handleSearch = async (searchedWord: string, type: string) => {
    setLoading(true); 
    setSearchWord(searchedWord);
    setType(type);
    const [pages, recipes] = await Promise.all([
      FetchRecipesCnt(searchedWord, type),
      FetchAllRecipes(searchedWord, type, currentPage)
  ]);

    const newTotalPages = pages;
    if (currentPage > newTotalPages) {
      setCurrentPage(0);
    }

    setSearchedRecipes(recipes);
    if(pages == 0)
      setTotalPages(1)
    else
      setTotalPages(pages+1);
    setLoading(false); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleSearch(searchedWord,type);
  }, [currentPage]);

  return (
    <div className='bg-gradient-to-r from-orange-200 to-orange-300'>
      <NavBar onSearch={handleSearch}/>
      {loading ? ( 
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className='h-screen'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 flex-grow bg-gradient-to-r">
            {Array.isArray(searchRecipes) && searchRecipes.length > 0 ? (
              searchRecipes.map((recipe, index) => (
                <Recipe
                  key={index}
                  id={recipe.id}
                  name={recipe.name}
                  photo={recipe.photoText}
                  likes={recipe.likes}
                  time_for_cooking={recipe.time_for_cooking} 
                  type={recipe.type} 
                  description={recipe.description} />
              ))
            ) : (
              <div className='h-screen'>
                <p>No recipes found.</p>
              </div>
            )}
          </div>
          <div className='bottom-0'>
          {Array.isArray(searchRecipes) && searchRecipes.length > 0 ? (
              <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                <Footer />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
