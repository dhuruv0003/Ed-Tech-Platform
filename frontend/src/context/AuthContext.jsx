import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('edtech_token')
      if (token) {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(res.data)
      }
    } catch (err) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password })
    localStorage.setItem('edtech_token', res.data.token)
    setUser(res.data.user)
    navigate('/dashboard')
  }

  const googleLogin = () => {
    window.open('http://localhost:5000/api/auth/google', '_self')
  }

  const signup = async (formData) => {
    const res = await axios.post('/api/auth/signup', formData)
    localStorage.setItem('edtech_token', res.data.token)
    setUser(res.data.user)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('edtech_token')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, googleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)