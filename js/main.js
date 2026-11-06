document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Switcher
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && toggleSwitch) {
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

    if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Scroll Showcase ScrollTrigger Reveal Effect
        const cards = document.querySelectorAll(".work-card");
        cards.forEach((card) => {
            const img = card.querySelector(".card-image-wrapper");
            const info = card.querySelector(".card-info");

            gsap.fromTo(card, 
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            if (img) {
                gsap.fromTo(img.querySelector("img"), 
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }
        });
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

    applyRainbowWave('rainbow-title', {
        speed: 0.004,
        frequency: 0.25
    });
});

        const journalItems = document.querySelectorAll(".journal-item");
        journalItems.forEach((item) => {
            gsap.fromTo(item, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        const studioSections = document.querySelectorAll(".studio-grid, .studio-stats, .capability-card");
        studioSections.forEach((section) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });