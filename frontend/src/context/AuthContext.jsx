import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('adminData')
    
    if (token && adminData) {
      setAdmin(JSON.parse(adminData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const response = await axios.post('/api/admin/login', { username, password })
    const { token, admin: adminData } = response.data
    
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminData', JSON.stringify(adminData))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    setAdmin(adminData)
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    delete axios.defaults.headers.common['Authorization']
    setAdmin(null)
  }

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
