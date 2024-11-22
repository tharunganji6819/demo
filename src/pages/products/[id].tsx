import Image from "next/image";
import { useRouter } from "next/router";

type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
};

type ProductProps = {
  data: Product;
};

export default function Product({ data }: ProductProps) {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/products")}>Back</button>
      <center>
        <h1>{data.title}</h1>
        <Image src={data.thumbnail} alt={data.title} height={200} width={200} />
        <h1>{data.price}</h1>
      </center>
    </>
  );
}

type Params = {
  params: {
    id: string;
  };
};
export async function getServerSideProps(context: Params) {
  const response = await fetch(
    `https://dummyjson.com/products/${context.params.id}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
