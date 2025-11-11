import { useContext, useEffect } from "react"
import Swal from "sweetalert2"
import { AuthContext } from "../context/authContext"
import { IconLogin, IconLogin2 } from "@tabler/icons-react"

export const Login = () => {
  const {loginUser, user,error,logoutUser} = useContext(AuthContext)
  const handleClick = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Iniciar sesión",
      html: `
        <input id="email" name="email" type="email" placeholder="Email" class="swal2-input">
        <input id="password" name="password" type="password" placeholder="Contraseña" class="swal2-input">
      `,
      focusConfirm: false,
      confirmButtonText: "Ingresar",
      preConfirm: () => {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        if (!email || !password) {
          Swal.showValidationMessage("Ambos campos son obligatorios")
        }
        return [email, password]
      },
    })

    if (formValues) {
      const [email, password] = formValues
      await loginUser(email, password)
    }

  }
  useEffect(() => {
    if (error) Swal.fire("Error", error, "error")
  }, [error])

  useEffect(() => {
    if (user) Swal.fire("Bienvenido", user.payload.email, "success")
  }, [user])
  return (
    <div>
      {user ? <button onClick={logoutUser} className="text-gray-300 hover:text-white"><IconLogin2 stroke={1}/></button>:<button onClick={handleClick} className="text-gray-300 hover:text-white"><IconLogin stroke={1}/></button>}
    </div>
  )
}
