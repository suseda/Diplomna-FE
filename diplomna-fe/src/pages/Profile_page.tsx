import { GiCook } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext ,AuthContextValue } from "../api/AuthProvider";

function Profile()
{
    const { auth } = useContext(AuthContext) as AuthContextValue;

    const user = auth.user;

    return (
        <div>
            <div className="w-full">
                <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
                    <div className="shrink-0 w-1/3 flex items-center justify-center">
                        <GiCook className="h-14 w-12"/>
                    </div>
                    <div>
                        <div className="text-xl font-medium text-black">Welcome {user.name}</div>
                        <p className="text-slate-500">See your recipes here!</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="bg-green-500 rounded-md w-1/3">
                <h1 className="font-bold">Your recipes:</h1>
            </div>
        </div>
    )
}

export default Profile;