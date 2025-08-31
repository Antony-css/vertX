export const NotFound = () => {
  return (
    <main className="bg-black text-white font-f2 min-h-screen flex flex-col">
      <title>vertX - Page Not Found</title>
      <div className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="text-center">
          <h1 className="font-f1 text-6xl font-bold mb-4">vertX</h1>
          <h1 className="text-4xl font-bold mb-4">ERROR 404</h1>
          <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
          <a href="/" className="inline-block bg-gray-100 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition">
            Go Back Home
          </a>
        </div>
      </div>
    </main>
  )
}