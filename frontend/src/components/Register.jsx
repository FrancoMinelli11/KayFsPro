import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import Swal from "sweetalert2"

export const Register = () => {
    const {registerUser} = useContext(AuthContext)
    const handleClick = async () => {
        Swal.fire({
            title: "Registrarse",
            html: `
              <input id="first_name" name="first_name" type="text" placeholder="Nombre" class="swal2-input">
              <input id="last_name" name="last_name" type="text" placeholder="Apellido" class="swal2-input">
              <input id="email" name="email" type="email" placeholder="Email" class="swal2-input">
              <input id="password" name="password" type="password" placeholder="Contraseña" class="swal2-input">
            `,
            focusConfirm: false,
            confirmButtonText: "Registrar",
            preConfirm: () => {
              const first_name = document.getElementById("first_name").value
              const last_name = document.getElementById("last_name").value
              const email = document.getElementById("email").value
              const password = document.getElementById("password").value
              if (!first_name || !last_name || !email || !password) {
                Swal.showValidationMessage("Todos los campos son obligatorios")
              }
              return [first_name, last_name, email, password]
              }
            }).then(async (formValues) => {
              if (formValues.isConfirmed) {
                const [first_name, last_name, email, password] = formValues.value
                await registerUser(first_name, last_name, email, password)
              }
            })
    }
    return (
        <div>
            <button onClick={handleClick} className="text-gray-300 hover:text-white px-3">Registrarse</button>
        </div>
    )
}