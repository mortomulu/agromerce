import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();

  try {
    let { data: cartData, error } : any = await supabase
      .from("cart")
      .select("cart")
      .eq("email", "fajrihidayat@gmail.com");

    if (error) throw error;

    // Assuming each entry in cartData contains a 'cart' field
    const carts = cartData.map((item : any) => item.cart);

    return NextResponse.json(cartData);
  } catch (error) {
    console.error("fetch cart error:", error);
    return NextResponse.json(
      { error: "Error fetching cart data" },
      { status: 500 }
    );
  }
}
