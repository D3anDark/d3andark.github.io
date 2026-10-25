import steam from './steam.json';

export const site = 'https://deandark.me';
export { steam };

export const links = {
	discord: 'https://discord.com/users/328161853211541506',
	server: 'https://discord.gg/hzd',
	email: 'mailto:contact@deandark.me',
	github: 'https://github.com/D3anDark',
	steam: 'https://steamcommunity.com/id/DeanDark/',
	unisic: 'https://unisic.app',
	unisicSource: 'https://github.com/unisic/unisic',
	tuni: 'https://tuni.unisic.app',
	tuniSource: 'https://github.com/unisic/tuni'
};

export const install = ['curl -fsSL https://unisic.app/install.sh | bash'];

/** Inner ring first. Labels live in the copy. */
export const stack = [
	['Linux', 'Wayland', 'Git', 'CMake', 'PipeWire'],
	['Qt 6', 'QML', 'GTK4', 'libadwaita', 'React', 'Vercel'],
	['C++', 'Rust', 'Python', 'Kotlin', 'JavaScript', 'C#', 'SQL', 'HTML & CSS'],
	['Self-hosting', 'Linux servers', 'Docker', 'Reverse proxies', 'systemd']
];

export const setup = [
	['OS', 'Fedora 44 · KDE Plasma'],
	['CPU', 'Intel Core i5-13400F'],
	['GPU', 'NVIDIA RTX 4060 Ti 8 GB'],
	['RAM', '32 GB DDR4'],
	['Monitor', 'Samsung Odyssey G5']
];

export const games = ['Portal', 'Papers, Please', 'Stardew Valley', 'Overwatch', 'The Witcher', "Garry's Mod", 'Minecraft'];

/** Order matches copy.unisic.gallery. */
export const gallery = [
	{ src: '/images/unisic-capture.webp', w: 1060, h: 700 },
	{ src: '/images/unisic-editor.webp', w: 1095, h: 1048 },
	{ src: '/images/unisic-record.webp', w: 1060, h: 700 },
	{ src: '/images/unisic-edit.webp', w: 1060, h: 700 },
	{ src: '/images/unisic-history.webp', w: 1060, h: 700 }
];

/** From the Tuni README: 200 MiB of mixed output, best of two runs, one machine. */
export const bench = [
	{ name: 'urxvt', engine: 'X11, CPU', mibs: 126.6 },
	{ name: 'foot', engine: 'Wayland, CPU', mibs: 118.3 },
	{ name: 'tuni', engine: 'GTK4 + libghostty-vt', mibs: 116.0 },
	{ name: 'alacritty', engine: 'GPU, OpenGL', mibs: 112.0 }
];

/** Order matches copy.moons.items. */
export const moons = [
	{ name: 'uniscript', tags: 'Python · Textual', href: 'https://github.com/unisic/uniscript' },
	{ name: 'unisic-kit', tags: 'C++ · QML', href: 'https://github.com/unisic/unisic-kit' }
];

/** Order matches copy.belt.items. */
export const belt = [
	{ name: 'DexSearch', year: 2026, tags: 'Kotlin · Android · PWA', href: 'https://deandark.me/dexsearch/' },
	{ name: 'EduNote', year: 2026, tags: 'Tablet · Desktop', href: 'https://github.com/D3anDark/edunote-releases' },
	{ name: 'Bingo', year: 2025, tags: 'Svelte · TypeScript', href: 'https://deandark.me/Bingo/', img: '/images/bingo.webp' },
	{ name: 'Space', year: 2024, tags: 'JavaScript', href: 'https://deandark.me/space', img: '/images/space.webp' },
	{ name: 'Netykieta', year: 2024, tags: 'HTML · PL', href: 'https://netykieta.vercel.app', img: '/images/netykieta.webp' },
	{ name: 'Pretty Design', year: 2024, tags: 'CSS', href: 'https://pretty-design.vercel.app', img: '/images/pretty-design.webp' }
];

export const copy = {
	en: {
		meta: {
			title: 'DeanDark · open-source software for Linux',
			description:
				'DeanDark, a developer from Katowice building open-source tools for Linux: Unisic, Tuni and a belt of smaller projects.'
		},
		skip: 'Skip to content',
		menu: 'Menu',
		close: 'Close',
		langLabel: 'Change language',
		nav: { signature: 'Signature', system: 'System', unisic: 'Unisic', tuni: 'Tuni', belt: 'Belt', horizon: 'Contact' },
		hud: { distance: 'distance', dilation: 'time dilation' },
		hero: {
			kicker: 'Developer · Katowice, Poland',
			lead: 'I write open-source software for Linux: a screenshot tool that keeps going after the shot, a terminal that remembers your whole workspace, and smaller things in between.',
			cue: 'Scroll to fall in',
			note: 'A Schwarzschild black hole, ray-traced live in your browser. The name sits behind it; the light goes around.'
		},
		signature: {
			label: 'Signature',
			title: 'I learn what pulls me in. The rest I don’t force.',
			card: [
				['Designation', 'DeanDark'],
				['Class', 'Developer, Linux-native'],
				['Position', 'Katowice, Poland'],
				['First light', 'Around age 10'],
				['Spectrum', 'HTML · CSS · JS · Python · C# · SQL, now C++ · QML · Rust'],
				['Home system', 'Fedora 44 · KDE Plasma']
			],
			body: [
				'First lines of code at around ten, out of plain curiosity. It never wore off. The web came first, then Python, C# and SQL. Today most of my hours go into C++ and QML for Unisic, and Rust for Tuni.',
				'My one rule for learning: there has to be real pull. Forced work gives forced results, in code and everywhere else.',
				'I like helping people. I spent a long stretch on the support team of the StartIT Discord bot; now I run my own server, Horyzont Zdarzeń, and answer whoever uses what I build.',
				'Away from the editor: the terminal, self-hosting, Linux servers, containers, reverse proxies. Linux is home, Fedora is the daily driver.'
			],
			fieldsLabel: 'Strong gravitational fields',
			fields: [
				['Astrophysics & geopolitics', 'The two rabbit holes I fall into most often.'],
				['Music', 'A heavy listener. Piano and drums are on the someday list.'],
				['Games', 'From Portal and Papers, Please to Stardew Valley and The Witcher.']
			],
			stats: [
				['~10', 'age at the first line of code'],
				['8', 'languages in orbit'],
				['2', 'flagships: Unisic and Tuni'],
				['∞', 'still left to learn']
			]
		},
		now: {
			label: 'Current orbit',
			title: 'Where the hours go right now',
			live: 'Live',
			items: [
				['Unisic', 'Shipping features and chasing edge cases along the whole capture-to-share path on Wayland.'],
				['Tuni', 'A native terminal workspace in Rust and GTK4: panes, projects, git and SSH in one window.'],
				['C++ & QML', 'Going deeper into native desktop work: performance, architecture, interfaces that feel right.'],
				['Horyzont Zdarzeń', 'Keeping the community alive and answering whoever runs into my code.']
			]
		},
		system: {
			label: 'System',
			title: 'Everything in orbit around the work',
			sub: 'Grouped by orbit. The closer to the centre, the closer to the metal.',
			rings: ['Platform', 'Frameworks & UI', 'Languages', 'Ops & self-hosting']
		},
		unisic: {
			label: 'Flagship',
			meta: 'Linux · Wayland · GPLv3',
			tagline: 'Other tools stop at the screenshot. Unisic starts there.',
			body: 'Screenshots and screen recording for Linux on Wayland, covering the whole trip: draw on the selection before the shot exists, polish it in the editor, record the same region as a GIF or video, then send it to the clipboard, the disk or your own upload destination with the link already copied. Legitimate APIs only. Zero telemetry.',
			demo: {
				title: 'Try it: drag across the screen below.',
				hint: 'Drag to select',
				keyboard: 'Select a sample area',
				escape: 'Esc cancels',
				note: 'A simulation in your browser. The real one runs on your desktop.',
				actions: ['Copy', 'Save', 'Record', 'Upload'],
				done: [
					'Copied {w}×{h} to the clipboard',
					'Saved capture-{n}.png',
					'Recording {w}×{h} at 60 fps',
					'Uploaded, link in your clipboard'
				]
			},
			features: [
				['Silent capture', 'No flash, no notification, nothing in the frame you didn’t put there.'],
				['Draw first, shoot second', 'Annotate on the live selection overlay, then take the shot.'],
				['Editor included', 'Blur, pixelate, numbered steps, crop, object cutout and a toolbox that keeps growing.'],
				['GIF · MP4 · WebM', 'Record the same region as video, through PipeWire.'],
				['Your destinations', 'Upload wherever you choose. The link lands in your clipboard.'],
				['Zero telemetry', 'No account, nothing phones home. Free and open source.']
			],
			install: 'Install on any Linux',
			installNote: 'Fedora, Debian, Ubuntu, Arch, openSUSE or AppImage, picked for you',
			copy: 'Copy',
			copied: 'Copied',
			tech: 'C++20 · Qt 6 · QML, on xdg-desktop-portal, KWin ScreenShot2 and PipeWire.',
			site: 'unisic.app',
			source: 'Source on GitHub',
			galleryLabel: 'Exposure log',
			gallery: [
				'Capture: annotate before the shot',
				'Editor: polish every capture',
				'Record: video or GIF, with a replay buffer',
				'Edit: open an image or a video you already have',
				'History: every capture, one click away'
			]
		},
		tuni: {
			label: 'Binary companion',
			meta: 'Rust · GTK4 · libadwaita',
			tagline: 'A terminal that keeps the whole workspace, not just the shell.',
			body: 'Tuni is a native terminal workspace for Linux. Panes split in a niri-style layout and group into projects and tabs, with a file tree, a git panel that stages hunks and a source editor right beside the shells. Ghostty’s libghostty-vt does the emulation.',
			credit: 'A ground-up Linux take on kero, the macOS workspace.',
			alt: 'Tuni: a project list, two shell panes, a Rust source file and the git panel side by side',
			features: [
				'Hosts straight from ~/.ssh/config, one shared connection per machine, and SFTP for the machine a pane is on.',
				'A long command finishing in a tab you aren’t watching tells you what it was and how long it took.',
				'Drag a tab or a whole project into its own window without restarting the shells inside.',
				'A coding agent thinking in a pane spins on its tab and flags you when it’s done.',
				'Ghostty’s 574 themes, painting the window chrome as well as the terminal.',
				'Stores no secrets. SSH stays OpenSSH’s job, so passwords and 2FA are answered where they always were.'
			],
			benchTitle: 'Throughput',
			benchUnit: 'MiB/s',
			benchNote: '200 MiB of mixed plain and SGR-coloured output, best of two runs, one machine. Higher is better.',
			site: 'tuni.unisic.app',
			source: 'Source on GitHub'
		},
		moons: {
			label: 'Rest of the Unisic system',
			items: [
				'Post-install Linux setup from the terminal. Detects the distro, package manager and hardware, offers only the tasks that fit, and prints the exact commands before you confirm.',
				'The C++ and QML foundation Unisic is built on.'
			]
		},
		belt: {
			label: 'Asteroid belt',
			title: 'Smaller bodies, still in orbit',
			sub: 'Side projects across the years, from first websites to native apps.',
			items: [
				'Offline Pokédex and team builder: every Pokémon, form, move and item from Gen 1 to 9, Smogon sets and Showdown export. Native on Android, an installable web app on iPhone, four languages.',
				'Study notes for a stylus tablet and the computer: handwriting on A4 pages, live Markdown, a PDF beside the note, flashcards and an AI assistant.',
				'Bingo boards for parties, streams and meetings. Play solo or with friends in a room behind an invite code, with a streamer mode that keeps the code off the screen.',
				'A drifting space background with quotes about space and life that change over time.',
				'The rules of the internet, written up in Polish.',
				'Free designs to grab and reuse.'
			]
		},
		station: {
			label: 'Ground station',
			title: 'Where the signal comes from',
			setupLabel: 'Telemetry',
			offLabel: 'Off-duty',
			off: 'When the editor is closed, odds are a game is open. Long-time favourites:',
			steam: 'on Steam',
			level: 'Level'
		},
		trajectory: {
			label: 'Trajectory',
			title: 'Flight log',
			items: [
				['T+0', 'Ignition', 'First lines of code at around ten. Curiosity did the rest.'],
				['T+1', 'The web years', 'HTML, CSS and JavaScript, then Python, C# and SQL. Small sites and side projects to learn how the pieces fit.'],
				['T+2', 'Ground crew', 'Joined the support team of the StartIT Discord bot. Learned patience, people, and how to explain things clearly.'],
				['T+3', 'Leaving Windows', 'Hopped across distros until Fedora stuck. Picked up the UNIX philosophy; the terminal became home.'],
				['T+now', 'Today', 'Unisic, Tuni, and the next thing already on the launch pad.']
			]
		},
		horizon: {
			label: 'Event horizon',
			title: 'Past this point, nothing escapes.',
			body: 'Messages included, so I’ll answer. Discord is fastest; everything below works.',
			channels: ['Direct message', 'My Discord server', 'Email', 'GitHub'],
			lensed: 'EVENT HORIZON',
			footer: 'Built with Svelte and a few hundred lines of general relativity. Katowice, Poland.'
		}
	},
	pl: {
		meta: {
			title: 'DeanDark · otwarte oprogramowanie dla Linuksa',
			description:
				'DeanDark, programista z Katowic, który tworzy otwarte narzędzia dla Linuksa: Unisic, Tuni i pas mniejszych projektów.'
		},
		skip: 'Przejdź do treści',
		menu: 'Menu',
		close: 'Zamknij',
		langLabel: 'Zmień język',
		nav: { signature: 'Sygnatura', system: 'Układ', unisic: 'Unisic', tuni: 'Tuni', belt: 'Pas', horizon: 'Kontakt' },
		hud: { distance: 'odległość', dilation: 'dylatacja czasu' },
		hero: {
			kicker: 'Programista · Katowice',
			lead: 'Piszę otwarte oprogramowanie dla Linuksa: narzędzie do zrzutów ekranu, które nie kończy pracy na zrzucie, terminal, który pamięta całą przestrzeń roboczą, i mniejsze rzeczy pomiędzy.',
			cue: 'Przewiń, żeby wpaść',
			note: 'Czarna dziura Schwarzschilda liczona na żywo w twojej przeglądarce. Napis leży za nią, a światło go obchodzi.'
		},
		signature: {
			label: 'Sygnatura',
			title: 'Uczę się tego, co mnie wciąga. Reszty nie robię na siłę.',
			card: [
				['Oznaczenie', 'DeanDark'],
				['Klasa', 'Programista, natywnie linuksowy'],
				['Położenie', 'Katowice'],
				['Pierwsze światło', 'Około 10 lat'],
				['Widmo', 'HTML · CSS · JS · Python · C# · SQL, dziś C++ · QML · Rust'],
				['Układ domowy', 'Fedora 44 · KDE Plasma']
			],
			body: [
				'Pierwsze linijki kodu napisałem mając około dziesięciu lat, z czystej ciekawości. Nie przeszło. Najpierw web, potem Python, C# i SQL. Dziś większość godzin idzie w C++ i QML (Unisic) oraz w Rusta (Tuni).',
				'Mam jedną zasadę nauki: musi ciągnąć. Robione na siłę daje wynik na siłę, w kodzie i wszędzie indziej.',
				'Lubię pomagać. Długo byłem w zespole wsparcia bota StartIT na Discordzie, dziś prowadzę własny serwer Horyzont Zdarzeń i odpowiadam każdemu, kto używa tego, co buduję.',
				'Poza edytorem: terminal, self-hosting, serwery na Linuksie, kontenery, reverse proxy. Linux to dom, Fedora na co dzień.'
			],
			fieldsLabel: 'Silne pola grawitacyjne',
			fields: [
				['Astrofizyka i geopolityka', 'Dwie królicze nory, w które wpadam najczęściej.'],
				['Muzyka', 'Słucham dużo. Pianino i perkusja czekają na liście „kiedyś”.'],
				['Gry', 'Od Portala i Papers, Please po Stardew Valley i Wiedźmina.']
			],
			stats: [
				['~10', 'lat przy pierwszej linijce kodu'],
				['8', 'języków na orbicie'],
				['2', 'okręty flagowe: Unisic i Tuni'],
				['∞', 'wciąż do nauczenia']
			]
		},
		now: {
			label: 'Obecna orbita',
			title: 'Gdzie teraz idą godziny',
			live: 'Na żywo',
			items: [
				['Unisic', 'Nowe funkcje i polowanie na przypadki brzegowe na całej drodze od zrzutu do udostępnienia na Waylandzie.'],
				['Tuni', 'Natywna przestrzeń robocza w terminalu, w Ruście i GTK4: panele, projekty, git i SSH w jednym oknie.'],
				['C++ i QML', 'Głębiej w natywny desktop: wydajność, architektura, interfejsy, które dobrze leżą w dłoni.'],
				['Horyzont Zdarzeń', 'Utrzymuję społeczność przy życiu i odpowiadam każdemu, kto trafi na mój kod.']
			]
		},
		system: {
			label: 'Układ',
			title: 'Wszystko, co krąży wokół pracy',
			sub: 'Pogrupowane według orbit. Im bliżej środka, tym bliżej sprzętu.',
			rings: ['Platforma', 'Frameworki i UI', 'Języki', 'Ops i self-hosting']
		},
		unisic: {
			label: 'Okręt flagowy',
			meta: 'Linux · Wayland · GPLv3',
			tagline: 'Inne narzędzia kończą na zrzucie ekranu. Unisic od niego zaczyna.',
			body: 'Zrzuty i nagrywanie ekranu dla Linuksa na Waylandzie, przez całą drogę: rysujesz na zaznaczeniu, zanim zrzut w ogóle powstanie, dopracowujesz go w edytorze, nagrywasz ten sam obszar jako GIF albo wideo i wysyłasz do schowka, na dysk lub na własny serwer, z linkiem już skopiowanym. Wyłącznie oficjalne API. Zero telemetrii.',
			demo: {
				title: 'Spróbuj: przeciągnij po ekranie poniżej.',
				hint: 'Przeciągnij, aby zaznaczyć',
				keyboard: 'Zaznacz przykładowy obszar',
				escape: 'Esc anuluje',
				note: 'Symulacja w przeglądarce. Prawdziwy program działa na pulpicie.',
				actions: ['Kopiuj', 'Zapisz', 'Nagraj', 'Wyślij'],
				done: [
					'Skopiowano {w}×{h} do schowka',
					'Zapisano zrzut-{n}.png',
					'Nagrywam {w}×{h}, 60 kl./s',
					'Wysłano, link jest w schowku'
				]
			},
			features: [
				['Cichy zrzut', 'Bez błysku, bez powiadomienia, w kadrze tylko to, co sam tam umieściłeś.'],
				['Najpierw rysujesz, potem strzelasz', 'Adnotacje na żywym zaznaczeniu, dopiero potem zrzut.'],
				['Edytor w zestawie', 'Rozmycie, pikselizacja, numerowane kroki, kadrowanie, wycinanie obiektów i stale rosnący zestaw narzędzi.'],
				['GIF · MP4 · WebM', 'Ten sam obszar nagrasz jako wideo, przez PipeWire.'],
				['Twoje miejsca docelowe', 'Wysyłasz tam, gdzie chcesz, a link ląduje w schowku.'],
				['Zero telemetrii', 'Bez konta, nic nie dzwoni do domu. Wolne i otwarte oprogramowanie.']
			],
			install: 'Instalacja na każdym Linuksie',
			installNote: 'Fedora, Debian, Ubuntu, Arch, openSUSE albo AppImage, dobrane samo',
			copy: 'Kopiuj',
			copied: 'Skopiowano',
			tech: 'C++20 · Qt 6 · QML, na xdg-desktop-portal, KWin ScreenShot2 i PipeWire.',
			site: 'unisic.app',
			source: 'Kod na GitHubie',
			galleryLabel: 'Dziennik ekspozycji',
			gallery: [
				'Zrzut: adnotacje przed zrobieniem zrzutu',
				'Edytor: dopracuj każdy zrzut',
				'Nagrywanie: wideo albo GIF, z buforem powtórki',
				'Edycja: otwórz obraz albo wideo, które już masz',
				'Historia: każdy zrzut na jedno kliknięcie'
			]
		},
		tuni: {
			label: 'Układ podwójny',
			meta: 'Rust · GTK4 · libadwaita',
			tagline: 'Terminal, który trzyma całą przestrzeń roboczą, nie tylko powłokę.',
			body: 'Tuni to natywna przestrzeń robocza w terminalu dla Linuksa. Panele dzielą się w układzie w stylu niri i grupują w projekty i karty, a tuż obok powłok stoją drzewo plików, panel gita ze stage’owaniem pojedynczych fragmentów i edytor kodu. Emulację robi libghostty-vt z Ghostty.',
			credit: 'Linuksowa implementacja od zera kero, przestrzeni roboczej z macOS.',
			alt: 'Tuni: lista projektów, dwa panele z powłoką, plik źródłowy w Ruście i panel gita obok siebie',
			features: [
				'Hosty prosto z ~/.ssh/config, jedno współdzielone połączenie na maszynę i SFTP dla maszyny, na której stoi panel.',
				'Długie polecenie, które kończy się w karcie, na którą nie patrzysz, powie ci, czym było i ile trwało.',
				'Przeciągasz kartę albo cały projekt do osobnego okna bez restartu powłok w środku.',
				'Agent AI myślący w panelu kręci się na swojej karcie i daje znać, gdy skończy.',
				'574 motywy z Ghostty, które malują też ramę okna, nie tylko terminal.',
				'Nie przechowuje sekretów. SSH zostaje robotą OpenSSH, więc hasła i 2FA podajesz tam, gdzie zawsze.'
			],
			benchTitle: 'Przepustowość',
			benchUnit: 'MiB/s',
			benchNote: '200 MiB zwykłego i kolorowanego (SGR) wyjścia, najlepszy z dwóch przebiegów, jedna maszyna. Więcej znaczy lepiej.',
			site: 'tuni.unisic.app',
			source: 'Kod na GitHubie'
		},
		moons: {
			label: 'Reszta układu Unisic',
			items: [
				'Konfiguracja Linuksa po instalacji, z terminala. Wykrywa dystrybucję, menedżer pakietów i sprzęt, proponuje tylko pasujące zadania i pokazuje dokładne polecenia, zanim potwierdzisz.',
				'Fundament C++ i QML, na którym stoi Unisic.'
			]
		},
		belt: {
			label: 'Pas planetoid',
			title: 'Mniejsze ciała, wciąż na orbicie',
			sub: 'Poboczne projekty z różnych lat, od pierwszych stron po natywne aplikacje.',
			items: [
				'Pokédex i kreator drużyn bez internetu: każdy Pokémon, forma, ruch i przedmiot z generacji 1 do 9, zestawy ze Smogona i eksport do Showdowna. Natywnie na Androidzie, jako instalowana aplikacja webowa na iPhonie, w czterech językach.',
				'Notatki do nauki na tablet z rysikiem i komputer: pismo odręczne na stronach A4, Markdown na żywo, PDF obok notatki, fiszki i asystent AI.',
				'Plansze bingo na imprezy, streamy i spotkania. Gra solo albo ze znajomymi w pokoju na kod zaproszenia, z trybem streamera, który chowa kod przed widzami.',
				'Dryfujące kosmiczne tło z cytatami o kosmosie i życiu, które co jakiś czas się zmieniają.',
				'Zasady netykiety spisane po polsku.',
				'Darmowe projekty do wzięcia i ponownego użycia.'
			]
		},
		station: {
			label: 'Stacja naziemna',
			title: 'Skąd nadaje sygnał',
			setupLabel: 'Telemetria',
			offLabel: 'Po godzinach',
			off: 'Kiedy edytor jest zamknięty, pewnie otwarta jest gra. Ulubione od lat:',
			steam: 'na Steamie',
			level: 'Poziom'
		},
		trajectory: {
			label: 'Trajektoria',
			title: 'Dziennik lotu',
			items: [
				['T+0', 'Zapłon', 'Pierwsze linijki kodu w wieku około dziesięciu lat. Resztę zrobiła ciekawość.'],
				['T+1', 'Lata webowe', 'HTML, CSS i JavaScript, potem Python, C# i SQL. Małe strony i poboczne projekty, żeby zrozumieć, jak to wszystko się składa.'],
				['T+2', 'Obsługa naziemna', 'Dołączyłem do zespołu wsparcia bota StartIT na Discordzie. Nauczyłem się cierpliwości, ludzi i jasnego tłumaczenia.'],
				['T+3', 'Ucieczka z Windowsa', 'Skakałem po dystrybucjach, aż została Fedora. Złapałem filozofię UNIX-a, a terminal stał się domem.'],
				['T+teraz', 'Dziś', 'Unisic, Tuni i następna rzecz już na płycie startowej.']
			]
		},
		horizon: {
			label: 'Horyzont zdarzeń',
			title: 'Za tą granicą nic nie ucieka.',
			body: 'Wiadomości też nie, więc odpiszę. Najszybciej na Discordzie, ale każdy kanał poniżej działa.',
			channels: ['Wiadomość prywatna', 'Mój serwer na Discordzie', 'E-mail', 'GitHub'],
			lensed: 'HORYZONT ZDARZEŃ',
			footer: 'Zbudowane w Svelte i kilkuset linijkach ogólnej teorii względności. Katowice.'
		}
	}
};
