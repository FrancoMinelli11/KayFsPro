import { Link } from "react-router"
import { IconHome, IconLogin, IconLogin2, IconShoppingCart } from "@tabler/icons-react"
import { Login } from "../pages/Login"

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">KayFs</Link>  
        <div className="flex justify-center items-center">
          <Link to="/" className="text-gray-300 hover:text-white px-3"><IconHome stroke={1}/></Link>
          <Link to="/products" className="text-gray-300 hover:text-white px-3">Productos</Link>
          <Link to="/cart" className="text-gray-300 hover:text-white px-3"><IconShoppingCart stroke={1}/></Link>
          <Login />
      </div>
      </div>
    </nav>
  )
}