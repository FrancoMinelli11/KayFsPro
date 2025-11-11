import { createContext, useEffect, useState } from "react"
import { getCurrentUser, login, logout } from "../services/auth.service"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    
      const loginUser = async (email, password) => {
        try {
          const res = await login(email, password)
          console.log(res)
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
        <AuthContext.Provider value={{user, error, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
} 