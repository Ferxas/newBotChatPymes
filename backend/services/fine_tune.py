import openai
from config.openai import openai

def start_fine_tuning(file_path):
    """
    Inicia el proceso de fine-tuning con un archivo JSONL.
    :param file_path: Ruta al archivo JSONL para el entrenamiento.
    :return: ID del proceso de fine-tuning.
    """
    try:
        response = openai.FineTune.create(
            training_file=file_path
        )
        return response['id']
    except openai.OpenAIError as e:
        raise Exception(f"Error al iniciar el fine-tuning: {e}")


def get_fine_tune_status(fine_tune_id):
    """
    Consulta el estado de un proceso de fine-tuning.
    :param fine_tune_id: ID del proceso de fine-tuning.
    :return: Estado actual del proceso.
    """
    try:
        response = openai.FineTune.retrieve(id=fine_tune_id)
        return response['status']
    except openai.OpenAIError as e:
        raise Exception(f"Error al obtener el estado del fine-tuning: {e}")


def list_fine_tune_jobs():
    """
    Lista todos los trabajos de fine-tuning activos.
    :return: Lista de trabajos de fine-tuning.
    """
    try:
        response = openai.FineTune.list()
        return response['data']
    except openai.OpenAIError as e:
        raise Exception(f"Error al listar trabajos de fine-tuning: {e}")