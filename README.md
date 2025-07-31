# Cultural Compass 🧭

**Cultural Compass** is a personal travel and culture assistant that generates creative and personalized itineraries using Google Gemini's artificial intelligence and Qloo's cultural affinity database. This project was developed for the Qloo Global Hackathon.

---

## ✨ Key Features

- **Personalized Itineraries:** Generates a detailed travel plan based on your destination, duration, and a selection of personal interests such as art, gastronomy, or nature.
- **Cultural Intelligence:** Uses the Qloo API to get information about popular movies in the destination, using this as a proxy for the location's "cultural pulse" to enrich the recommendations.
- **Multilingual Interface:** The user interface and AI responses adapt to the language selected by the user (Spanish, English, French, etc.), creating a truly global experience.
- **Full-Screen Experience:** A modern dual-column design that leverages the entire screen for an immersive experience.
- **Formatted Output:** The AI generates the itinerary using Markdown, which is rendered on the frontend for clear and pleasant readability.

---

## 🛠️ Tech Stack

- **Backend:** Python with Flask
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **External APIs:**
  - **Qloo Taste AI™ API:** To obtain cultural data and affinities.
  - **Google Gemini API:** For natural language processing and itinerary generation.
- **Key Libraries:**
  - `python-dotenv`: To manage environment variables.
  - `requests`: For calls to the Qloo API.
  - `google-generativeai`: To interact with Gemini.
  - `marked.js`: To render Markdown on the frontend.

---

## 🚀 How to Run It Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/Cultural-Compass-proyect.git](https://github.com/your-username/Cultural-Compass-proyect.git)
    cd Cultural-Compass-proyect
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up your Environment Variables:**
    - Create a file named `.env` in the root of the project.
    - Copy the content from `.env.example` into your new `.env` file.
    - Replace the placeholder values with your actual API keys from Qloo and Google AI Studio.
5.  **Run the application:**
    ```bash
    python app.py
    ```
6.  Open your browser and go to `http://127.0.0.1:5000`.


