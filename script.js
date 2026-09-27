// ─────────────────────────────
// PAGE NAVIGATION
// ─────────────────────────────
function showPage(name) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
    });

    const page = document.getElementById("page-" + name);

    if (page) {
        page.classList.add("active");
        page.classList.add("page-enter");

        setTimeout(() => {
            page.classList.remove("page-enter");
        }, 600);

        window.scrollTo(0, 0);

        // Fermer le menu mobile après un clic
        const menu = document.querySelector(".nav-links");
        if (menu) {
            menu.classList.remove("show");
        }
    }

    const link = document.querySelector(`[data-page="${name}"]`);

    if (link) {
        link.classList.add("active");
    }

    initReveal();
}


// ─────────────────────────────
// NAVBAR SCROLL
// ─────────────────────────────
window.addEventListener("scroll", () => {

    const nav = document.getElementById("main-nav");

    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
    }

});


// ─────────────────────────────
// STARS
// ─────────────────────────────
function createStars() {

    const container = document.getElementById("stars");

    if (!container) return;

    for (let i = 0; i < 80; i++) {

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random() * 2.5 + 0.5;

        star.style.cssText = `
            width:${size}px;
            height:${size}px;
            top:${Math.random()*85}%;
            left:${Math.random()*100}%;
            --dur:${Math.random()*4+2}s;
            --brightness:${Math.random()*0.7+0.2};
            animation-delay:${Math.random()*5}s;
        `;

        container.appendChild(star);

    }

}


// ─────────────────────────────
// COUNTER
// ─────────────────────────────
function animateCounters() {

    document.querySelectorAll(".count-up").forEach(el => {

        if (el.dataset.animated) return;

        el.dataset.animated = "1";

        const target = parseInt(el.dataset.target);

        let current = 0;

        const step = target / 60;

        const timer = setInterval(() => {

            current = Math.min(current + step, target);

            el.textContent = Math.floor(current).toLocaleString("fr-FR");

            if (current >= target) {
                clearInterval(timer);
            }

        },25);

    });

}


// ─────────────────────────────
// REVEAL
// ─────────────────────────────
function initReveal() {

    setTimeout(() => {

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    if(entry.target.closest("#page-home")){
                        animateCounters();
                    }

                }

            });

        },{threshold:0.1});

        document.querySelectorAll(".reveal").forEach(el=>{

            el.classList.remove("visible");

            observer.observe(el);

        });

    },100);

}


// ─────────────────────────────
// FILTER DESTINATIONS
// ─────────────────────────────
function filterDest(btn,cat){

    document.querySelectorAll(".filter-btn").forEach(button=>{
        button.classList.remove("active");
    });

    btn.classList.add("active");

    document.querySelectorAll(".dest-list-card").forEach(card=>{

        const show = cat==="all" || card.dataset.cat===cat;

        card.style.transition="opacity .35s, transform .35s";

        if(show){

            card.style.display="block";
            card.style.opacity="1";
            card.style.transform="scale(1)";

        }else{

            card.style.opacity="0";
            card.style.transform="scale(.96)";

            setTimeout(()=>{
                card.style.display="none";
            },350);

        }

    });

}


// ─────────────────────────────
// CONTACT FORM
// ─────────────────────────────
function submitForm(btn){

    btn.textContent="✓ Message envoyé !";

    btn.style.background="var(--teal)";
    btn.style.color="white";

    setTimeout(()=>{

        btn.textContent="Envoyer ma demande";
        btn.style.background="";
        btn.style.color="";

    },3000);

}


// ─────────────────────────────
// HAMBURGER MENU
// ─────────────────────────────
function toggleMenu(){

    const menu=document.querySelector(".nav-links");

    if(menu){
        menu.classList.toggle("show");
    }

}


// ─────────────────────────────
// INITIALISATION
// ─────────────────────────────
document.addEventListener("DOMContentLoaded",()=>{

    createStars();

    initReveal();

    setTimeout(animateCounters,1000);

});