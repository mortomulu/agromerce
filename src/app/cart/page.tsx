import { cache } from "react";
import Cart from "./components";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default async function CartPage() {
  try {
    const response = await fetch(`${url}api/cart`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    const data = await response.json();

    return <Cart cart={data[0]}/>;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return <div>Error loading cart data</div>;
  }
}
