import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser({ name: decoded.name, email: decoded.email })
            } catch {
                localStorage.removeItem("token")
            }
        }
    }, [])

    const login = token => {
        localStorage.setItem("token", token)
        const decoded = jwtDecode(token)
        setUser({ name: decoded.name, email: decoded.email })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
