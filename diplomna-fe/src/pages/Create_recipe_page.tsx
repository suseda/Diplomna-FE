import CheckBoxGroup from "../components/CheckBoxGroup";

function CreateRecipePage()
{
    return(
        <div>
            <div>
                <input type="text" placeholder="Enter recipe name" />
                <input type="text" placeholder="Enter recipe description" />
                <input type="text" placeholder="Enter time for cooking" />
                
                <CheckBoxGroup options={['Soup', 'Meat', 'Vegan', 'Dessert']} />
                
                <button className="btn bg-green-500">Save</button>
            </div>
    </div>
    )
}

export default CreateRecipePage;