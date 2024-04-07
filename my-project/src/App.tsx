import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useEffect, useLayoutEffect, useState } from "react"
import { useAuth } from "./context/AuthProvider"
import { useTheme } from "./context/ThemeProvider"


function App() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {bgColor} = useTheme()

  useLayoutEffect(()=>{
    if(location.pathname !== "/" && location.pathname !== "/register"){
     setIsVisible(true)
    } else {
     setIsVisible(false)
    }
 },[location])

 useEffect(() => {
  if (isLoggedIn) {
    navigate("/home");
  } else {
    navigate("/");
  }
}, [isLoggedIn, navigate]);

  return (
    <>
      <div className={`h-screen ${bgColor} `}>
        {isVisible && <Navbar />}
        <div className="h-full">
        <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
