import { CartContext } from "../context/Cart";
import { useContext } from "react";
import { authContext } from "../context/Auth";

const BubbleAlert = () => {
  const { items } = useContext(CartContext);
  const {logged} = useContext(authContext)
  return (
    <>
      { logged && Array.isArray(items) && (
        <span className="bg-red-300 bg-opacity-95 rounded-full py-0.5 px-1.5 text-red-50 text-sm w-3">
          {items.length}
        </span>
      )}
    </>
  );
};

export default BubbleAlert;
