import { Link } from "react-router"

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">KayFs</Link>  
        <div>
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Inicio</Link>
          <Link to="/products" className="text-gray-300 hover:text-white px-3 py-2">Productos</Link>
          <Link to="/cart" className="text-gray-300 hover:text-white px-3 py-2">Carrito</Link>
        </div>
      </div>
    </nav>
  )
}