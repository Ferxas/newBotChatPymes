import { useEffect, useState } from "react";
import API from "../services/api";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await API.get("/documents/all");
      setDocuments(response.data.documents);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Documentos</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.file_name} className="mb-2 border-b pb-2">
            <p><strong>Nombre:</strong> {doc.file_name}</p>
            <p><strong>Subido por:</strong> {doc.uploaded_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentsPage;