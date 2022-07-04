import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../api";
import { authContext } from "../context/Auth";
import Usuario from "./Usuario";
import {GrReactjs} from 'react-icons/gr'


const Navbar = () => {
  const { user, logged,setUser } = useContext(authContext);
  const navigate = useNavigate()
  
  const logout = () => {
    get('/api/auth/logout')
    .then(result => {
      setUser({type:'LOGOUT'})
      navigate('/acceso')
    })
  }

  return (
    <nav className="w-full bg-violet-500 h-10 pb-2 sm:h-10 flex justify-between">
      <ul className="lg:mt-1 flex items-center">
        <Link
          className="text-slate-200 px-2  hover:bg-violet-400 hover:rounded-full transition-all "
          to={"/"}
        >
          Inicio
        </Link>
      </ul>
      <h1 className="flex items-center text-3xl text-violet-100">
        <GrReactjs className="items-center "/>  
      React Ecomerce
        
      </h1>

      {logged ? (
        <ul className=" lg:mt-1 flex items-center justify-between">
          <li>
          <Usuario usuario={{ user, logged }} />
          </li>
          <li className="mx-4 text-violet-100">
            {user.name}
          </li>
          <li>
            <button onClick={logout} className="mx-2 text-violet-100 hover:bg-violet-400 rounded-lg">Cerrar sesion</button>
          </li>
        </ul>
      ) : (
        <ul className="lg:mt-1 flex items-center justify-between">
          <li>
          <Link
            className=" px-2  text-slate-200 hover:bg-violet-400 hover:rounded-full transition-all"
            to={"/acceso"}
          >
            Iniciar sesión
          </Link>
          </li>
          <li>
          <Link
            className=" px-2 text-slate-200 hover:bg-violet-400 hover:rounded-full transition-all "
            to={"/crear"}
          >
            Crear usuario
          </Link>
          </li>

        </ul>
      )}
    </nav>
  );
};

export default Navbar;
