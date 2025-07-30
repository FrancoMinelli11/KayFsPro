import { ProductDetailContainer } from "../components/ProductDetailContainer"
import { useParams } from "react-router-dom"
import { useProductById } from "../hooks/useProductById"
import { Loader } from "../components/Loader"
export const Detail = () => {
    const {id} = useParams()
    const {productById,loading} = useProductById(id)
    return(
        loading ? <Loader/> : <ProductDetailContainer product={productById}/>
    )
}