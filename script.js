/* ===== TYPING ANIMATION (HERO SECTION) ===== */
var typed = new Typed("#typing", {
    strings: [
        "Full Stack Web Developer",
        "Java DSA Learner",
        "Building Real Projects"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});


/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});


/* ===== SCROLL REVEAL (STAGGER EFFECT) ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);
        }
    });
});

document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
});


/* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
window.addEventListener("scroll", () => {

    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav a");

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
});


/* ===== PARTICLES BACKGROUND ===== */
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#38bdf8" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    }
});


/* ===== SCROLL PROGRESS BAR ===== */
window.addEventListener("scroll", () => {

    let scroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrolled = (scroll / height) * 100;

    document.getElementById("progress-bar").style.width = scrolled + "%";
});


/* ===== CURSOR GLOW EFFECT ===== */
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* ===== GSAP INITIALIZATION ===== */
gsap.registerPlugin(ScrollTrigger);


/* ===== HERO ENTRY ANIMATION ===== */
gsap.from(".hero-text", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".hero-image", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
});


/* ===== SECTION FADE-IN ON SCROLL ===== */
gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});


/* ===== SKILLS STAGGER ANIMATION ===== */
gsap.from(".skill", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out"
});


/* ===== PROJECT CARDS ANIMATION ===== */
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%"
    },
    opacity: 0,
    y: 80,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
});


/* ===== PARALLAX HERO EFFECT ===== */
gsap.to(".hero-image", {
    y: -40,
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true
    }
});


/* ===== BUTTON POP EFFECT ===== */
gsap.from(".btn, .btn-outline", {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 0.5,
    stagger: 0.2
});

document.querySelectorAll(".btn, .btn-outline").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3
        });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3
        });
    });
});