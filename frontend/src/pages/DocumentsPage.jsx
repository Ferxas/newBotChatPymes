import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/documents/all");
      setDocuments(response.data.documents || []);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      setError("Error al obtener documentos. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Documentos</h2>
      {loading && <Loader />}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2 border-b pb-2">
            <p><strong>Nombre:</strong> {doc.file_name}</p>
            <p><strong>Subido por:</strong> {doc.uploaded_by}</p>
            <p><strong>Fecha:</strong> {new Date(doc.uploaded_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentsPage;