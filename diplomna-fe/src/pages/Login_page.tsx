import { useState } from "react";
import loginSchema from "../validation/login_validation"
import useAuth from "../hooks/useAuth"
import api from "../api/axios";
import { LOGIN_URL } from "../api/urls";
import useBearStore from "../hooks/useZustand";
import { useNavigate } from "react-router-dom";


function Login_page() {

    const {auth, setAuth} = useAuth();
    const [LoginForm,SetLoginForm] = useState({
        "email": "",
        "password": ""
    })

    const [validationError, setValidationError] = useState('');
    const setIsUserAuth = useBearStore((state) => state.setIsUserAuth);
    const navigate = useNavigate();

    const FormChange = (event: { target: { name: any; value: any; }; }) => {
  
        const { name, value } = event.target;
        SetLoginForm((prevForm) => ({
          ...prevForm,
          [name]: value
        }));
      };
    
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const validData = loginSchema.parse(LoginForm);
            setValidationError('');
            SetLoginForm({email:'',password:''});
            console.log("Valid data:", validData);

            
            const response = await api.post(LOGIN_URL , JSON.stringify(LoginForm), {
                headers: {'Content-Type': 'application/json' }
            });


            const accessToken = response?.data;
            sessionStorage.setItem('authToken', accessToken.token);
            setAuth({ ...auth, accessToken: accessToken });
            setIsUserAuth(true);
            navigate("/home");
            } catch (error: any) {
            console.error("Validation error:", error.message);

            if(!error?.response)
                setValidationError('No Server Response');
            else if(error.response?.status === 400)
                setValidationError('Missing email or Password')
            else if(error.response?.status === 401)
                setValidationError('Unauthorized');
            else 
                setValidationError('Login Failed');
            
        }
      };


    return (
    <div className="min-h-screen flex items-center justify-center bg-green-400">
        <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email:</label>
                    <input
                        type="text" 
                        placeholder="Enter your email" 
                        required id="email" name="email" 
                        className="w-full border-2 border-gray-300 focus:border-blue-300 focus:outline-none rounded-md px-3 py-2 " 
                        onChange={FormChange} 
                        value={LoginForm.email} 
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
                        value={LoginForm.password} 
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer" 
                        value="Log in" 
                    />
                </div>
                {validationError && <p className="text-red-500">{validationError}</p>}
                <div className="text-center">
                    <a className="text-blue-500" href="/signup">Dont have acount?</a>
                </div>
            </form>
        </div>
    </div>
    )
  }

export default Login_page;