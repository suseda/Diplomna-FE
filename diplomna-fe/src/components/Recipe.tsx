import { FC } from 'react';
import { FaHeart, FaClock } from 'react-icons/fa';

interface RecipeProps {
  title: string;
  photoUrl: string;
  likes: number;
  cookingTime: number;
}

const Recipe: FC<RecipeProps> = ({ title, photoUrl, likes, cookingTime }) => {
  /*return (
    <div className="border border-green-500 p-4 rounded-md m-4 max-w-xs">
        
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <img src={photoUrl} alt={`Photo of ${title}`} className="w-full h-40 object-cover rounded-md mb-2" />
      <div className="flex items-center">
        <span className="mr-2">
          <FaHeart /> {likes} Likes
        </span>
        <span>
          <FaClock /> {cookingTime} min
        </span>
      </div>
    </div>
  );*/
  return ( 
    <div className="card w-96 bg-base-100 shadow-xl border border-green-500 p-4 rounded-md m-4 max-w-xs">
        <div className="bg-green-500 rounded-md text-center">
          <h2 className="card-title" >{title}</h2>
        </div>
        <figure className="rounded-md"><img src={photoUrl} alt="Recipe photo" /></figure>
        <div className="card-body">
            <div className="card-actions justify-end w-max">
                <div className="flex items-center">
                    <span className="mr-2">
                        <FaHeart /> {likes} Likes
                    </span>
                    <span>
                        <FaClock /> {cookingTime} min
                    </span>
                </div>
                <button type="submit" className="btn bg-green-500 w-25">View Recipe</button>
            </div>
        </div>
    </div>
  );
};

export default Recipe;
