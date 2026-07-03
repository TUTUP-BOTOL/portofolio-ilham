// Ambil semua menu navbar
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Klik menu
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.getElementById(link.dataset.target);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Update menu aktif
function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "bg-black",
            "text-yellow-400"
        );

        if (link.dataset.target === currentSection) {
            link.classList.add(
                "bg-black",
                "text-yellow-400"
            );
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

// Jalankan sekali saat halaman dibuka
updateActiveNav();