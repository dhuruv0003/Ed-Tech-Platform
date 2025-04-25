const AuthHeader = () => (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="EdTech Logo" className="h-12 w-12" />
          <span className="text-2xl font-bold text-indigo-600">EdTech</span>
        </div>
        <nav className="space-x-4">
          <a href="/courses" className="text-gray-600 hover:text-indigo-600">
            Courses
          </a>
          <a href="/about" className="text-gray-600 hover:text-indigo-600">
            About
          </a>
        </nav>
      </div>
    </header>
  )
  
  export default AuthHeader