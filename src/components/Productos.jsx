import React from "react";
import { Button } from "./Buttton";
 import { post } from "../api";
import {CartContext} from '../context/Cart'
import { useContext } from "react";
import { authContext } from "../context/Auth";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton from 'react-loading-skeleton'



export default function Productos({productos,previousPage,nextPage})  {
  const {setItems} = useContext(CartContext)
  const {logged} = useContext(authContext)
  const [loading,setLoading] = useState(true)

  const addToCart = (id) => {
    post('/api/cart/add',{
      idProduct:id,
      amount:1
    })
    .then(data => {
      console.log(data)
      setItems({type:'UPDATE',payload:data})
    })
    if(!logged) {
      alert('Es requerido iniciar sesion')
    }
  }

  useEffect(()=> {
    setTimeout(()=> {
      setLoading(false)
    },3000)
  },[])


  const loader = () => {
    return (
    
      <div className=" mt-10 h-3/4 gap-3  bg-slate-200 w-3/4 mx-auto flex flex-wrap flex-row">
       {productos.map((producto) => (
          
          <article
             key={producto._id}
             className="flex flex-row flex-wrap w-64  justify-between px-2"
           >
             <section className="h-60 flex flex-col flex-wrap bg-white rounded-md shadow-lg shadow-slate-400 transition-all items-center border-2 hover:border-indigo-500 w-full">
               <div className="h-24 mx-auto "><Skeleton duration={0.5}/></div>
               <div className='flex flex-col h-auto'>
               <h3><Skeleton duration={0.5}/></h3>
               <h3 className='mx-auto '><Skeleton duration={0.5}/></h3>
               <Button onClick={()=> {
                 addToCart(producto._id)
               } }><Skeleton duration={0.5}/></Button>
               </div>
             </section>
           </article>
         ))}
         <section className="w-full  flex gap-6 p-4">
         <ButtonProd onClick={previousPage} className="mx-auto"><Skeleton duration={0.5}/></ButtonProd>
         <ButtonProd onClick={nextPage} className="mx-auto"><Skeleton duration={0.5}/></ButtonProd>
         </section>
  
      </div>
    );
  }


  
  if(loading){
   return loader()
  }
  else{
    
  return (
    
    <div className="sm:flex-row   mt-10 h-3/4 gap-3  bg-slate-200 w-3/4 mx-auto flex flex-wrap flex-row">
     {productos.map((producto) => (
        
        <article
           key={producto._id}
           className="flex flex-row flex-wrap w-64  justify-between px-2"
         >
           <section className="h-60 flex flex-col flex-wrap bg-white rounded-md shadow-lg shadow-slate-400 transition-all items-center border-2 hover:border-indigo-500 w-full">
             <img
               className="h-24 mx-auto "
               src={producto.images[0]}
               alt={producto.name}
             />
             <div className='flex flex-col h-auto'>
             <h3>{producto.name}</h3>
             <h3 className='mx-auto '>{'Precio: $'+producto.price}</h3>
             <Button onClick={()=> {
               addToCart(producto._id)
             } }>Añadir al carrito</Button>
             </div>
           </section>
         </article>
       ))}
       <section className="w-full  flex gap-6 p-4">
       <ButtonProd onClick={previousPage} className="mx-auto">Pagina anterior</ButtonProd>
       <ButtonProd onClick={nextPage} className="mx-auto">Siguiente pagina</ButtonProd>
       </section>

    </div>
  );
}

};


const ButtonProd = styled.button`

  font-size: 18px;
  color: #17202A;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;


:focus,:hover {
  color: #2C3E50;
}

:focus:after,
:hover:after {
  width: 100%;
  left: 0%;
}

:after {
  content: "";
  pointer-events: none;
  bottom: -2px;
  left: 50%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #2C3E50;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: width, left;
}
`