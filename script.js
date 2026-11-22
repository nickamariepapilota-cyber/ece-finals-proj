

const animals = [
  {
    name: "Visayan Hornbill",
    scientific: "Penelopides panini",
    status: "ENDANGERED",
    image: "images/visayan-hornbill.jpeg",
    description:
      "A remarkable forest bird native to the Western Visayas. Known for its distinctive bill and important role in spreading seeds, the Visayan Hornbill helps forests regenerate.",
    habitat:
      "Forested areas of Panay and Negros, particularly remaining native forests.",
    threats:
      "Habitat loss, forest fragmentation, and hunting.",
    importance:
      "As a fruit-eating bird, it disperses seeds and contributes to forest regeneration."
  },
  {
    name: "Visayan Spotted Deer",
    scientific: "Rusa alfredi",
    status: "ENDANGERED",
    image: "images/visayan-spotted-deer.jpeg",
    description:
      "One of the rarest deer species in the world. Its beautiful spotted coat makes it distinctive, while its survival depends on protecting the remaining forests of the Visayas.",
    habitat:
      "Remaining forest habitats on Panay and Negros.",
    threats:
      "Habitat destruction, forest fragmentation, and illegal hunting.",
    importance:
      "This native herbivore is part of the forest food web and helps maintain ecological relationships."
  },
  {
    name: "Visayan Warty Pig",
    scientific: "Sus cebifrons",
    status: "CRITICALLY ENDANGERED",
    image: "images/visayan-warty-pig.jpeg",
    description:
      "An extraordinary wild pig native to the Visayas. Recognized for its unusual appearance, this species is threatened by the loss of its forest home.",
    habitat:
      "Remaining forest habitats, particularly on Panay and Negros.",
    threats:
      "Habitat loss, hunting, and hybridization with domestic pigs.",
    importance:
      "Its natural foraging and soil disturbance can influence soil processes and plant regeneration."
  }
];

let currentIndex = 0;

const animalImage = document.getElementById("animalImage");
const animalName = document.getElementById("animalName");
const scientificName = document.getElementById("scientificName");
const animalStatus = document.getElementById("animalStatus");
const animalNumber = document.getElementById("animalNumber");
const animalDescription = document.getElementById("animalDescription");
const animalHabitat = document.getElementById("animalHabitat");
const animalThreats = document.getElementById("animalThreats");
const animalImportance = document.getElementById("animalImportance");
const animalDetails = document.getElementById("animalDetails");
const learnMoreBtn = document.getElementById("learnMoreBtn");
const expandIcon = document.getElementById("expandIcon");
const dotsContainer = document.getElementById("carouselDots");

function showAnimal(index) {
  currentIndex = (index + animals.length) % animals.length;
  const animal = animals[currentIndex];

  animalImage.src = animal.image;
  animalImage.alt = animal.name;
  animalName.textContent = animal.name;
  scientificName.textContent = animal.scientific;
  animalStatus.textContent = animal.status;
  animalNumber.textContent =
    String(currentIndex + 1).padStart(2, "0") +
    " / " +
    String(animals.length).padStart(2, "0");

  animalDescription.textContent = animal.description;
  animalHabitat.textContent = animal.habitat;
  animalThreats.textContent = animal.threats;
  animalImportance.textContent = animal.importance;

  // Close the information dropdown when changing animals.
  animalDetails.hidden = true;
  learnMoreBtn.setAttribute("aria-expanded", "false");
  expandIcon.textContent = "＋";

  updateDots();
}

function updateDots() {
  dotsContainer.innerHTML = "";

  animals.forEach((animal, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show " + animal.name);

    if (index === currentIndex) {
      dot.classList.add("active");
      dot.setAttribute("aria-current", "true");
    }

    dot.addEventListener("click", () => showAnimal(index));
    dotsContainer.appendChild(dot);
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  showAnimal(currentIndex + 1);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  showAnimal(currentIndex - 1);
});

learnMoreBtn.addEventListener("click", () => {
  const willOpen = animalDetails.hidden;
  animalDetails.hidden = !willOpen;
  learnMoreBtn.setAttribute("aria-expanded", String(willOpen));
  expandIcon.textContent = willOpen ? "−" : "＋";
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

showAnimal(0);
