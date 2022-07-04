import CarritoCompra from "./CarritoCompra";

const Search = () => {

  return (
    <>
    <div className="flex p-2 w-max-full shadow-xl items-center  justify-center">
      
      <input
        className="leading-7 border-2 border-solid border-transparent border-b-gray-500 p-1 outline-none bg-transparent color text-gray-800 transition-transform focus:outline-none focus:border-blue-300 focus:rounded-2xl focus:py-1 focus:px-4"
      />
      <button className="w-24 ml-7 p-2 rounded-md bg-white shadow-sm tracking-wide text-sm transition-all hover:tracking-wider hover:bg-indigo-600 hover:text-slate-100 hover:shadow-xl active:tracking-wider active:bg-indigo-600 active:text-slate-100 active:shadow-md active:translate-y-5 active:transition-all">
        Buscar
      </button>
      <CarritoCompra/>
    </div>

    </>
  );
};

export default Search;
