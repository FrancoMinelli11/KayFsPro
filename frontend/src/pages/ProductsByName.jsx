import { ProductsContainer } from "../components/ProductsContainer"
import { useProductsByName } from "../hooks/useProductsByName"

export const ProductsByName = () => {
    const { products, setWord } = useProductsByName()
    return (
    <div className="min-h-screen bg-gray-100">
        {/* <input type="text" className="p-2 border border-gray-300 rounded-md mb-4 ml-3 mt-3" placeholder="Buscar producto"  onChange={(e) => setWord(e.target.value)} /> */}
        <input
            type="text"
            className="p-2 border border-gray-300 rounded-md mb-4 ml-3 mt-3"
            placeholder="Buscar producto"
            onChange={(e) => {
                if (e.key === ' ') {
                    e.preventDefault()
                } else {
                    setWord(e.target.value)
                }
            }}
        />
        <ProductsContainer products={products} cat={[]}/>
    </div>
    )
}