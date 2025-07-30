import { useEffect, useState } from "react"
import { getProductsByCategory } from "../services/products.service"

export const useProductsByCategory = (cat) => {
    const[products,setProducts] = useState([])
    useEffect(() => {
        getProductsByCategory(cat)
        .then((data) => {
            console.log(data)
            setProducts(data.products)
        }).catch((error) => {
            console.log(error)
        })
    },[cat])
    return{products}
}