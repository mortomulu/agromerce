import { cache } from "react";
import Cart from "./components";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default async function CartPage() {
  return <Cart />;
}
