import { createContext, useEffect, useState } from "react"
import { getCurrentUser, login, logout, register } from "../services/auth.service"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const registerUser = async (first_name, last_name, email, password) => {
    try {
      const res = await register(first_name, last_name, email, password)
      if (res.error) throw new Error(res.error)
      const loginRes = await login(email, password)
      if (loginRes.error) throw new Error(loginRes.error)
      setUser(loginRes.data)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al registrar usuario")
    }
  }
  const loginUser = async (email, password) => {
    try {
      const res = await login(email, password)
      if (res.error) setError(res.error)
      if (res.data) {
        setUser(res.data)
        setError(null)
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión")
    }
  }
  const logoutUser = async () => {
    const res = await logout()
    if (res.error) setError(res.error)
    setUser(null)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser()
      if (res.data) setUser(res.data)
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, error, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  )
} 