function NotFoundPage() {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-gray-600 mt-4">Página no encontrada.</p>
        <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md">
          Volver al Inicio
        </a>
      </div>
    );
  }
  
  export default NotFoundPage;