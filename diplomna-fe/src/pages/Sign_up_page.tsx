import { useState } from "react";
import signupSchema from "../validation/signup_validation";
import axios from "../api/axios";
import {REGISTER_URL} from "../api/urls";



function Sign_up_page() {

    const [SignupForm,SetSignupForm] = useState({
        "name": "",
        "email": "",
        "password": ""
    })
    const [validationError, setValidationError] = useState(null);
    

    const FormChange = (event: { target: { name: any; value: any; }; }) => {
  
        const { name, value } = event.target;
        SetSignupForm((prevForm) => ({
          ...prevForm,
          [name]: value
        }));
      };
    
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const validData = signupSchema.parse(SignupForm);
            setValidationError(null);
            SetSignupForm({name:'',email:'',password:''});
            console.log("Valid data:", validData);
            const response = await axios.post(REGISTER_URL , JSON.stringify(SignupForm), {
                headers: {'Content-Type': 'application/json' }
            });
            console.log(JSON.stringify(response));
          } catch (error: any) {
            console.error("Validation error:", error.message);
            setValidationError(error.message);
          }
      };


    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 to-orange-300">
        <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1">Name:</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        required id="name" name="name" 
                        className="w-full border-2 border-gray-300 focus:border-blue-300 focus:outline-none rounded-md px-3 py-2 " 
                        onChange={FormChange} 
                        value={SignupForm.name} 
                    />

                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email:</label>
                    <input
                        type="text" 
                        placeholder="Enter your email" 
                        required id="email" name="email" 
                        className="w-full border-2 border-gray-300 focus:border-blue-300 focus:outline-none rounded-md px-3 py-2 " 
                        onChange={FormChange} 
                        value={SignupForm.email} 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">Password:</label>
                    <input 
                        type="password"
                        placeholder="Enter your password" 
                        required id="password" name="password" 
                        className="w-full border-2 border-gray-300 focus:border-blue-300 focus:outline-none rounded-md px-3 py-2 " 
                        onChange={FormChange} 
                        value={SignupForm.password} 
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer" 
                        value="Sign up" 
                    />
                </div>
                <div className="w-1/4 flex items-center justify-center">{validationError && <p className="text-red-500">{validationError}</p>}</div>
                <div className="text-center">
                    <a className="text-blue-500" href="/login">Already have an acount?</a>
                </div>
            </form>
        </div>
    </div>
    )
  }
  
export default Sign_up_page
