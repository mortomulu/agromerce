import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  const supabase = createClient();
  try {
    await supabase.from("products").delete().eq("id", id);

    console.log("Product deleted successfully");
    return NextResponse.json({
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(new Error("Failed to delete product"));
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const supabase = createClient();
  const { id } = params;

  try {
    const { data: notes } = await supabase.from("products").select().eq("id", id);
    return NextResponse.json(notes);
  } catch {}
}
