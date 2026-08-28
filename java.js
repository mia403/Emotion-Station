/* =========================
         SCROLL REVEAL
      ========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================
   STAT COUNTERS
========================= */

const counters =
    document.querySelectorAll(".stat-number");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            parseFloat(counter.dataset.target);

        let current = 0;

        const increment =
            target / 60;


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                current = target;

                if (target % 1 !== 0) {

                    counter.textContent =
                        target.toFixed(1) + "%";

                } else {

                    counter.textContent =
                        target + (target < 100 ? "" : "");

                }

                return;
            }


            if (target % 1 !== 0) {

                counter.textContent =
                    current.toFixed(1) + "%";

            } else {

                counter.textContent =
                    Math.floor(current);

            }


            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


const problemSection =
    document.querySelector(".problem");


const counterObserver =
    new IntersectionObserver(
        (entries) => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },
        {
            threshold: 0.3
        }
    );


counterObserver.observe(problemSection);



/* =========================
   INTERACTIVE STATION MODAL
========================= */

const stationItems =
    document.querySelectorAll(".station-item");

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.getElementById("closeModal");


stationItems.forEach(item => {

    item.addEventListener("click", () => {

        modalTitle.textContent =
            item.dataset.title;

        modalDescription.textContent =
            item.dataset.description;

        modal.classList.add("active");

    });

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        modal.classList.remove("active");

    }

});

/* =========================
   TWO-SLIDE CAROUSEL
========================= */

const carouselSlides =
    document.querySelectorAll(".carousel-slide");

const carouselDots =
    document.querySelectorAll(".carousel-dot");

const previousButton =
    document.querySelector(".carousel-prev");

const nextButton =
    document.querySelector(".carousel-next");

const currentSlideNumber =
    document.getElementById("currentSlide");


let currentSlide = 0;


function showCarouselSlide(index) {

    carouselSlides.forEach(slide => {

        slide.classList.remove("active");

    });


    carouselDots.forEach(dot => {

        dot.classList.remove("active");

    });


    carouselSlides[index].classList.add("active");

    carouselDots[index].classList.add("active");


    currentSlideNumber.textContent =
        index + 1;

}


nextButton.addEventListener("click", () => {

    currentSlide++;

    if (currentSlide >= carouselSlides.length) {

        currentSlide = 0;

    }

    showCarouselSlide(currentSlide);

});


previousButton.addEventListener("click", () => {

    currentSlide--;

    if (currentSlide < 0) {

        currentSlide = carouselSlides.length - 1;

    }

    showCarouselSlide(currentSlide);

});


carouselDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showCarouselSlide(currentSlide);

    });

});


showCarouselSlide(0);