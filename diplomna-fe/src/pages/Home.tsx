import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Recipe from "../components/Recipe";


function Home() {

  const recipes = [
    {
      title: 'Tarator',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg',
      likes: 10,
      cookingTime: 30,
    },
    {
      title: 'Tarator',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg',
      likes: 10,
      cookingTime: 30,
    },
    {
      title: 'Tarator',
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg',
      likes: 10,
      cookingTime: 30,
    },
  ];


  return (
    <div>
      <NavBar />
      {recipes.map((recipe, index) => (
        <Recipe
          key={index}
          title={recipe.title}
          photoUrl={recipe.photoUrl}
          likes={recipe.likes}
          cookingTime={recipe.cookingTime}
        />
      ))}
      <Footer />
    </div>
  )
}

export default Home
