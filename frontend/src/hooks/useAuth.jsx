import { useState } from "react"
import { login } from "../services/auth.service"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const loginUser = async (email, password) => {
    try {
      const res = await login(email, password)
      if (res.error) setError(res.error)
      setUser(res.data)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al iniciar sesión")
    }
  }

  return { user, error, loginUser }
}
