import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Button, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";

import Link from "next/link";

type ProductDetails = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

const Home = ({ products }: { products: ProductDetails[] }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.products);
  const addToCart = (product: ProductDetails) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <>
      <div className="flex gap-10 flex-wrap justify-center mt-8 p-4">
        <Grid container spacing={2}>
          {products?.map((each) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={each.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Image
                    src={each.thumbnail}
                    alt={each.title}
                    width={200}
                    height={200}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {each.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      ${each.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className="flex justify-between">
                  <Button size="small">
                    <Link href={`/products/${each.id}`}>View More</Link>
                  </Button>
                  <Button
                    size="small"
                    endIcon={<AddShoppingCartIcon />}
                    className="bg-green-400 text-white"
                    onClick={() => addToCart(each)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://dummyjson.com/products?limit=60");
  const data = await response.json();
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
