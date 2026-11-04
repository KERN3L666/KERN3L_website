document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Switcher
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else { 
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // 2. GSAP Navigation Menu
    const toggleBtn = document.getElementById("nav-toggle");
    const overlay = document.getElementById("nav-overlay");
    const navItems = document.querySelectorAll(".nav-item");
    const navInfo = document.querySelector(".nav-info");
    const navImages = document.querySelectorAll(".img-box");

    let isMenuOpen = false;

    const navTimeline = gsap.timeline({ paused: true });

    navTimeline
        .to(overlay, {
            duration: 0.75,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut"
        })
        .from(navInfo, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "-=0.25")
        .from(navItems, {
            y: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.4")
        .from(navImages, {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.4");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            if (!isMenuOpen) {
                document.body.classList.add("menu-open");
                overlay.classList.add("active");
                navTimeline.play();
            } else {
                document.body.classList.remove("menu-open");
                navTimeline.reverse().then(() => {
                    overlay.classList.remove("active");
                });
            }
            isMenuOpen = !isMenuOpen;
        });
    }

    // 3. Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 4. Rainbow Wave Title Effect Integration
    function applyRainbowWave(elementId, options = {}) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const text = element.innerText;
        const speed = options.speed || 0.004;
        const frequency = options.frequency || 0.25;
        const saturation = options.saturation || 100;
        const lightness = options.lightness || 50;

        // Split text into individual character spans
        element.innerHTML = text
            .split('')
            .map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

        const spans = element.querySelectorAll('span');

        function animate(timestamp) {
            spans.forEach((span, index) => {
                const hue = (timestamp * speed * 50 + index * frequency * 50) % 360;
                span.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // Initialize the effect (make sure your title has `id="rainbow-title"`)
    applyRainbowWave('rainbow-title', {
        speed: 0.004,
        frequency: 0.25
    });
});