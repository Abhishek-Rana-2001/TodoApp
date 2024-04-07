import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const toggleOpen = ()=>{
    setIsOpen(!isOpen)
  }
  return (
    <header className="flex items-center max-h-max justify-between p-4 md:p-4 z-[20] relative mb-2">
      <div>
        <img className="bg-white rounded-lg " src={"./Logo.png"}></img>
      </div>
      <div className="right-1 flex flex-col items-end gap-2 absolute top-6 ">
        <IoMdMenu className="md:hidden" size={25} onClick={toggleOpen} />
        <div className={`md:flex md:flex-row md:items-center gap-5 transition-all rounded-lg ease-linear px-5 py-2 bg-white md:bg-inherit md:text-inherit text-black z-50 ${isOpen ? "flex flex-col" : "hidden"}`}>
          <NavLinks/>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ()=>{
  const {isLoggedIn,setIsLoggedIn} = useAuth()

  const handleLogout = ()=>{
    localStorage.removeItem("user")
    setIsLoggedIn(false)
  }
  return (
      <>
          <NavLink to={"/home"}>Home</NavLink>
          <NavLink to={"/services"}>Services</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
          <NavLink to={"/help"}>Help</NavLink>
          {
            isLoggedIn && <button className="bg-white text-black p-2 font-bold" onClick={handleLogout}>Log Out</button>
          }
      </>
  )
}

export default Navbar;
