// Space Communicats
var messages = ["Are we alone?", "Is there another life?", "Why it's so beautiful here", "Why do we exist?", "What is our purpose?",
    "What is the meaning of life?", "What is the universe made of?", "What is the future of humanity?", "What is the future of the universe?",
    "What is the future of the Earth?", "What is the future of the solar system?", "What is the future of the Milky Way?", "What can we learn from the universe?",
    "When will be end?", "Is this meaningless?", "Why are we here?", "What is the purpose of life?", "Can we fix us?", "Can we fix the world?", "Can we do better?",
    "Why do we fight?", "Why do we hate?", "Why do we kill?", "Why do we destroy?", "Why do we pollute?", "How can we change?", "How can we improve?",
    "Is life matter?", "Is life important?", "What is after life?", "What is the beginning?", "Will it finish?", "Will it end?"];

// Ustawiamy interwał, który co 10 sekund (10000 milisekund) pokazuje komunikat
setInterval(function() {
    // Wybieramy losową wiadomość z tablicy
    var message = messages[Math.floor(Math.random() * messages.length)];

    // Ustawiamy wybraną wiadomość jako tekst komunikatu
    document.getElementById('message').innerText = message;

    // Pokazujemy komunikat
    document.getElementById('message').style.display = 'block';

    // Ustawiamy timeout, który po 5 sekundach (5000 milisekund) ukrywa komunikat
    setTimeout(function() {
        document.getElementById('message').style.display = 'none';
    }, 5000);
}, 20000);