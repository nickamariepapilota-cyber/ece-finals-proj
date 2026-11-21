
/* =========================================
   WILDGUARD - JAVASCRIPT
   Wildlife Conservation Website
========================================= */

// 1. SELECT HTML ELEMENTS

const landingPage = document.getElementById("landing-page");
const homePage = document.getElementById("home-page");

const getStartedBtn = document.getElementById("get-started-btn");

const filterButtons = document.querySelectorAll(".filter-btn");
const animalCards = document.querySelectorAll(".animal-card");

const learnMoreButtons = document.querySelectorAll(".learn-more");

const animalModal = document.getElementById("animal-modal");
const closeModalBtn = document.getElementById("close-modal");


// 2. ANIMAL INFORMATION DATABASE

const animals = {

    tiger: {
        name: "Tiger",
        scientific: "Panthera tigris",
        status: "Endangered",
        habitat: "Forests, grasslands, and wetlands across Asia",
        threats: "Poaching, habitat loss, and declining prey populations",
        description:
            "Tigers are the largest living wild cats. " +
            "They play an important role in maintaining " +
            "healthy ecosystems by regulating prey populations. " +
            "Conservation efforts focus on protecting habitats, " +
            "preventing poaching, and reducing human-wildlife conflict."
    },

    eagle: {
        name: "Philippine Eagle",
        scientific: "Pithecophaga jefferyi",
        status: "Critically Endangered",
        habitat: "Tropical forests of the Philippines",
        threats: "Deforestation, hunting, and habitat fragmentation",
        description:
            "The Philippine eagle is one of the world's " +
            "largest forest eagles and is endemic to the Philippines. " +
            "It is an important symbol of the country's biodiversity. " +
            "Conservation efforts include forest protection, " +
            "nest monitoring, and community education."
    },

    turtle: {
        name: "Hawksbill Sea Turtle",
        scientific: "Eretmochelys imbricata",
        status: "Critically Endangered",
        habitat: "Tropical coral reefs and coastal waters",
        threats: "Illegal wildlife trade, fishing bycatch, " +
                 "marine pollution, and habitat degradation",
        description:
            "Hawksbill sea turtles help maintain healthy " +
            "coral reef ecosystems by feeding on sponges. " +
            "Their populations are threatened by illegal " +
            "trade and accidental capture in fishing gear. " +
            "Protecting nesting beaches and coral reefs " +
            "is essential for their survival."
    }

};


// 3. GET STARTED BUTTON

getStartedBtn.addEventListener("click", function () {

    // Hide landing page
    landingPage.hidden = true;

    // Display homepage
    homePage.hidden = false;

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    // Update browser title
    document.title = "WILDGUARD | Home";

});


// 4. ANIMAL CATEGORY FILTER

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get selected category
        const selectedCategory = button.dataset.filter;

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Highlight selected button
        button.classList.add("active");

        // Filter animal cards
        animalCards.forEach(function (card) {

            const animalCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === animalCategory
            ) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }

        });

    });

});


// 5. DISPLAY ANIMAL INFORMATION

function showAnimalInformation(animalKey) {

    const animal = animals[animalKey];

    // Stop if animal does not exist
    if (!animal) {
        return;
    }

    // Insert animal information into popup
    document.getElementById("modal-title").textContent =
        animal.name;

    document.getElementById("modal-scientific").textContent =
        "Scientific Name: " + animal.scientific;

    document.getElementById("modal-status").textContent =
        "Conservation Status: " + animal.status;

    document.getElementById("modal-habitat").textContent =
        "Habitat: " + animal.habitat;

    document.getElementById("modal-threats").textContent =
        "Major Threats: " + animal.threats;

    document.getElementById("modal-description").textContent =
        animal.description;

    // Open popup
    animalModal.showModal();

}


// 6. LEARN MORE BUTTONS

learnMoreButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const animalKey = button.dataset.animal;

        showAnimalInformation(animalKey);

    });

});


// 7. CLOSE ANIMAL POPUP

closeModalBtn.addEventListener("click", function () {

    animalModal.close();

});


// 8. CLOSE POPUP WHEN CLICKING OUTSIDE

animalModal.addEventListener("click", function (event) {

    if (event.target === animalModal) {
        animalModal.close();
    }

});


// 9. NAVIGATION BETWEEN PAGES

const navigationLinks = document.querySelectorAll(
    'a[href="#home"], a[href="#species"], ' +
    'a[href="#about"], a[href="#action"]'
);

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();

        // Switch to homepage if currently on landing page
        if (homePage.hidden) {

            landingPage.hidden = true;
            homePage.hidden = false;

            document.title = "WILDGUARD | Home";

        }

        // Navigate to selected section
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// 10. LOGO NAVIGATION

const logoLinks = document.querySelectorAll(".logo");

logoLinks.forEach(function (logo) {

    logo.addEventListener("click", function (event) {

        event.preventDefault();

        // Return to landing page
        homePage.hidden = true;
        landingPage.hidden = false;

        document.title = "WILDGUARD | Protect Wildlife";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    });

});


// 11. INITIAL WEBSITE STATE

function initializeWebsite() {

    landingPage.hidden = false;
    homePage.hidden = true;

    document.title = "WILDGUARD | Protect Wildlife";

}

initializeWebsite();

