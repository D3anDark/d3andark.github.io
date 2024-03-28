particlesJS('particles-js',

    {
        "particles": {
            "number": {
                "value": 250,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 100,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 80,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }

);

document.addEventListener("DOMContentLoaded", function() {
    var lines = document.querySelectorAll('.line');
    var randomOffset = Math.floor(Math.random() * 100) + 'vw';
    // Przesuń linię o losową wartość w poziomie
    lines.forEach(function(line) {
        line.style.left = randomOffset;
    });
    // Po zakończeniu animacji przesuń linię o losową wartość w poziomie
    lines.forEach(function(line) {
        line.addEventListener('animationiteration', function() {
            // Po zakończeniu animacji przesuń linię o losową wartość w poziomie
            var randomOffset = Math.floor(Math.random() * 100) + 'vw';
            line.style.left = randomOffset;
        });
    });
});

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