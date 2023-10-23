function NavBar() {

    return (
        <div className="w-full navbar bg-green-500">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1">
        <h1 className="bg-green-900 rounded-md px-5 py-5 text-sm font-big text-white"><span className="text-warning font-big">Cook</span>Lab: Your Culinary Companion</h1>
      </div>
      <div className="flex-none hidden lg:block ">
        <ul className="menu menu-horizontal">
          <li><a>Home</a></li>
          <li><a>Favourites</a></li>
          <li><a>My Profile</a></li>
          <li><a className="bg-warning">Log Out</a></li>
        </ul>
      </div>
    </div>
    )
  }
  
  export default NavBar