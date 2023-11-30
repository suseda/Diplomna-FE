function NavBar() {

    return (
    <div className="w-full navbar bg-green-500">
      <div className="flex-1">
          <h1 className="bg-green-900 rounded-md px-5 py-5 text-sm font-big text-white"><span className="text-warning font-big">Cook</span>Lab: Your Culinary Companion</h1>
        </div>
      <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search recipe" className="input input-bordered w-24 md:w-auto" />
      </div>
        <div className=" dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Logo" src="../images/logo-no-background.png" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-green-500 rounded-box w-52 text-center">
              <li><a>Profile</a></li>
              <li><a>Favourites</a></li>
              <li><a>Search by Products</a></li>
              <li><a className="bg-warning hover:bg-yellow-300">Log Out</a></li>
          </ul>
        </div>
      </div>
    </div>
)}
  
  export default NavBar