function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-blue-600">¡Bienvenido al Sistema!</h1>
        <p className="text-gray-600 mt-4">Explora las diferentes funcionalidades desde el menú principal.</p>
        <a href="/login" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Iniciar Sesión
        </a>
      </div>
    );
  }
  
  export default HomePage;