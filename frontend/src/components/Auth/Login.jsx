import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AuthHeader from './AuthHeader'
import GoogleLoginButton from '../Common/GoogleLoginButton'
import Loader from '../Common/Loader'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, googleLogin } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AuthHeader />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Welcome Back to EdTech
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            {loading ? <Loader size="small" /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <GoogleLoginButton onClick={googleLogin} />
        </div>

        <p className="mt-6 text-center text-gray-600">
          New to EdTech?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login