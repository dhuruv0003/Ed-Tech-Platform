import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AuthHeader from './AuthHeader'
import GoogleLoginButton from '../Common/GoogleLoginButton'
import Loader from '../Common/Loader'

const Signup = () => {
  const { signup, googleLogin } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    university: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signup(formData)
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AuthHeader />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Join Our Learning Community
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Other form fields */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            {loading ? <Loader size="small" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-6">
          <GoogleLoginButton onClick={googleLogin} />
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup;