// static/app.js

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: {
            main_title: "Cultural Compass 🧭",
            subtitle: "Tu asistente de viajes y cultura personal.",
            location_placeholder: "¿A qué ciudad o país viajas?",
            days_placeholder: "¿Cuántos días?",
            interests_title: "Selecciona tus intereses principales:",
            taste_art: "🎨 Arte y Cultura",
            taste_food: "🍲 Gastronomía",
            taste_nature: "🌳 Naturaleza",
            taste_nightlife: "🎵 Vida Nocturna",
            taste_history: "🏛️ Historia",
            generate_button: "Generar Experiencia",
            results_title: "Tu Itinerario Personalizado ✨",
            loading_message: "Analizando tus gustos y explorando la cultura local... 🧠",
            alert_destination: "Por favor, completa el destino.",
            alert_interest: "Por favor, selecciona al menos un interés."
        },
        en: {
            main_title: "Cultural Compass 🧭",
            subtitle: "Your personal travel and culture assistant.",
            location_placeholder: "Which city or country are you traveling to?",
            days_placeholder: "How many days?",
            interests_title: "Select your main interests:",
            taste_art: "🎨 Art & Culture",
            taste_food: "🍲 Gastronomy",
            taste_nature: "🌳 Nature",
            taste_nightlife: "🎵 Nightlife",
            taste_history: "🏛️ History",
            generate_button: "Generate Experience",
            results_title: "Your Personalized Itinerary ✨",
            loading_message: "Analyzing your tastes and exploring local culture... 🧠",
            alert_destination: "Please, fill in the destination.",
            alert_interest: "Please, select at least one interest."
        },
        fr: {
            main_title: "Cultural Compass �",
            subtitle: "Votre assistant personnel de voyage et de culture.",
            location_placeholder: "Dans quelle ville ou pays voyagez-vous ?",
            days_placeholder: "Combien de jours ?",
            interests_title: "Sélectionnez vos principaux intérêts :",
            taste_art: "🎨 Art & Culture",
            taste_food: "🍲 Gastronomie",
            taste_nature: "🌳 Nature",
            taste_nightlife: "🎵 Vie nocturne",
            taste_history: "🏛️ Histoire",
            generate_button: "Générer l'expérience",
            results_title: "Votre itinéraire personnalisé ✨",
            loading_message: "Analyse de vos goûts et exploration de la culture locale... 🧠",
            alert_destination: "Veuillez indiquer la destination.",
            alert_interest: "Veuillez sélectionner au moins un intérêt."
        },
        de: {
            main_title: "Cultural Compass 🧭",
            subtitle: "Ihr persönlicher Reise- und Kulturassistent.",
            location_placeholder: "In welche Stadt oder welches Land reisen Sie?",
            days_placeholder: "Wie viele Tage?",
            interests_title: "Wählen Sie Ihre Hauptinteressen:",
            taste_art: "🎨 Kunst & Kultur",
            taste_food: "🍲 Gastronomie",
            taste_nature: "🌳 Natur",
            taste_nightlife: "🎵 Nachtleben",
            taste_history: "🏛️ Geschichte",
            generate_button: "Erlebnis generieren",
            results_title: "Ihr personalisierter Reiseplan ✨",
            loading_message: "Analysiere deine Vorlieben und erkunde die lokale Kultur... 🧠",
            alert_destination: "Bitte geben Sie das Reiseziel ein.",
            alert_interest: "Bitte wählen Sie mindestens ein Interesse aus."
        },
        pt: {
            main_title: "Cultural Compass 🧭",
            subtitle: "Seu assistente pessoal de viagens e cultura.",
            location_placeholder: "Para qual cidade ou país você está viajando?",
            days_placeholder: "Quantos dias?",
            interests_title: "Selecione seus principais interesses:",
            taste_art: "🎨 Arte & Cultura",
            taste_food: "🍲 Gastronomia",
            taste_nature: "🌳 Natureza",
            taste_nightlife: "🎵 Vida Noturna",
            taste_history: "🏛️ História",
            generate_button: "Gerar Experiência",
            results_title: "Seu Roteiro Personalizado ✨",
            loading_message: "Analisando seus gostos e explorando a cultura local... 🧠",
            alert_destination: "Por favor, preencha o destino.",
            alert_interest: "Por favor, selecione pelo menos um interesse."
        },
        it: {
            main_title: "Cultural Compass 🧭",
            subtitle: "Il tuo assistente personale di viaggio e cultura.",
            location_placeholder: "In quale città o paese stai viaggiando?",
            days_placeholder: "Quanti giorni?",
            interests_title: "Seleziona i tuoi interessi principali:",
            taste_art: "🎨 Arte & Cultura",
            taste_food: "🍲 Gastronomia",
            taste_nature: "🌳 Natura",
            taste_nightlife: "🎵 Vita notturna",
            taste_history: "🏛️ Storia",
            generate_button: "Genera Esperienza",
            results_title: "Il tuo Itinerario Personalizzato ✨",
            loading_message: "Analizzando i tuoi gusti ed esplorando la cultura locale... 🧠",
            alert_destination: "Per favore, inserisci la destinazione.",
            alert_interest: "Per favore, seleziona almeno un interesse."
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        const translation = translations[lang] || translations.en;
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translation[key]) {
                if (element.placeholder) {
                    element.placeholder = translation[key];
                } else {
                    element.innerHTML = translation[key];
                }
            }
        });
    }

    const locationInput = document.getElementById('location-input');
    const daysInput = document.getElementById('days-input');
    const languageInput = document.getElementById('language-input');
    const generateBtn = document.getElementById('generate-btn');
    const outputColumn = document.getElementById('output-column');
    const itineraryDiv = document.getElementById('itinerary');

    // Evento para cambiar el idioma de la UI
    languageInput.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Traduce la página al cargar
    setLanguage(languageInput.value);

    // Evento para generar el itinerario
    generateBtn.addEventListener('click', async () => {
        const location = locationInput.value;
        const days = daysInput.value;
        const langCode = languageInput.value;
        
        const selectedTastes = document.querySelectorAll('input[name="tastes"]:checked');
        const tastesArray = Array.from(selectedTastes).map(cb => cb.value);
        const tastes = tastesArray.join(', ');

        const currentTranslations = translations[langCode] || translations.en;
        if (location.trim() === '') {
            alert(currentTranslations.alert_destination);
            return;
        }
        if (tastes.trim() === '') {
            alert(currentTranslations.alert_interest);
            return;
        }

        outputColumn.classList.remove('hidden');
        itineraryDiv.innerHTML = `<p style="text-align: center;">${currentTranslations.loading_message}</p>`;

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    location: location,
                    days: days,
                    tastes: tastes,
                    language: languageInput.options[languageInput.selectedIndex].text
                })
            });

            const data = await response.json();
            if (data.itinerary) {
                itineraryDiv.innerHTML = marked.parse(data.itinerary);
            } else {
                itineraryDiv.innerHTML = '<p>Error generating itinerary.</p>';
            }
        } catch (error) {
            console.error('Error contacting server:', error);
            itineraryDiv.innerHTML = '<p>Error contacting server. Please try again.</p>';
        }
    });
});
