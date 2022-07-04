import { useState, useContext } from "react";
import { authContext } from "../context/Auth";
import modelo1 from "../img/Diseño plano de ilustración de concepto de devolución de dinero _ Vector Premium.jpg";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { post } from "../api";
import Errors from "../components/Errors";
import {useNavigate} from 'react-router-dom'
import useInput from "../hooks/useInput";

const SigIn = () => {
  const { setUser } = useContext(authContext);
  const navigate = useNavigate()
  const email = useInput('text','')
  const name = useInput('text','')
  const password = useInput('password','')
  const [errors, setErrors] = useState({
    isErrors: false,
    errors:[]
  });

  const sigIn = (event) => {
    event.preventDefault();
   

    post("/api/auth/signup", {
      name: name.value,
      email: email.value,
      password: password.value,
    })
      .then(({ user }) => {
        setUser({action:'SIGNUP',payload:user})
        navigate('/acceso')
      })
      .catch((error) => {
        console.log(error)
        setErrors({
          isErrors: true,
          errors:error.errors.map(e=>e.message)
        });
      });
  };

  return (
    <div className="flex">
      <img src={modelo1} className="w-1/2 sm:flex  " />
      <div className=" flex w-5/6  sm:h-80 mx-auto mt-10 justify-center md:w-3/5  lg:w-2/5">
        <form
          onSubmit={sigIn}
          className="border flex flex-col w-full items-center shadow-gray-400 shadow-xl border-t-neutral-400 h-80 md:w-3/5 md:mt-12  lg:w-3/5"
        >
          <input
            {...name}
            placeholder="Nombre:"
            className="border border-neutral-400 rounded-md w-4/5 p-2 my-2 shadow-gray-400 shadow-md focus:outline-none focus:border-blue-300"
          />
          <input
            {...email}
            placeholder="Correo:"
            className="border border-neutral-400 rounded-md  w-4/5 p-2 my-3 shadow-gray-400 shadow-md focus:outline-none focus:border-blue-300"
          />
          <input
            {...password}
            placeholder="Contraseña:"
            className="border border-neutral-400 rounded-md w-4/5 p-2 my-2 shadow-gray-400 shadow-md focus:outline-none focus:border-blue-300"
          />
          <button className="bg-violet-600 w-4/5 rounded-md p-2 my-3 text-slate-50 hover:bg-violet-500">
            Registrarse
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
        <Errors errors={errors} />
      </div>
    </div>
  );
};

export default SigIn;
