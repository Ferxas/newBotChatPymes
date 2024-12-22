from flask import Blueprint, request, jsonify
from services.fine_tune import start_fine_tuning, get_fine_tune_status
from flask_jwt_extended import jwt_required

# Crear Blueprint para fine-tuning
fine_tune_bp = Blueprint('fine_tune', __name__)

# Ruta para iniciar el fine-tuning
@fine_tune_bp.route('/start', methods=['POST'])
@jwt_required()
def start_fine_tune():
    """
    Inicia el proceso de fine-tuning con un archivo JSONL.
    """
    data = request.json
    file_path = data.get('file_path')

    if not file_path:
        return jsonify({"error": "El parámetro 'file_path' es obligatorio"}), 400

    try:
        fine_tune_id = start_fine_tuning(file_path)
        return jsonify({
            "message": "Proceso de fine-tuning iniciado correctamente",
            "fine_tune_id": fine_tune_id
        }), 200
    except Exception as e:
        return jsonify({"error": f"Error al iniciar el fine-tuning: {str(e)}"}), 500

# Ruta para consultar el estado del fine-tuning
@fine_tune_bp.route('/status/<string:fine_tune_id>', methods=['GET'])
@jwt_required()
def fine_tune_status(fine_tune_id):
    """
    Obtiene el estado del proceso de fine-tuning.
    """
    try:
        status = get_fine_tune_status(fine_tune_id)
        return jsonify({
            "fine_tune_id": fine_tune_id,
            "status": status
        }), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener el estado del fine-tuning: {str(e)}"}), 500