const API_URL = "http://localhost:8080"

export async function register(first_name, last_name, email, password) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
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
            credentials: "include",
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Error en el login")
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message }
    }
}

export async function logout() {
    try {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        let data
        const contentType = res.headers.get("content-type")

        // Parsear según el tipo de respuesta
        if (contentType && contentType.includes("application/json")) {
            data = await res.json()
        } else {
            data = await res.text()
        }

        // Si el status no es OK, lanzar un error con el mensaje disponible
        if (!res.ok) {
            const errorMessage =
                (data && data.message) || // si es JSON con message
                (typeof data === "string" ? data : null) || // si es texto plano
                "Error en el logout" // fallback
            throw new Error(errorMessage)
        }

        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message || "Error desconocido" }
    }
}

export async function getCurrentUser() {
    try {
        const res = await fetch(`${API_URL}/user/current`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text()
            throw new Error(`Respuesta inesperada del servidor: ${text}`)
}

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Error al obtener el usuario actual")
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.message }
    }
}