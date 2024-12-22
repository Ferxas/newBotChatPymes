import { useState } from "react";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      authLogin(response.token); // Guardar token en el contexto
      navigate("/chat"); // Redirigir a la página principal
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-2 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <p className="text-sm text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;