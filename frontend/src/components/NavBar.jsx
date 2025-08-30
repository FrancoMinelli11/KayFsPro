import { Link } from "react-router"
import { isAdmin } from "../services/auth.service"
import { useEffect, useState } from "react"
export const NavBar = () => {
    const [isA, setIsA] = useState(false)
    useEffect(() => {
        const checkAdmin = async () => {
            const result = await isAdmin()
            console.log(result)
            setIsA(result)
        }
        checkAdmin()
    }, [])
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">KayFs</Link>  
        <div>
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Inicio</Link>
          <Link to="/products" className="text-gray-300 hover:text-white px-3 py-2">Productos</Link>
          <Link to="/cart" className="text-gray-300 hover:text-white px-3 py-2">Carrito</Link>
          {isA ? <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2">Admin</Link> : null}
        </div>
      </div>
    </nav>
  )
}