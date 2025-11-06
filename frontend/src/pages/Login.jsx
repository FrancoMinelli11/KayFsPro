import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
export const Login = () => {
    const {user, error,loginUser} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        loginUser(email,password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Ingrese su email" />
                <input type="text" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Ingrese su contraseña" />
                <button type="submit">Iniciar sesión</button>
            </form>
            {user && <p>Bienvenido, {user.payload.email}!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    )
}