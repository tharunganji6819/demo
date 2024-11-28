import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const cartData = useSelector((state: any) => state.products);
  return (
    <div className="flex justify-between p-4  bg-black w-screen z-10 text-white text-2xl font-bold">
      <ul className="list-none flex gap-x-12 mx-auto ">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/cart">
            Cart
            <span className="relative -top-2 bg-red-600 rounded-full p-1">
              {cartData.length}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
