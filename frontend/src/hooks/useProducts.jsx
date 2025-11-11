import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service.js";
export const useProducts = () => {
    const [productsD, setProductsD] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getProducts(0, 10)
            .then((data) => {
                (data)
                setProductsD(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching products:", error)
            })
    }, [])
    return {
        productsD,
        loading
    }
}
