import { useState } from "react";
import CheckBox from "./components/CheckBox"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import CheckBoxGroup from "./components/CheckBoxGroup";

function App() {

 

  return (
    <div>
      <NavBar />
      <div>
        <input type="text" placeholder="Enter name" />
        <input type="text" placeholder="Enter email" />
        <input type="text" placeholder="Enter password" />
        <button className="btn bg-blue-300">Save</button>
      </div>

      <div>
        <input type="text" placeholder="Enter recipe name" />
        <input type="text" placeholder="Enter recipe description" />
        <input type="text" placeholder="Enter time for cooking" />
        
        <CheckBoxGroup options={['Soup', 'Meat', 'Vegan', 'Dessert']} />
        
        <button className="btn bg-blue-300">Save</button>
      </div>
      <Footer />
    </div>
  )
}

export default App
