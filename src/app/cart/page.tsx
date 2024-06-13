import Cart from "./components";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function CartPage({ cart } : any) {
  return <Cart cart={cart} />;
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${url}api/cart`); 
    const cart = await res.json();
    return {
      props: { cart },
    };
  } catch (error) {
    console.error("Failed to fetch cart data:", error);
    return {
      props: { cart: [] },
    };
  }
}
