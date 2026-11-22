
const animals = [
  {
    name: "Visayan Hornbill",
    scientific: "Penelopides panini",
    status: "ENDANGERED",
    image: "images/visayan-hornbill.jpeg",
    description:
      "The Visayan Hornbill is a rare forest bird native to Panay and Negros. Known for its distinctive bill and colorful appearance, this bird plays an essential role in maintaining healthy forests.",
    habitat:
      "Tropical forests of Panay and Negros, particularly areas with mature trees.",
    threats:
      "Deforestation, habitat fragmentation, and hunting threaten its survival.",
    importance:
      "The Visayan Hornbill disperses seeds from the fruits it eats, helping forests regenerate and supporting biodiversity."
  },
  {
    name: "Visayan Spotted Deer",
    scientific: "Rusa alfredi",
    status: "ENDANGERED",
    image: "images/visayan-deer.jpeg",
    description:
      "The Visayan Spotted Deer is one of the rarest deer species in the world. Recognized by its beautiful spotted coat, it is native to the islands of Panay and Negros.",
    habitat:
      "Remaining tropical forest habitats of Panay and Negros.",
    threats:
      "Illegal hunting, deforestation, and habitat fragmentation have severely reduced its population.",
    importance:
      "As a native herbivore, the Visayan Spotted Deer contributes to ecological balance and vegetation dynamics in its forest habitat."
  },
  {
    name: "Visayan Warty Pig",
    scientific: "Sus cebifrons",
    status: "CRITICALLY ENDANGERED",
    image: "images/warty-pig.jpeg",
    description:
      "The Visayan Warty Pig is a rare wild pig found in the Philippines. It is recognized for its distinctive facial features and the long mane developed by adult males.",
    habitat:
      "Remaining forests and forest-edge habitats on Panay and Negros.",
    threats:
      "Habitat destruction, hunting, and hybridization with domestic pigs threaten its survival.",
    importance:
      "Its natural foraging behavior helps disturb and mix forest soil, influencing nutrient cycling and plant regeneration."
  },
  {
    name: "Dulungan (Rufous-headed Hornbill)",
    scientific: "Rhabdotorrhinus waldeni",
    status: "CRITICALLY ENDANGERED",
    image: "images/dulungan.jpeg",
    description:
      "The Dulungan, also known as the Rufous-headed Hornbill, is one of the most remarkable birds in the Visayas. Its striking reddish head and large curved bill make it easily recognizable. It is a symbol of wildlife conservation in Panay.",
    habitat:
      "Remaining tropical forests of Panay and Negros, especially forests with large nesting trees.",
    threats:
      "Deforestation, habitat fragmentation, and hunting have contributed to its population decline.",
    importance:
      "The Dulungan is an important seed disperser. By spreading seeds throughout the forest, it supports forest regeneration and biodiversity."
  },
  {
    name: "Negros Bleeding-heart Dove",
    scientific: "Gallicolumba keayi",
    status: "CRITICALLY ENDANGERED",
    image: "images/bleeding-heart.jpeg",
    description:
      "The Negros Bleeding-heart Dove is a rare ground-dwelling bird native to the Visayas. It is recognized by the vivid red patch on its chest, which resembles a bleeding heart.",
    habitat:
      "Remaining lowland tropical forests of Negros and Panay, particularly areas with dense forest vegetation.",
    threats:
      "Habitat loss, forest fragmentation, and hunting threaten this rare bird.",
    importance:
      "The Negros Bleeding-heart Dove contributes to the forest ecosystem through its feeding behavior and potential role in seed dispersal."
  },
  {
    name: "Panay Monitor Lizard / Mabitang",
    scientific: "Varanus mabitang",
    status: "ENDANGERED",
    image: "images/monitor-lizard.jpg",
    description:
      "The Panay Monitor Lizard, or Mabitang, is a rare, largely fruit-eating, tree-dwelling monitor lizard endemic to Panay's forests. Unlike many monitor lizards that are strictly carnivorous, Varanus mabitang feeds heavily on forest fruits.",
    habitat:
      "Tropical forests of Panay Island, particularly arboreal and forest habitats where native fruiting trees occur.",
    threats:
      "Habitat loss, forest fragmentation, and hunting threaten its limited population.",
    importance:
      "As a fruit-eating arboreal species, it helps disperse seeds from forest fruits and supports ecological balance in Panay's forests."
  }
];

// CAROUSEL VARIABLES

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

// DISPLAY THE SELECTED ANIMAL

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

  // Close expanded information when switching animals.
  animalDetails.hidden = true;
  learnMoreBtn.setAttribute("aria-expanded", "false");
  expandIcon.textContent = "＋";

  updateDots();
}

// CAROUSEL DOTS

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

    dot.addEventListener("click", () => {
      showAnimal(index);
    });

    dotsContainer.appendChild(dot);
  });
}

// NEXT ANIMAL

document.getElementById("nextBtn").addEventListener("click", () => {
  showAnimal(currentIndex + 1);
});

// PREVIOUS ANIMAL

document.getElementById("prevBtn").addEventListener("click", () => {
  showAnimal(currentIndex - 1);
});

// EXPAND ANIMAL INFORMATION

learnMoreBtn.addEventListener("click", () => {
  const willOpen = animalDetails.hidden;

  animalDetails.hidden = !willOpen;

  learnMoreBtn.setAttribute(
    "aria-expanded",
    String(willOpen)
  );

  expandIcon.textContent = willOpen ? "−" : "＋";
});

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// CLOSE MOBILE MENU AFTER CLICKING A LINK

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";
  });
});

// INITIALIZE WEBSITE

showAnimal(0);


