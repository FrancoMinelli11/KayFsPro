import { useParams } from "react-router"
import { useProductsByCategory } from "../hooks/useProductsByCategory"
import { useProductsCategories } from "../hooks/useProductsCategories"
import { ProductsContainer } from "../components/ProductsContainer"

export const ProductsByCategory = () => {
    const{cat} = useProductsCategories()
    const{name}=useParams()
    const{products}=useProductsByCategory(name)
    return(
        <ProductsContainer products={products} cat={cat}/>
    )
}