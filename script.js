/* ===================== WINDOW LOAD ======================== */

/* ===== LOADER ===== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

/* ===================== DOM READY ========================== */
document.addEventListener("DOMContentLoaded", () => {

/* ===================== THEME TOGGLE ======================= */
const toggle = document.getElementById("theme-toggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            toggle.classList.replace("fa-moon", "fa-sun");
        } else {
            toggle.classList.replace("fa-sun", "fa-moon");
        }
    });
}



/* ===================== TYPING EFFECT ====================== */
if (typeof Typed !== "undefined") {
    new Typed("#typing", {
        strings: [
            "MERN Stack Developer | Turning Ideas into Real Products",
            "Java DSA Learner",
            "Building Real Projects"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

/* ===================== SMOOTH SCROLL ====================== */
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ===================== SCROLL EVENTS ====================== */
window.addEventListener("scroll", () => {

    /* ===== ACTIVE NAV LINK ===== */
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav a");

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 200;
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
        // FIX CONTACT NOT ACTIVATING
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector('nav a[href="#contact"]').classList.add("active");
        }
    });


    /* ===== PROGRESS BAR ===== */
    let scroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scroll / height) * 100;

    const bar = document.getElementById("progress-bar");

    if (bar) {
        bar.style.width = scrolled + "%";
    }
});

/* ===================== CURSOR GLOW ======================== */
if (window.innerWidth > 768) {

    const cursor = document.createElement("div");
    cursor.classList.add("cursor-glow");
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

/* ===================== GSAP ANIMATIONS ==================== */
if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    /* ===== HERO ===== */
    gsap.fromTo(".hero-text",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2 }
    );

    gsap.fromTo(".hero-image",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.3 }
    );


    /* ===== SECTION REVEAL ===== */
    gsap.utils.toArray("section").forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%"
                }
            }
        );
    });


    /* ===== SKILLS ===== */
    gsap.fromTo(".skill",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".skills",
                start: "top 80%"
            }
        }
    );


    /* ===== PROJECTS ===== */
    gsap.fromTo(".project-card",
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".projects",
                start: "top 80%"
            }
        }
    );


    /* ===== PARALLAX ===== */
    gsap.to(".hero-image", {
        y: -40,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            scrub: true
        }
    });
}

/* ===================== BUTTON MAGNET ====================== */
document.querySelectorAll(".btn, .btn-outline").forEach(btn => {

    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        if (typeof gsap !== "undefined") {
            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.15,
                ease: "power2.out",
                duration: 0.3
            });
        }
    });

    btn.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3
            });
        }
    });

});


/* ===== EMAILJS INIT ===== */
(function(){
    emailjs.init("Ov81vAF9kX1O51Qyj");
})();

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = form.querySelector("button");
        btn.innerText = "Sending...";
        btn.disabled = true;

        emailjs.sendForm("service_tpgvm8d", "template_59mj2rm", this)
            .then(() => {
                btn.innerText = "Sent ✅";

                setTimeout(() => {
                    btn.innerText = "Send Message 🚀";
                    btn.disabled = false;
                }, 2000);

                showPopup("Message sent successfully 🚀", true);
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);

                btn.innerText = "Try Again";
                btn.disabled = false;

                showPopup("Failed to send message 😢", false);
            });
    });
}

});            

/* ===== POPUP FUNCTION (OUTSIDE) ===== */
function showPopup(message, isSuccess = true){

    const popup = document.getElementById("popup");
    const text = document.getElementById("popup-text");
    const checkmark = popup.querySelector(".checkmark");

    text.innerText = message;

    // Change color based on success/error
    if(isSuccess){
        checkmark.style.background = "#22c55e"; // green
        checkmark.innerHTML = "<span>✔</span>";
    } else {
        checkmark.style.background = "#ef4444"; // red
        checkmark.innerHTML = "<span>✖</span>";
    }

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2500);
}