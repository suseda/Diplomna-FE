import logo from "../images/logo-color.png"

function Profile()
{
    return (
        <div>
            <div className="w-full">
                <div className="card w-96 bg-base-100 shadow-xl border border-green-500 p-4 rounded-md m-4 max-w-xs">
                    <img alt="Logo" src={logo} />
                </div>
            </div>
            <div>
                <h2>Your recipes:</h2>
            </div>
        </div>
    )
}

export default Profile;