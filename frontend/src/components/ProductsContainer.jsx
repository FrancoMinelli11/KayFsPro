import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const ProductsContainer = ({ products, cat }) => {
  const navigate = useNavigate()
  const { categoryName } = useParams() // ← nombre del parámetro en tu ruta (por ejemplo, /category/:categoryName)
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "")

  // Si cambia la URL, actualizamos el select
  useEffect(() => {
    setSelectedCategory(categoryName || "")
  }, [categoryName])

  const handleChange = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
    navigate(`${value}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <select
          value={selectedCategory}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md mb-4 ml-3 mt-3"
        >
          <option value="/products">Todas las categorías</option>
          {cat.map((category) => (
            <option key={category.name} value={`/category/${category.name}`} label={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lime-500 transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold">${product.price}</p>
              <Link to={`/product/${product._id}`}>
                <img
                  src={`http://localhost:8080/img/${product.thumbnail}`}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}