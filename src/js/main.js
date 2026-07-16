document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const toggle = document.querySelector('.nav-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const themeColors = { dark: '#0b060e', light: '#f5f1fa' };

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        if (themeColor) themeColor.setAttribute('content', themeColors[theme]);
    };

    applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('a').forEach((link) =>
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        })
    );

    // Live Steam level — kept fresh by the steam-level GitHub Action.
    // Falls back silently to the value baked into the HTML.
    fetch('src/data/steam.json', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
            if (!data || !Number.isFinite(data.level)) return;
            document
                .querySelectorAll('.st-level')
                .forEach((el) => (el.textContent = 'Lvl ' + data.level));
        })
        .catch(() => {});

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            }
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});
