import { useNavigate } from "react-router"
import { useRegister } from "../hooks/useRegister"
import { useEffect } from "react"

export const RegisterForm = () => {
    const {handleRegister, body, error} = useRegister()
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const email = formData.get('email')
        const password = formData.get('password')
        if(!first_name || !last_name || !email || !password) return
        handleRegister({first_name, last_name, email, password})
    }
    useEffect(() => {
        if(body) {
            navigate('/login')
        }
    }, [body, navigate])
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" name="first_name" placeholder="First Name" />
            <input type="text" name="last_name" placeholder="Last Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>
        {error && <div>{error}</div>}
        {body && <div>{JSON.stringify(body)}</div>}
        </div>
    )
}