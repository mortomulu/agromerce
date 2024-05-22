import { NextResponse } from "next/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getProducts() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${url}/api/products`, {
      next: { revalidate: 10 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export const postProduct = async (productData: any, fileImage: File) => {
  const supabase = createClientComponentClient();

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  console.log(productData);
  console.log(fileImage);

  const { data: fileData, error: fileError } = await supabase.storage
    .from("image")
    .upload(`${fileImage.name}-${Date.now()}`, fileImage);

  console.log(fileData);

  const filepath = fileData?.path;

  try {
    const response = await fetch(`${url}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: productData.product_name,
        price: productData.price,
        product_category: productData.product_category,
        url_image: `https://xtsemdavncboeicgvrsz.supabase.co/storage/v1/object/public/image/${filepath}`,
        desc: productData.desc,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    console.log("Product added successfully");
    const datawo = await response.json();
    return NextResponse.json({
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(new Error("Failed to delete product"));
  }
};

export const deleteProduct = async (id: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${url}/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    console.log("Product deleted successfully");
    return NextResponse.json({
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(new Error("Failed to delete product"));
  }
};
