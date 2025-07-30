import { useEffect, useState } from "react"
import { getProductById } from "../services/products.service"

export const useProductById = (id) => {
    const [productById,setProductById] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getProductById(id)
        .then((data) => {
            setProductById(data)
            setLoading(false)
        })
    },[id])
    return{productById, loading}
}