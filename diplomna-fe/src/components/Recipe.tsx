import { FC } from 'react';
import { FaHeart, FaClock } from 'react-icons/fa';


interface RecipeProps {
  name: string;
  photoUrl: string;
  likes: number;
  time_for_cooking: number;
  
}

const Recipe: FC<RecipeProps> = ({ name, photoUrl, likes, time_for_cooking }) => 
{
  return ( 
    <div className="card w-96 bg-base-100 shadow-xl border border-green-500 p-4 rounded-md m-4 max-w-xs">
        <div className="bg-green-500 rounded-md">
          <h2 className="card-title text-center" >{name}</h2>
        </div>
        <figure className="rounded-md"><img src={photoUrl} alt="Recipe photo" /></figure>
        <div className="card-body">
            <div className="card-actions justify-end w-max">
                <div className="flex items-center">
                    <span className="mr-2">
                        <FaHeart /> {likes} Likes
                    </span>
                    <span>
                        <FaClock /> {time_for_cooking} min
                    </span>
                </div>
                <button type="submit" className="btn bg-green-500 w-25">View Recipe</button>
            </div>
        </div>
    </div>
  );
};

export default Recipe;
