import { useState } from "react"
import { register } from "../services/auth.service.js"

export const useRegister = () => {
    const [body, setBody] = useState(null)
    const [error, setError] = useState(null)
    const handleRegister = async ({ first_name, last_name, email, password }) => {
        try {
            const res = await register(first_name, last_name, email, password)
            if (res.error) {
                setError(res.error)
            } else {
                setBody(res.data)
            }
        } catch (err) {
            setError(err.message || "An error occurred")
        }
    }
    return { handleRegister, body, error }
}