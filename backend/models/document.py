from config.db import db
from datetime import datetime

# Referencia a la colección de documentos
documents_collection = db.get_collection("documents")

def save_document(file_name, content, uploaded_by=None):
    """
    Guarda un documento PDF procesado en la base de datos.
    """
    document_entry = {
        "file_name": file_name,
        "content": content,
        "uploaded_by": uploaded_by,
        "uploaded_at": datetime.utcnow()
    }
    result = documents_collection.insert_one(document_entry)
    return result.inserted_id

def get_document_by_name(file_name):
    """
    Recupera un documento por su nombre de archivo.
    """
    return documents_collection.find_one({"file_name": file_name})

def get_all_documents():
    """
    Recupera todos los documentos almacenados.
    """
    documents = documents_collection.find()
    return list(documents)

def delete_document_by_name(file_name):
    """
    Elimina un documento por su nombre de archivo.
    """
    result = documents_collection.delete_one({"file_name": file_name})
    return result.deleted_count