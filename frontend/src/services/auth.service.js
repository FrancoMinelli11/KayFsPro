const API_URL = "http://localhost:8080"

export async function isAdmin() {
    try {
        const res = await fetch(`${API_URL}/user`)
        if (!res.ok) return false
        const data = await res.json()
        if (data.role && data.role === "admin") {
            return true
        }
        return false
    } catch (err) {
        console.error("Error verificando admin:", err)
        return false
    }
}

export async function register(first_name, last_name, email, password) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ first_name, last_name, email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Error en el registro")
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message }
    }
}

export async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Error en el login")
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message }
    }
}
