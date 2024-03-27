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

const infoElement = document.querySelector('.info');
const languageSwitchParagraph = document.querySelector('.languageSwitch p');
let languageSwitch = false;

let originalText = infoElement.innerHTML;
let polishText = "Cześć, jestem <b>DeanDark</b>, czyli Junior Developer. Uczę się programować na własną rękę, w większości. I uczę się tego od 10 roku życia, a w wieku 7 lat miałem pierwszą styczność wyłącznie z komputerem. Czasami nie wiedziałem, co robię (czasami nadal się to zdarza).\n" +
    "<br>\n" +
    "&nbsp\n" +
    "<br>\n" +
    "Lubię grać w gry wideo, programować, zajmować się astronomią, geopolityką, uczyć się nowych interesujących rzeczy itp. Czasami w wolnym czasie czytam książki (to naprawdę rzadko, z powodu mojej dysleksji czasami mam z tym trudności) i rysuję.\n" +
    "<br>\n" +
    "Najczęściej gram w gry takie jak - Stardew Valley, Overwatch 2, Minecraft, Osu!, Euro Track Simulator 2 itp.\n" +
    "<br>\n" +
    "&nbsp\n" +
    "<br>\n" +
    "Potrafię takie języki jak Polski (Ojczysty język), Angielski, oraz tak trochę Śląski i Włoski (Ten Włoski proszę brać na dystans).\n" +
    "<br>\n" +
    "&nbsp\n" +
    "<br>\n" +
    "A języki programowania, które umiem to HTML, CSS, Python, TypeScript, SQL i chcę się ich nauczyć więcej!\n" +
    "<br>\n" +
    "&nbsp\n" +
    "<br>\n" +
    "Od jakiegoś czasu moderuję również społeczność bota <a href='https://startit.bot/' target='_blank'>StartIT</a>.";

// Check if there is a stored state in localStorage
if (localStorage.getItem('languageSwitch') !== null) {
    // If there is, set the switch to the stored state
    languageSwitch = localStorage.getItem('languageSwitch') === 'true';

    // Set the text according to the switch state
    infoElement.innerHTML = languageSwitch ? polishText : originalText;
}

languageSwitchParagraph.addEventListener('click', function() {
    languageSwitch = !languageSwitch;
    if (languageSwitch) {
        infoElement.innerHTML = polishText;
    } else {
        infoElement.innerHTML = originalText;
    }


    // Store the state of the switch in localStorage
    localStorage.setItem('languageSwitch', languageSwitch);
});