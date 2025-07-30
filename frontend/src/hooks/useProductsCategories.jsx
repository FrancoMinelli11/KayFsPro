import { useEffect, useState } from "react"
import { getAllCategories } from "../services/products.service"

export const useProductsCategories = () => {
    const [cat, setCat] = useState([])
    useEffect(() => {
        getAllCategories()
        .then((data) => {
            setCat(data)
        }).catch((error) => {
            console.log(error)
        })
    },[])
    return {cat}
}