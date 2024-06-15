import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  console.log(id)
  const supabase = createClient();

  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    console.log("Product deleted successfully");
    return NextResponse.json({
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      error: "Failed to delete product",
    });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const supabase = createClient();
  const { id } = params;

  try {
    const { data: notes } = await supabase
      .from("products")
      .select()
      .eq("id", id);
    return NextResponse.json(notes);
  } catch {}
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const supabase = createClient();
  const { id } = params;

  const { product_name, price, product_category, url_image, desc, stok }: any = await
    request.json();

  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        product_name: product_name,
        price: price,
        product_category: product_category,
        url_image: url_image,
        desc: desc,
        stok: stok,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json({ status: true, message: "edit success!" });
  } catch (error) {
    return NextResponse.json({ status: false, message: "edit failed!" });
  }
}
