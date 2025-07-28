from flask import Flask, request, jsonify, render_template
import requests
import json
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo .env
load_dotenv()

# --- Configuración ---
app = Flask(__name__)

# --- Claves de API leídas desde las variables de entorno ---
QLOO_API_KEY = os.getenv("QLOO_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

try:
    # Asegúrate de que las claves se cargaron correctamente
    if not GOOGLE_API_KEY:
        raise ValueError("La clave de API de Google no fue encontrada en las variables de entorno.")
    genai.configure(api_key=GOOGLE_API_KEY)
except Exception as e:
    print(f"ADVERTENCIA: No se pudo configurar la API de Google. Error: {e}")

INSIGHTS_URL = "https://hackathon.api.qloo.com/v2/insights"


# --- Lógica de la Aplicación (sin cambios) ---

def get_recommendations_from_qloo(location: str):
    if not location or not QLOO_API_KEY:
        return None
    
    params = {
        'filter.type': 'urn:entity:movie',
        'filter.location.query': location,
        'limit': 15 
    }
    headers = {'x-api-key': QLOO_API_KEY}
    response = requests.get(INSIGHTS_URL, params=params, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error de Qloo: {response.text}")
        return None

def generate_itinerary_with_llm(location, days, tastes, language, qloo_data):
    try:
        if not GOOGLE_API_KEY:
             return "La API de Google no está configurada. Por favor, revisa tus variables de entorno."

        qloo_context = "For cultural context, these are popular movies in the area: "
        if qloo_data and qloo_data.get('results', {}).get('entities'):
            item_names = [entity['name'] for entity in qloo_data['results']['entities']]
            qloo_context += ", ".join(item_names)
        else:
            qloo_context = "No specific movie information from Qloo was found for this area."

        prompt_text = f"""
        Act as an expert travel guide. Respond exclusively in {language}. Use Markdown for formatting.
        
        A user wants an itinerary for a trip to "{location}" for {days or 'several'} days.
        Their interests are: "{tastes}".
        
        {qloo_context}.

        Using all this information, create a detailed, creative, and narrative itinerary.
        For each day, use a title (e.g., '### Day 1: Artistic Immersion').
        Use bold to highlight key places or activities.
        Describe the atmosphere of the places and why they align with the user's interests and the local culture.
        """
        
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        response = model.generate_content(prompt_text)
        
        return response.text
        
    except Exception as e:
        print(f"Error generating content with Gemini: {e}")
        return "There was an error generating the recommendation with the AI."


# --- Rutas del Servidor (sin cambios) ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_experience():
    data = request.json
    location = data.get('location')
    days = data.get('days')
    tastes = data.get('tastes')
    language = data.get('language', 'English')

    qloo_results = get_recommendations_from_qloo(location)
    
    itinerary_text = generate_itinerary_with_llm(location, days, tastes, language, qloo_results)
    
    return jsonify({"itinerary": itinerary_text})

# --- Iniciar el Servidor ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)
