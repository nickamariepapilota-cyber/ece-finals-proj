const animals = [
  {
    name: "Visayan Hornbill",
    scientific: "Penelopides panini",
    status: "ENDANGERED",
    image: "images/visayan-hornbill.jpeg",
    description: "The Visayan Hornbill is a rare forest bird native to Panay and Negros. Known for its distinctive bill and colorful appearance, this bird plays an essential role in maintaining healthy forests.",
    habitat: "Tropical forests of Panay and Negros, particularly areas with mature trees.",
    threats: "Deforestation, habitat fragmentation, and hunting threaten its survival.",
    importance: "The Visayan Hornbill disperses seeds from the fruits it eats, helping forests regenerate and supporting biodiversity."
  },
  {
    name: "Visayan Spotted Deer",
    scientific: "Rusa alfredi",
    status: "ENDANGERED",
    image: "images/visayan-deer.jpeg",
    description: "The Visayan Spotted Deer is one of the rarest deer species in the world. Recognized by its beautiful spotted coat, it is native to the islands of Panay and Negros.",
    habitat: "Remaining tropical forest habitats of Panay and Negros.",
    threats: "Illegal hunting, deforestation, and habitat fragmentation have severely reduced its population.",
    importance: "As a native herbivore, the Visayan Spotted Deer contributes to ecological balance and vegetation dynamics in its forest habitat."
  },
  {
    name: "Visayan Warty Pig",
    scientific: "Sus cebifrons",
    status: "CRITICALLY ENDANGERED",
    image: "images/warty-pig.jpeg",
    description: "The Visayan Warty Pig is a rare wild pig found in the Philippines. It is recognized for its distinctive facial features and the long mane developed by adult males.",
    habitat: "Remaining forests and forest-edge habitats on Panay and Negros.",
    threats: "Habitat destruction, hunting, and hybridization with domestic pigs threaten its survival.",
    importance: "Its natural foraging behavior helps disturb and mix forest soil, influencing nutrient cycling and plant regeneration."
  },
  {
    name: "Dulungan (Rufous-headed Hornbill)",
    scientific: "Rhabdotorrhinus waldeni",
    status: "CRITICALLY ENDANGERED",
    image: "images/dulungan.jpeg",
    description: "The Dulungan, also known as the Rufous-headed Hornbill, is one of the most remarkable birds in the Visayas. Its striking reddish head and large curved bill make it easily recognizable. It is a symbol of wildlife conservation in Panay.",
    habitat: "Remaining tropical forests of Panay and Negros, especially forests with large nesting trees.",
    threats: "Deforestation, habitat fragmentation, and hunting have contributed to its population decline.",
    importance: "The Dulungan is an important seed disperser. By spreading seeds throughout the forest, it supports forest regeneration and biodiversity."
  },
  {
    name: "Negros Bleeding-heart Dove",
    scientific: "Gallicolumba keayi",
    status: "CRITICALLY ENDANGERED",
    image: "images/bleeding-heart.jpeg",
    description: "The Negros Bleeding-heart Dove is a rare ground-dwelling bird native to the Visayas. It is recognized by the vivid red patch on its chest, which resembles a bleeding heart.",
    habitat: "Remaining lowland tropical forests of Negros and Panay, particularly areas with dense forest vegetation.",
    threats: "Habitat loss, forest fragmentation, and hunting threaten this rare bird.",
    importance: "The Negros Bleeding-heart Dove contributes to the forest ecosystem through its feeding behavior and potential role in seed dispersal."
  },
  {
    name: "Panay Monitor Lizard / Mabitang",
    scientific: "Varanus mabitang",
    status: "ENDANGERED",
    image: "images/monitor-lizard.jpeg",
    description: "The Panay Monitor Lizard, or Mabitang, is a rare, largely fruit-eating, tree-dwelling monitor lizard endemic to Panay's forests. Unlike many monitor lizards that are strictly carnivorous, Varanus mabitang feeds heavily on forest fruits.",
    habitat: "Tropical forests of Panay Island, particularly arboreal and forest habitats where native fruiting trees occur.",
    threats: "Habitat loss, forest fragmentation, and hunting threaten its limited population.",
    importance: "As a fruit-eating arboreal species, it helps disperse seeds from forest fruits and supports ecological balance in Panay's forests."
  },
  {
    name: "Philippine Tarsier",
    scientific: "Carlito syrichta",
    status: "NEAR THREATENED",
    image: "images/ph-tarsiers.jpeg",
    description: "The Philippine Tarsier is a small primate found in parts of the Visayas such as Bohol, Samar, and Leyte, as well as Mindanao. While famous in eco-tourism, it is highly sensitive to environmental changes.",
    habitat: "Dense secondary growth, bamboo thickets, bushes, and forest edges in parts of the Visayas (including Bohol, Samar, and Leyte) and Mindanao.",
    threats: "Habitat fragmentation, human disturbance, and improper captivity threaten wild populations.",
    importance: "As an insectivorous primate, it helps keep insect populations in check within local forest and shrubland ecosystems."
  }
];

// CAROUSEL

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
    " / " + String(animals.length).padStart(2, "0");

  animalDescription.textContent = animal.description;
  animalHabitat.textContent = animal.habitat;
  animalThreats.textContent = animal.threats;
  animalImportance.textContent = animal.importance;

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

// MOBILE NAVIGATION

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

// C POPULATION SIMULATOR

const speciesSelect = document.getElementById("speciesSelect");
const forestInput = document.getElementById("forestInput");
const threatInput = document.getElementById("threatInput");
const forestDisplay = document.getElementById("forestDisplay");
const threatDisplay = document.getElementById("threatDisplay");
const runSimulation = document.getElementById("runSimulation");
const simulationOutput = document.getElementById("simulationOutput");

let populationModule = null;
let outcomePieChart = null;
let habitatPieChart = null;

function destroySimulatorCharts() {
  if (outcomePieChart) {
    outcomePieChart.destroy();
    outcomePieChart = null;
  }
  if (habitatPieChart) {
    habitatPieChart.destroy();
    habitatPieChart = null;
  }
}

function renderSimulatorCharts(initialPop, finalPop, forest, threat) {
  destroySimulatorCharts();

  if (typeof Chart !== "function") return;

  const outcomeCanvas = document.getElementById("outcomePieCanvas");
  const habitatCanvas = document.getElementById("habitatPieCanvas");
  if (!outcomeCanvas || !habitatCanvas) return;

  const roundedFinal = Math.max(0, Math.round(finalPop));
  const delta = roundedFinal - initialPop;

  let outcomeLabels;
  let outcomeValues;
  let outcomeColors;

  if (delta < 0) {
    outcomeLabels = ["Projected Survivors (Yr 10)", "Projected Loss"];
    outcomeValues = [roundedFinal, Math.abs(delta)];
    outcomeColors = ["#2e6f40", "#c85a32"];
  } else {
    outcomeLabels = ["Initial Baseline", "Net 10-Yr Gain"];
    outcomeValues = [initialPop, delta];
    outcomeColors = ["#2e6f40", "#5ca469"];
  }

  outcomePieChart = new Chart(outcomeCanvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: outcomeLabels,
      datasets: [{
        data: outcomeValues,
        backgroundColor: outcomeColors,
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, padding: 12, font: { size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1;
              const val = ctx.parsed;
              const pct = ((val / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${val.toLocaleString()} (${pct}%)`;
            }
          }
        }
      }
    }
  });

  const unprotectedForest = Math.max(0, 100 - forest);

  habitatPieChart = new Chart(habitatCanvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: [
        `Protected Forest (${forest}%)`,
        `Unprotected Area (${unprotectedForest}%)`
      ],
      datasets: [{
        data: [forest, unprotectedForest],
        backgroundColor: ["#245c36", "#d9822b"],
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, padding: 12, font: { size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label} · Threat Level: ${threat}%`
          }
        }
      }
    }
  });
}

// LOAD COMPILED C PROGRAM

async function initializeSimulator() {
  if (typeof createPopulationSimulator !== "function") {
    simulationOutput.innerHTML =
      "<h3>Simulator unavailable</h3>" +
      "<p>WebAssembly could not be loaded. Please check the generated files and try again.</p>";
    runSimulation.disabled = true;
    return;
  }

  try {
    populationModule = await createPopulationSimulator();

    const speciesCount = populationModule._get_species_count();

    if (speciesCount !== animals.length) {
      throw new Error("Species database mismatch.");
    }

    runSimulation.disabled = false;

    simulationOutput.innerHTML =
      "<h3>Ready to explore!</h3>" +
      "<p>Select a species and adjust the environmental conditions to see its projected population.</p>";

  } catch (error) {
    console.error("Simulator initialization failed:", error);

    simulationOutput.innerHTML =
      "<h3>Unable to initialize simulator</h3>" +
      "<p>Please check the WebAssembly files and try again.</p>";

    runSimulation.disabled = true;
  }
}

// UPDATE SLIDER LABELS

forestInput.addEventListener("input", () => {
  forestDisplay.textContent = forestInput.value + "%";
});

threatInput.addEventListener("input", () => {
  threatDisplay.textContent = threatInput.value + "%";
});

// RUN C SIMULATION

function executeSimulation() {
  if (!populationModule) {
    simulationOutput.innerHTML =
      "<p>The simulator is still loading. Please wait.</p>";
    return;
  }

  const speciesIndex = Number(speciesSelect.value);
  const forest = Number(forestInput.value);
  const threat = Number(threatInput.value);

  const initialPopulation =
    populationModule._get_initial_population(speciesIndex);

  if (initialPopulation < 0) {
    simulationOutput.innerHTML =
      "<p>Invalid species selection.</p>";
    return;
  }

  let rows = "";

  for (let year = 0; year <= 10; year++) {
    const population =
      populationModule._get_population_at_year(
        speciesIndex,
        forest,
        threat,
        year
      );

    rows += `
      <tr>
        <td>Year ${year}</td>
        <td>${Math.round(population).toLocaleString()}</td>
      </tr>
    `;
  }

  const finalPopulation =
    populationModule._get_population_at_year(
      speciesIndex,
      forest,
      threat,
      10
    );

  const roundedFinal = Math.max(0, Math.round(finalPopulation));
  const change = roundedFinal - initialPopulation;

  const changeText =
    change > 0
      ? "Increase of " + change.toLocaleString()
      : change < 0
        ? "Decrease of " + Math.abs(change).toLocaleString()
        : "No change";

  const changeClass =
    change > 0 ? "trend-positive" : change < 0 ? "trend-negative" : "trend-neutral";

  simulationOutput.innerHTML = `
    <div class="sim-header">
      <div>
        <h3>${animals[speciesIndex].name}</h3>
        <p class="sim-sci"><em>${animals[speciesIndex].scientific}</em> · ${animals[speciesIndex].status}</p>
      </div>
      <div class="sim-projected-badge">
        <span>10-Yr Projection</span>
        <strong>${roundedFinal.toLocaleString()}</strong>
      </div>
    </div>

    <div class="sim-summary-grid">
      <div class="sim-stat-card">
        <small>Initial Population</small>
        <strong>${initialPopulation.toLocaleString()}</strong>
      </div>
      <div class="sim-stat-card ${changeClass}">
        <small>10-Year Net Change</small>
        <strong>${changeText} individuals</strong>
      </div>
      <div class="sim-stat-card">
        <small>Forest / Threat</small>
        <strong>${forest}% forest · ${threat}% threat</strong>
      </div>
    </div>

    <div class="sim-charts-grid">
      <div class="sim-chart-card">
        <h4>10-Year Population Breakdown</h4>
        <div class="pie-box">
          <canvas id="outcomePieCanvas"></canvas>
        </div>
      </div>

      <div class="sim-chart-card">
        <h4>Forest Protection Split</h4>
        <div class="pie-box">
          <canvas id="habitatPieCanvas"></canvas>
        </div>
      </div>
    </div>

    <h4>10-Year Population Projection</h4>

    <div class="projection-table-wrapper">
      <table class="projection-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <p class="simulation-note">
      Educational mathematical projection based on the
      selected environmental conditions. This is not an
      actual wildlife population census or scientific forecast.
    </p>
  `;

  renderSimulatorCharts(initialPopulation, finalPopulation, forest, threat);
}

runSimulation.disabled = true;
runSimulation.addEventListener("click", executeSimulation);

// INITIALIZE WEBSITE

showAnimal(0);
initializeSimulator();
