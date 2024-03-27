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