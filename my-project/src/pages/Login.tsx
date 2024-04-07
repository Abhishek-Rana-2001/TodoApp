import axios from "axios";
import { FormEvent, useState } from "react";
import { apiUrl } from "../url/Url";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  // const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: userName,
      password: password,
    };
    await axios
      .post(`${apiUrl}/api/login`, data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("access", res.data.access);
          localStorage.setItem("user", JSON.stringify(res.data));
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/3 flex flex-col gap-3">
        <section className="flex flex-col gap-1">
          <h1 className="font-semibold text-black text-[4rem]">Login</h1>
          <label className="text-black text-2xl font-normal">
            Login to your account
          </label>
        </section>

        <section className="w-full">
          <form className=" w-full flex flex-col  gap-5" onSubmit={handleLogin}>
            <input
              className="p-2 rounded-lg  w-full bg-white border border-gray-800 text-black"
              value={userName}
              type="text"
              placeholder="UserName"
              onChange={(e) => setUserName(e.target.value)}
            ></input>

            <input
              className="p-2 rounded-lg  w-full bg-white border border-gray-800 text-black"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <span className="flex justify-end w-full">
              <NavLink className=" text-xs text-black" to={"/register"}>
                New User? Sign Up
              </NavLink>
            </span>

            <button className="p-2 bg-black text-white font-bold px-4 rounded-3xl">
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
