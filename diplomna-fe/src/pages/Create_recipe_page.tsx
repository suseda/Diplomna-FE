import { useEffect, useState } from "react";
import { Product, ProductNameProps } from "../interface";
import CreateProduct from "../service/CreateProduct";
import CheckBoxGroup from "../components/CheckBoxGroup";
import ProductLabel from "../components/ProductLabel";
import FetchProducts from "../service/FetchProducts";

function CreateRecipePage()
{

    const [recipeName,setRecipeName] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [timeForCooking,setTimeForCooking] = useState("");

    const [searchProduct,setSearchProduct] = useState("");
    const [productName,setProductName] = useState("");
    const [databaseProducts,setDatabaseProducts] = useState<ProductNameProps[]>([]);
    const [createProductName,setCreateProductName] = useState("");
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const [filterProducts,setFilterProducts] = useState<ProductNameProps[]>([]);
    const [grams,setGrams] = useState("");
    const [products,setProducts] = useState<Product[]>([]);


    const CreateRecipe = () =>
    {
        if(recipeName && description && type && timeForCooking && products.length > 0)
        {
            console.log(recipeName);
            console.log(description);
            console.log(type);
            console.log(timeForCooking);
            console.log(products);
            setRecipeName("");
            setDescription("");
            setType("");
            setTimeForCooking("");
            setProducts([]);

        }
        else
        {
            console.log("Please fill in all required information before saving.")
        }
    }

    const AddProduct = () => {
        if(products.length > 0)
        {
            if (productName && grams) 
            {
                let product: Product = {
                    productName: productName,
                    grams: grams,
                };
                setProducts((products) => [...products, product]);
            }
        }
        else
        {
            let product: Product = {
                productName: productName,
                grams: grams,
            };
            setProducts([product]);
        }
        setProductName("");
        setGrams("");
      };

    const HandleCreateProduct = async (name: string) =>
    {
        console.log(name);
        //await CreateProduct(name);
    }

    const removeProduct = (productNameToRemove: string) => {
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product.productName !== productNameToRemove
          )
        );
      };

    const CheckExistingProducts = (e: { target: { value: any }; }) => {
      const word = e.target.value;
      setCreateProductName(word);
  
      const isProductExist = databaseProducts.some(
        (product) => product.name.toLowerCase() === word
      );
  
      setIsSaveDisabled(isProductExist);
    };

    const FilterProducts = (e: { target: { value: any }; }) => {
        const word = e.target.value.toLowerCase(); 
        setSearchProduct(word);
    
        const filter = databaseProducts.filter((product) =>
          product.name.toLowerCase().includes(word)
        );
        setFilterProducts(filter);
      };

    const getType: (option: string) => void = (option: string) =>
    {
        setType(option);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await FetchProducts();
            setDatabaseProducts(data);
            setFilterProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchData();
      }, [databaseProducts]);


    return(

        <div className="bg-gradient-to-r from-green-200 to-green-400">
            <div className="flex items-center p-2 justify-center">
                <div className="w-2/3">
                    <input className="border-solid border-2 border-black rounded-md w-full mb-4" type="text" placeholder="Enter recipe name" value={recipeName} onChange={(e) => {setRecipeName(e.target.value)}}/>
                    <textarea className="border-solid border-2 border-black rounded-md w-full mb-4"  placeholder="Enter recipe description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    <input className="border-solid border-2 border-black rounded-md w-full mb-4" type="text" placeholder="Enter time for cooking" value={timeForCooking} onChange={(e) => {setTimeForCooking(e.target.value)}}/>
                    <div className="grid grid-rows-subgrid gap-4 row-span-3 rounded-md w-full mb-4">   
                        <CheckBoxGroup options={['Soup', 'Meat', 'Vegan', 'Dessert']} handleType={getType} />
                    </div>
                </div>
            </div>

            <div className="divider divider-black">Products</div>
            <div>
                <input className="border-solid border-2 border-black rounded-md w-1/5" type="text" placeholder="Enter grams" value={grams} onChange={(e) => setGrams(e.target.value)} />
                <select className="select select-bordered w-1/4 m-2 bg-green-500 rounded-md border-solid border-2 border-black" value={productName} onChange={(e) => {setProductName(e.target.value)}}>
                    {databaseProducts.map((product, _index) =>(
                            <option><a>{product.name}</a></option>
                        ))
                        }
                </select>
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/4 m-2" onClick={AddProduct}>Add product</button>
                {/* {<button className="btn bg-green-500 border-solid border-2 border-black w-1/4 m-2" onClick={() => HandleCreateProduct(productName)}>Create product</button>}  */}
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/4 m-2" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>Create product</button>
                <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create new product!</h3>
                    <input className="py-4 rounded-md" type="text" placeholder="Product name" value={createProductName} onChange={CheckExistingProducts} />
                </div>
                <button className="btn disabled: bg-slate-500" disabled={isSaveDisabled} onClick={() =>{HandleCreateProduct(createProductName)}}>Save</button>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
                </dialog>
            </div>
            <div>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                    <ProductLabel key={index} productName={product.productName} grams={product.grams} onRemove={removeProduct}/>
                ))
                ) : (
                <p>You must add some products.</p>
                )}
            </div>
            <div className="flex items-center justify-center">
                <button className="btn bg-green-500 border-solid border-2 border-black w-1/2" onClick={CreateRecipe}>Save</button>
            </div>
        </div>
    )
}

export default CreateRecipePage;

