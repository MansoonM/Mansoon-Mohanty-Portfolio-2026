/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       DARK / LIGHT MODE
    ================================================= */

   /* =================================================
   DARK / LIGHT MODE
================================================= */

const themeButton =
    document.getElementById("themeToggle");

const html =
    document.documentElement;


/* Get saved theme */

let savedTheme =
    localStorage.getItem("portfolio-theme");


/* Default theme */

if (!savedTheme) {

    savedTheme = "dark";

}


/* Apply saved theme */

html.setAttribute(
    "data-theme",
    savedTheme
);


/* Update icon */

function updateThemeIcon() {

    if (savedTheme === "light") {

        themeButton.innerHTML =
            '<i class="bi bi-moon-stars-fill"></i>';

    }

    else {

        themeButton.innerHTML =
            '<i class="bi bi-sun-fill"></i>';

    }

}


/* Set initial icon */

updateThemeIcon();


/* Toggle theme */

themeButton.addEventListener(
    "click",
    function () {

        const currentTheme =
            html.getAttribute("data-theme");


        if (currentTheme === "dark") {

            savedTheme = "light";

        }

        else {

            savedTheme = "dark";

        }


        /* Apply */

        html.setAttribute(
            "data-theme",
            savedTheme
        );


        /* Save */

        localStorage.setItem(
            "portfolio-theme",
            savedTheme
        );


        /* Change icon */

        updateThemeIcon();

    }
);

    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const navbar =
        document.querySelector(
            ".portfolio-navbar"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 50) {

                navbar.classList.add(
                    "scrolled"
                );

            }

            else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }

    );



    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    window.addEventListener(
        "scroll",
        function () {

            let currentSection = "";


            sections.forEach(
                function (section) {

                    const sectionTop =
                        section.offsetTop - 150;


                    if (
                        window.scrollY >=
                        sectionTop
                    ) {

                        currentSection =
                            section.getAttribute(
                                "id"
                            );

                    }

                }
            );


            navLinks.forEach(
                function (link) {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        "#" + currentSection
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }

    );



    /* =================================================
       MOBILE MENU CLOSE
    ================================================= */

    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    const menu =
                        document.getElementById(
                            "mainNavbar"
                        );


                    if (
                        menu.classList.contains(
                            "show"
                        )
                    ) {

                        const collapse =
                            bootstrap.Collapse
                            .getInstance(menu);


                        if (collapse) {

                            collapse.hide();

                        }

                    }

                }

            );

        }

    );

/* =================================================
   SKILL FILTER
================================================= */

const skillFilters =
    document.querySelectorAll(".skill-filter");

const skillItems =
    document.querySelectorAll(".skill-item");


skillFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Remove active state */

        skillFilters.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Activate clicked filter */

        this.classList.add("active");


        const selectedCategory =
            this.getAttribute("data-filter");


        /* Filter cards */

        skillItems.forEach(function (item) {

            const itemCategory =
                item.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


});

// =====================================================
// ACHIEVEMENT COUNTERS
// =====================================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1200;

            const increment =
                target / (duration / 30);

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.ceil(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            };

            updateCounter();

            observer.unobserve(counter);

        });

    },

    {
        threshold: 0.5
    }
);


counters.forEach(counter => {

    counterObserver.observe(counter);

});

// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (!name || !email || !subject || !message) {

                formStatus.textContent =
                    "Please fill in all fields.";

                return;

            }


            const emailSubject =
                encodeURIComponent(subject);


            const emailBody =
                encodeURIComponent(
                    `Hello Mansoon,

Name: ${name}
Email: ${email}

Message:
${message}`
                );


            window.location.href =
                `mailto:mansoonmohanty111@gmail.com?subject=${emailSubject}&body=${emailBody}`;


            formStatus.textContent =
                "Opening your email application...";

        }
    );

}