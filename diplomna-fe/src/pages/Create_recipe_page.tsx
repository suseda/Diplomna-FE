import { useContext, useEffect, useState } from "react";
import { AuthContextValue, CreateRecipeInterface, Product, ProductNameProps } from "../interface";
import CreateProduct from "../service/CreateProduct";
import CheckBoxGroup from "../components/CheckBoxGroup";
import ProductLabel from "../components/ProductLabel";
import FetchProducts from "../service/FetchProducts";
import AuthContext from "../api/AuthProvider";
import CreateRecipeService from "../service/CreateRecipe";


function CreateRecipePage()
{

    const [recipeName,setRecipeName] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [timeForCooking,setTimeForCooking] = useState("");
    const [photo,setPhoto] = useState<File | null>(null);

    const [searchProduct,setSearchProduct] = useState("");
    const [productName,setProductName] = useState("");
    const [isNewProductCreated,setIsNewProductCreated] = useState(false);
    const [databaseProducts,setDatabaseProducts] = useState<ProductNameProps[]>([]);
    const [createProductName,setCreateProductName] = useState("");
    const [isSaveDisabled, setIsSaveDisabled] = useState(false);
    const [filterProducts,setFilterProducts] = useState<ProductNameProps[]>([]);
    const [grams,setGrams] = useState<number>(0);
    const [products,setProducts] = useState<Product[]>([]);

    const { auth } = useContext(AuthContext) as AuthContextValue;
    const user = auth.user;


    const CreateRecipe = async () =>
    {
        if(recipeName && description && type && timeForCooking && products.length > 0 && photo)
        {
            const newRecipe: CreateRecipeInterface = 
            {
                id: user.id,
                name: recipeName,
                likes: 0,
                time_for_cooking: Number(timeForCooking),
                type: type,
                description: description,
                owner_id: user.id,
                photo: photo,
                products: products
            };

            await CreateRecipeService(user.id,newRecipe);

            setRecipeName("");
            setDescription("");
            setType("");
            setTimeForCooking("");
            setPhoto(null);
            setProducts([]);

        }
        else
        {
            console.log("Please fill in all required information before saving.")
        }
    }

    const AddProduct = () => {
        const productExists = products.some(
            (product) => product.productName === productName
          );
    
          if(productExists || grams <= 0)
          {
            console.log("Grams cannot be negative number or product with these name already exist");
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
          }
          setProductName("");
          setGrams(0);
      };

      const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPhoto = e.target.files ? e.target.files[0] : null;
        setPhoto(selectedPhoto);
    };

    const handleCreateProduct = async (name: string) =>
    {
        await CreateProduct(name);   
        setIsNewProductCreated(!isNewProductCreated);

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
        (product) => product.name.toLowerCase() === word.toLowerCase()
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
      }, [isNewProductCreated]);


    return(

        <div className="bg-gradient-to-r from-orange-200 to-orange-300 h-screen">
            <div className="flex items-center p-2 justify-center">
                <div className="w-2/3">
                    <input className="border-solid border-2 border-black rounded-md w-full mb-4" type="text" placeholder="Enter recipe name" value={recipeName} onChange={(e) => {setRecipeName(e.target.value)}}/>
                    <textarea className="border-solid border-2 border-black rounded-md w-full mb-4"  placeholder="Enter recipe description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    <input className="border-solid border-2 border-black rounded-md w-full mb-4" placeholder="Enter time for cooking in minutes" value={timeForCooking} onChange={(e) => {setTimeForCooking(e.target.value)}}  
                    onKeyPress={(e) => {
                    const keyCode = e.keyCode || e.which;
                    if (keyCode < 48 || keyCode > 57) {
                      e.preventDefault();
                    }
  }}/>
                    <div className="grid grid-rows-subgrid gap-4 row-span-3 rounded-md w-full mb-4">   
                        <CheckBoxGroup options={['Soup', 'Meat', 'Vegan', 'Dessert']} handleType={getType} />
                    </div>

                    <input type="file" onChange={handlePhotoChange} />
                </div>
            </div>

            <div className="divider divider-black">Products</div>
            <div>
                <input className="border-solid border-2 border-black rounded-md w-1/5"  placeholder="Enter grams" value={grams} onChange={(e) => setGrams(Number(e.target.value))} 
                onKeyPress={(e) => {
                const keyCode = e.keyCode || e.which;
                if (keyCode < 48 || keyCode > 57) {
                  e.preventDefault();
                }
  }} />
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
                <button className="btn bg-green-500" disabled={isSaveDisabled} onClick={() =>{handleCreateProduct(createProductName)}}>Save</button>
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

