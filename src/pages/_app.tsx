import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/index";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <header className="flex justify-between p-4  bg-slate-500 w-screen z-10 ">
        <ul className="list-none flex gap-x-12 mx-auto ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/cart">Cart</Link>
          </li>
        </ul>
      </header>
      <Component {...pageProps} />
    </Provider>
  );
}
