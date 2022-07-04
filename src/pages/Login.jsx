import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import modelo2 from "../img/Premium Vector _ Online shopping app mobile phone.jpg";
import { post } from "../api";
import { useState } from "react";
import Errors from "../components/Errors";
import { useContext } from "react";
import { authContext } from "../context/Auth";
import {useNavigate } from "react-router-dom";

const Login = () => {
  const {setUser} = useContext(authContext)
  const navigate = useNavigate()

  const [data,setData] = useState({
    email:'',
    password:''
  })

  const handleChange = (event) => {
    const {name,value} = event.target
    setData({...data,
      [name]:value
    })
  }

  const [errors,setErrors] = useState({
    isErrors:false,
    errors:[]
  })

  const login = (event) => {
    event.preventDefault()
   /* const {email,password} = event.target*/
  
    post('/api/auth/login',data)
    .then(({user}) => {
        setUser({type:'LOGIN',payload:user})
        navigate('/')
    })
    .catch(error => {
      setErrors({
        isErrors:true,
        errors:error.errors
      })
    })
  }

  return (
    <div className="sm:h-4/5 lg:h-5/6 md:flex w-full">
      
      <img src={modelo2} className=" sm:flex sm:hidden md:w-1/2 md:h-screen lg:flex  lg:h-full lg:border" />
      
      <form onSubmit={login} className=" flex flex-col  w-3/4 items-center justify-center mx-auto shadow-gray-400 shadow-xl h-80 mt-23 sm:mt-24 md:w-80 md:mt-5 lg:absolute lg: top-24 lg:left-2/4 lg:ml-14 lg:h-80">
        <input
          type="email"
          placeholder="Correo"
          name="email"
          onChange={handleChange}
          value={data.email}
          className="border border-neutral-400 rounded-md w-4/5 p-2 my-2 shadow-gray-300 shadow-md focus:outline-none focus:border-blue-300"
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          value={data.password}
          className="border border-neutral-400 rounded-md w-4/5 p-2 my-2 shadow-gray-300 shadow-md focus:outline-none focus:border-blue-300"
        />
        <button className="bg-violet-600 w-4/5 rounded-md p-2 my-3 text-slate-50 hover:bg-violet-500 ">
          Iniciar sesión
        </button>
        <fieldset className="flex gap-4">
          <a
            href="https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google"
            className="border border-neutral-300 shadow-gray-300 shadow-xl hover:bg-gray-200 p-3"
          >
            <FcGoogle className="h-full" />
          </a>
          <a
            href="https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/facebook"
            className="border border-neutral-300 shadow-gray-300 shadow-xl hover:bg-gray-200 p-3"
          >
            <GrFacebook className="h-full" />
          </a>
        </fieldset>
      </form>
       <Errors errors={errors}/>
      
    </div>
  );
};

export default Login;
