import { useDispatch, useSelector } from "react-redux";

type Cart = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

const Cart = () => {
  const cartData: any = useSelector<{ products: Cart[] }>(
    (state) => state.products
  );

  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    console.log("increment Clicked");
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  };

  const handleDecrement = (id: number) => {
    console.log("Decrement Clicked");
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  };

  let totalAmount = 0;
  cartData.forEach((item: any) => (totalAmount += item.price * item.quantity));

  return (
    <div className="flex flex-col justify-center items-center">
      <center className="text-2xl font-bold ">Cart</center>
      {cartData?.length === 0 ? (
        <center>Cart is empty</center>
      ) : (
        <div className="flex items-start justify-between w-10/12 ">
          <div className="rounded-md border-slate-800 border-2  w-9/12 p-4">
            {cartData?.map((each: any) => (
              <ul
                className="border-solid border-2 flex items-center justify-evenly mb-5"
                key={each.id}
              >
                <li>
                  <img
                    src={each.thumbnail}
                    alt={each.title}
                    style={{ width: "180px", margin: "0 50px 0 0" }}
                  />
                </li>
                <li className="w-4/12 ">
                  <p>{each.title}</p>
                  <p>${each.price}</p>
                </li>
                <li className=" w-1/12  ">
                  <span className="flex justify-evenly items-center">
                    <button
                      className="text-2xl"
                      onClick={() => {
                        handleDecrement(each.id);
                      }}
                    >
                      -
                    </button>
                    <p>{each.quantity}</p>
                    <button
                      className="text-2xl"
                      onClick={() => {
                        handleIncrement(each.id);
                      }}
                    >
                      +
                    </button>
                  </span>
                </li>
              </ul>
            ))}
          </div>
          <div className="border-black-200 border-2 rounded-md m-10 p-5">
            <h1>Cart Summary</h1>
            <p>Total : ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
