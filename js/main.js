document.addEventListener("DOMContentLoaded", () => {
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

    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
});