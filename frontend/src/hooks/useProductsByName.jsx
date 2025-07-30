import { useEffect, useState } from "react"
import { findProductByName } from "../services/products.service"

export const useProductsByName = () => {
  const [products, setProducts] = useState([])
    const [word, setWord] = useState("")
  useEffect(() => {
    findProductByName(word)
    .then((data) => {
        console.log(data)
        setProducts(data.products)
    }).catch((error) => {
        console.log(error)
    })
    }, [word])

    return { products, setWord }
}