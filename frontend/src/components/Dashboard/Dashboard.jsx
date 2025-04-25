import { useAuth } from '../../context/AuthContext'
import AuthHeader from '../Auth/AuthHeader';

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {user.firstName}!
          </h1>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h2 className="text-xl font-semibold text-indigo-700">Your Courses</h2>
              {/* Course list */}
            </div>
            <button
              onClick={logout}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;