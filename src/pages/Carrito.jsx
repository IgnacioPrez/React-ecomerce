import React, { useContext } from "react";
import { Button } from "../components/Buttton";
import { CartContext } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { delet } from "../api";
import { useState } from "react";
import Spinner from "../components/Loading";


const Carrito = () => {
  const { items, setItems, total } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const eliminarProducto = (id) => {
    delet("/api/cart/remove", {
      idProduct: id,
    })
      .then((data) => {
        setItems({
          type: "UPDATE",
          payload: data,
        });
      })
      .catch(console.log);
  };

  const pedido = (items) => {
    if (items.length === 0) {
      alert("Se esta olvidando de los productos");
      navigate("/");
    } else {
      setTimeout(() => {
          setLoading(true)
      }, 2000);
      navigate("/comprar");

    }
  };
  return (
    <>
      <section className="flex w-full h-full flex-wrap  flex-col sm:flex-row lg:flex-row lg:gap-0  gap-10 sm:h-96 sm:items-center sm:gap-3 ">
        <div className="flex w-4/5 sm:flex-col lg:w-full   flex-wrap gap-2 sm:mt-8 mx-auto sm:h-auto">
          {items.map((item) => (
            <article
              key={item._id}
              className="sm:flex lg:flex-row lg:w-1/2 sm:w-auto flex flex-col   border-y-gray-400  mt-4 sm:gap-5 sm:h-auto h-40 border "
            >
              <section className="shadow-slate-400 shadow-lg  ">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className=" h-20 lg:w-1/2 mx-auto sm:w-full sm:h-auto "
                />
              </section>
              <section className=" w-auto sm:ml-4   flex   sm:items-center  flex-wrap ">
                <h4>{item.name}</h4>
              </section>
              <section className=" sm:w-auto w-auto sm:ml-2 flex  items-center">
                <p>{"$" + item.price}</p>
              </section>

              <section className=" w-auto sm:ml-4 flex items-center  ">
                <h3>{"Cantidad: " + item.amount}</h3>
              </section>
              <section className=" w-auto   h-10 text-sm flex sm:mt-8">
                <Button
                  onClick={() => {
                    eliminarProducto(item._id);
                  }}
                >
                  Remover
                </Button>
              </section>
            </article>
          ))}
        </div>
        <article className=" flex flex-col sm:w-1/2 w-2/3 mx-auto border-2 border-gray-300  shadow-lg h-52  mt-8">
          <section className=" border border-b-gray-400 sm:pt-4 p-2 gap-4  flex">
            <h3 className="w-1/2 border border-b-gray-400 ">
              Paquetes : {items.length}
            </h3>
            <h3 className=" border border-b-gray-400  w-1/2 ">{`TOTAL: $ ${total}`}</h3>
          </section>
          <section className="border mt-8 mx-auto ">
            {
              loading === false? 
              <button
                onClick={() => pedido(items)}
                className="p-2 bg-violet-500 bg-opacity-95  hover:bg-violet-400 text-white rounded-md "
              >
                Comprar ahora
              </button>
            : <Spinner/>}
          </section>
        </article>
      </section>
    </>
  );
};

export default Carrito;
