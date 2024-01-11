import { useState } from "react";
import { Product } from "../interface";
import CreateProduct from "../service/CreateProduct";
import CheckBoxGroup from "../components/CheckBoxGroup";
import ProductLabel from "../components/ProductLabel";

function CreateRecipePage()
{

    const [searchProduct,setSearchProduct] = useState("");
    const [productName,setProductName] = useState("Meso");
    const [grams,setGrams] = useState("");
    const [products,setProducts] = useState<Product[]>([]);
    

    let a = ['Soup', 'Meat', 'Vegan', 'Dessert'];


    const CreateRecipe = () =>
    {

    }

    const AddProduct = () => {
        console.log(products);
        if(products.length > 0)
        {
            if (productName && grams) 
            {
                let product: Product = {
                    name: productName,
                    grams: grams,
                };
                setProducts((products) => [...products, product]);
            }
        }
        else
        {
            let product: Product = {
                name: productName,
                grams: grams,
            };
            setProducts([product]);
        }
        setProductName("");
        setGrams("");
      };

    const HandleCreateProduct = async (name: string) =>
    {
        await CreateProduct(name);
    }

    const FilterProducts = (e: { target: { value: any; }; }) =>
    {
        const word = e.target.value;
        setSearchProduct(word);
    }

    const fetchProducts = () => 
    {
        
    }


    return(

        <div className="bg-gradient-to-r from-green-200 to-green-400">
            <div className="grid grid-rows-3 grid-flow-col gap-4 p-2">
                <input className="border-solid border-2 border-black rounded-md" type="text" placeholder="Enter recipe name" />
                <textarea className="border-solid border-2 border-black rounded-md"  placeholder="Enter recipe description" />
                <input className="border-solid border-2 border-black rounded-md" type="text" placeholder="Enter time for cooking" />
                <div className="grid grid-rows-subgrid gap-4 row-span-3 rounded-md">   
                    <CheckBoxGroup options={['Soup', 'Meat', 'Vegan', 'Dessert']} />
                </div>
                
            </div>

            <div className="divider divider-black">Products</div>
            <div>
                <input className="border-solid border-2 border-black rounded-md w-1/4" type="text" placeholder="Enter grams" value={grams} onChange={(e) => setGrams(e.target.value)} />
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 bg-green-500 rounded-md border-solid border-2 border-black">List of products</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-green-500 rounded-box w-52">
                        <input className="bg-green-500 text-black placeholder:italic placeholder:text-black" type="text" placeholder="Search..." value={searchProduct} onChange={FilterProducts} />
                        {a.map((name, _index) =>(
                            <li><a>{name}</a></li>
                        ))
                        }
                    </ul>
                </div>
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/4 m-2" onClick={AddProduct}>Add product</button>
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/4" onClick={() => HandleCreateProduct(productName)}>Create product</button>
            </div>
            <div>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                    <ProductLabel key={index} name={product.name} grams={product.grams}/>
                ))
                ) : (
                <p>Add products.</p>
                )}
            </div>
            <div className="flex items-center justify-center">
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/2" onClick={CreateRecipe}>Save</button>
            </div>
        </div>
    )
}

export default CreateRecipePage;

