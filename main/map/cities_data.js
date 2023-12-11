const citiesBefore = [
  {
    name: "Lagash",
    info: cityDescriptions["Lagash"],
    x: "74%",
    y: "71.5%",
    labelPosition: "top",
  },
  {
    name: "Umma",
    info: cityDescriptions["Umma"],
    x: "70.5%",
    y: "70.5%",
    labelPosition: "top",
  },
  {
    name: "Uruk",
    info: cityDescriptions["Uruk"],
    x: "69%",
    y: "74.5%",
    labelPosition: "top",
  },
  {
    name: "Ur",
    info: cityDescriptions["Ur"],
    x: "71%",
    y: "78.5%",
    labelPosition: "top",
  },
  {
    name: "Eridu",
    info: cityDescriptions["Eridu"],
    x: "69.5%",
    y: "80%",
    labelPosition: "top",
  },
  {
    name: "Nippur",
    info: cityDescriptions["Nippur"],
    x: "67%",
    y: "68.5%",
    labelPosition: "top",
  },
  {
    name: "Kish",
    info: cityDescriptions["Kish"],
    x: "61.5%",
    y: "62%",
    labelPosition: "top",
  },
  {
    name: "Sippar",
    info: cityDescriptions["Sippar"],
    x: "59.5%",
    y: "59%",
    labelPosition: "top",
  },
];

const citiesAkkad = [
  {
    name: "Akkad",
    status: "capital",
    info: cityDescriptions["Akkad"],
    x: "59.5%",
    y: "59%",
    labelPosition: "top",
  },
  {
    name: "Lagash",
    info: cityDescriptions["Lagash"],
    x: "74%",
    y: "71.5%",
    labelPosition: "top",
  },
  {
    name: "Umma",
    info: cityDescriptions["Umma"],
    x: "70.5%",
    y: "70.5%",
    labelPosition: "top",
  },
  {
    name: "Uruk",
    info: cityDescriptions["Uruk"],
    x: "69%",
    y: "74.5%",
    labelPosition: "top",
  },
  {
    name: "Ur",
    info: cityDescriptions["Ur"],
    x: "71%",
    y: "78.5%",
    labelPosition: "top",
  },
  {
    name: "Eridu",
    info: cityDescriptions["Eridu"],
    x: "69.5%",
    y: "80%",
    labelPosition: "top",
  },
  {
    name: "Nippur",
    info: cityDescriptions["Nippur"],
    x: "67%",
    y: "68.5%",
    labelPosition: "top",
  },
  {
    name: "Kish",
    info: cityDescriptions["Kish"],
    x: "61.5%",
    y: "62%",
    labelPosition: "top",
  },
  {
    name: "Assur",
    info: cityDescriptions["Assur"],
    x: "52.3%",
    y: "36%",
    labelPosition: "top",
  },
  {
    name: "Tuttul",
    info: cityDescriptions["Tuttul"],
    x: "28.5%",
    y: "33%",
    labelPosition: "top",
  },
  {
    name: "Mari",
    info: cityDescriptions["Mari"],
    x: "39%",
    y: "45.4%",
    labelPosition: "top",
  },
  {
    name: "Suse",
    info: cityDescriptions["Suse"],
    x: "85%",
    y: "70%",
    labelPosition: "top",
  },
];

function showBefore() {
  currentState = states.BEFORE;
  const mapContainer = document.querySelector("#mapContainer");
  mapContainer.classList.remove("akkad");
  mapContainer.classList.add("before");
  renderCities();
}

function showAkkad() {
  currentState = states.AKKAD;
  const mapContainer = document.querySelector("#mapContainer");
  mapContainer.classList.remove("before");
  mapContainer.classList.add("akkad");
  renderCities();
}

function renderCities() {
  const container = document.querySelector("#citiesContainer");
  container.innerHTML = "";

  const cities = currentState === states.BEFORE ? citiesBefore : citiesAkkad;
  for (const city of cities) {
    const ellipse = document.createElement("div");
    ellipse.classList.add("city-ellipse");

    if (currentState === states.AKKAD) {
      if (city.name !== "Akkad") {
        ellipse.classList.add("reduced");
      } else {
        ellipse.classList.add("akkad");
      }

      if (city.status === "capital") {
        ellipse.classList.add("capital");
      }
    }

    ellipse.style.left = city.x;
    ellipse.style.top = city.y;

    const label = document.createElement("div");
    label.classList.add("city-label");
    label.classList.add(city.labelPosition);
    label.textContent = city.name;

    ellipse.addEventListener("click", function () {
      showInfoPopup(city.info);
    });

    ellipse.appendChild(label);
    container.appendChild(ellipse);
  }
}
