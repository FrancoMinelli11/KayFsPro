import { Link, useNavigate } from "react-router-dom"
export const ProductsContainer = ({ products,cat }) => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100">
            <div>
    <select onChange={(e) => navigate(`/category/${e.target.value}`)}  className="p-2 border border-gray-300 rounded-md mb-4 ml-3 mt-3">
        {cat.map((category)=>{
            return(
                <option key={category.slug} value={category.slug}>{category.name}</option>
            )
        })}
    </select>
            
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
                {products.map((product) => {
                    return (
                        <div key={product._id} className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lime-500 transition-shadow duration-300">
                            <h2 className="text-2xl font-bold">{product.title}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-semibold">${product.price}</p>
                            <Link to={`/product/${product._id}`}>
                                <img src={`http://localhost:8080/img/${product.thumbnail}`} alt={product.title} className="w-full h-auto object-cover" />
                            </Link>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}