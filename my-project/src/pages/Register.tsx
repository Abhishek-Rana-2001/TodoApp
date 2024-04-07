import axios from "axios"
import { FormEvent, useState } from "react"
import { apiUrl } from "../url/Url"
import { NavLink, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";


const Register = () => {
    // const navigate = useNavigate()
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const {setIsLoggedIn} = useAuth()

    const handleRegister = async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       if(!name || !userName || !password || !confirmPassword){
        alert("Please Enter all the details")
        return
       }

       if(password === confirmPassword){
        let data = {
            name : name ,
            email:userName,
            password:password
        }
        await axios.post(`${apiUrl}/api/register`,data)
        .then(res=>{
          sessionStorage.setItem("access", res.data.access)
          localStorage.setItem("user", JSON.stringify(res.data))
          setIsLoggedIn(true)
        })
        .catch(err=>console.log(err))
       }else{
        alert("Password and confirm password dont match")
       }
    }
  return (
    <div className="flex h-screen justify-center items-center">
      <form className="md:w-2/5 w-full flex flex-col items-center gap-5" onSubmit={handleRegister}>
        <h1 className="text-2xl font-bold">Register</h1>

        <div className="w-full">
            <input className="p-2 rounded-lg w-full" value={name} type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}></input>
        </div>

        <div className="w-full">
            <input className="p-2 rounded-lg w-full" value={userName} type="text" placeholder="UserName" onChange={(e)=>setUserName(e.target.value)}></input>
        </div>

        <div className="w-full relative">
            <input className="p-2 rounded-lg w-full " value={password} type={isVisible ? "text" :"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
            <span  className="absolute top-3 right-3 hover:cursor-pointer">

            {
              isVisible ? <FaEyeSlash onClick={()=>setIsVisible(!isVisible)}/> : <FaEye onClick={()=>setIsVisible(!isVisible)}/>
            }
            </span>
        </div>

        <div className="w-full">
            <input className="p-2 rounded-lg w-full" value={confirmPassword} type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}></input>
        </div>

        <div>
          <NavLink className="text-sm" to={"/"}>Already have an account? Log In</NavLink>
        </div>

        <div>
            <button className="p-2 bg-white text-black font-bold px-4">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Register
