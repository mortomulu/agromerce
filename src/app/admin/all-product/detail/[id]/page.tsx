import DetailProduct from "./components"
import { getProduct } from "@/lib/crudProduct/dbData"

export default async function DetailProductPage ({params} : any) {
    const product = await getProduct(params.id)
    return <DetailProduct product={product}/>
}