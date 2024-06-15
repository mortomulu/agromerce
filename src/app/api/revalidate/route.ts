// pages/api/revalidate.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Replace '/path-to-revalidate' with the path that needs to be revalidated
    await res.revalidate(`${url}/admin/all-product`);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({status: false, message: "error revalidate"})
  }
}
