import { useEffect, useState } from "react";
import { Product, ProductNameProps, RecipeProps } from "../interface";
import FetchProducts from "../service/FetchProducts";
import ProductLabel from "../components/ProductLabel";
import FilterByGrams from "../service/FilterByGrams";
import Recipe from "../components/Recipe";

const SearchByGrams = () =>
{
    const [products,setProducts] = useState<ProductNameProps[]>([]);
    const [productsForFilter,setProductsForFilter] = useState<Product[]>([]);
    const [recipes,setRecipes] = useState<RecipeProps[]>([]);
    const [productName,setProductName] = useState("");
    const [grams,setGrams] = useState<number>(0);


    const removeProduct = (productNameToRemove: string) => {
        setProductsForFilter((prevProducts) =>
          prevProducts.filter(
            (product) => product.productName !== productNameToRemove
          )
        );
      };

    const filterFunction = async (productsFilter : Product[]) =>
    {
        const filteredRecipes: RecipeProps[] = await FilterByGrams(productsFilter);   
        console.log(filteredRecipes);
        setRecipes(filteredRecipes);
    }

    const AddProduct = () => {

      const productExists = productsForFilter.some(
        (product) => product.productName === productName
      );

      if(productExists || grams <= 0)
      {
        console.log("Grams cannot be negative number or product with these name already exist");
        console.log(productsForFilter);
      }
      else
      { 
        if(products.length > 0)
        {
            if (productName && grams) 
            {
                let product: Product = {
                    productName: productName,
                    grams: grams,
                };
                setProductsForFilter((products) => [...products, product]);
            }
        }
        else
        {
            let product: Product = {
                productName: productName,
                grams: grams,
            };
            setProductsForFilter([product]);
        }
      }
      setProductName("");
      setGrams(0);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await FetchProducts();
            setProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchData();
      }, []);


    return(
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-green-400 h-screen">
            <div className="flex items-center justify-center">
            <input className="border-solid border-2 border-black rounded-md w-1/5"  placeholder="Enter grams" value={grams} onChange={(e) => setGrams(Number(e.target.value))} onKeyPress={(e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault();
    }
  }}/>
                <select className="select select-bordered w-1/4 m-2 bg-green-500 rounded-md border-solid border-2 border-black" value={productName} onChange={(e) => {setProductName(e.target.value)}}>
                    {products.map((product, _index) =>(
                            <option><a>{product.name}</a></option>
                        ))
                        }
                </select>
              <button className="btn bg-green-500 border-solid border-2 border-black w-1/4 m-2" onClick={AddProduct}>Add product</button>
            </div>
            <div>
            {Array.isArray(productsForFilter) && productsForFilter.length > 0 ? (
                productsForFilter.map((product, index) => (
                    <ProductLabel key={index} productName={product.productName} grams={product.grams} onRemove={removeProduct}/>
                ))
                ) : (
                <p>You must add some products to filter by.</p>
                )}
            </div>
            <div className="flex items-center justify-center">
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/2" disabled={ productsForFilter.length > 0 ? false : true} onClick={() =>{filterFunction(productsForFilter)}}>Filter</button>
            </div>

            <div>
            {Array.isArray(recipes) && recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <Recipe
                  key={index}
                  id={recipe.id}
                  name={recipe.name}
                  photoUrl={'https://upload.wikimedia.org/wikipedia/commons/1/19/TaratorBg.jpg'}
                  likes={recipe.likes}
                  time_for_cooking={recipe.time_for_cooking} 
                  type={recipe.type} 
                  description={recipe.description}            />
          ))) : (
                <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchByGrams;