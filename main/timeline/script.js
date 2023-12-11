let chaosButton;
let orderButton;
let isOrder = false;

let nodeImages = [];

const numberOfNodes = 7;
let nodes = [];
let nodeData = [
  {
    name: "Enheduanna",
    image: "enheduana.png",
    description: "Enheduanna was an ancient poet from Sumer.",
  },
  {
    name: "Homer",
    image: "Homer.png",
    description:
      "Homer was a legendary ancient Greek poet, author of the Iliad and the Odyssey.",
  },
  {
    name: "Hesiod",
    image: "Hesiod.png",
    description: "Hesiod was another foundational ancient Greek poet.",
  },
  {
    name: "Alcman",
    image: "Alcman.png",
    description: "Alcman was a lyric poet from Sparta.",
  },
  {
    name: "Anacreon",
    image: "Anacreon.png",
    description: "Archilochus was a Greek lyric poet from the island of Paros.",
  },
  {
    name: "Alcaeus",
    image: "Alcaeus.png",
    description: "Alcaeus was a lyric poet from the island of Lesbos.",
  },
  {
    name: "Sappho",
    image: "Sappho.png",
    description: "Sappho was an archaic Greek poet from the island of Lesbos.",
  },
];

let targetXCoordinatesVertical = ["2%", "2%", "2%", "2%", "2%", "2%", "2%"];
let targetYCoordinatesVertical = [
  "5%",
  "15%",
  "25%",
  "35%",
  "45%",
  "55%",
  "65%",
];
let targetXCoordinatesHorizontal = [
  "5%",
  "15%",
  "25%",
  "35%",
  "45%",
  "55%",
  "65%",
];
let targetYCoordinatesHorizontal = [
  "15%",
  "15%",
  "15%",
  "15%",
  "15%",
  "15%",
  "15%",
];
let targetXCoordinates = [];
let targetYCoordinates = [];

function preload() {
  for (let data of nodeData) {
    nodeImages.push(loadImage(data.image));
  }
}

function setup() {
  let container = document.getElementById("timeline-container");
  createCanvas(container.offsetWidth, container.offsetHeight);
  background(0);

  chaosButton = new ClickButton(20, height - 40, 60, 30, "Chaos");
  orderButton = new ClickButton(90, height - 40, 60, 30, "Order");

  if (isVerticalLayout()) {
    targetXCoordinates = targetXCoordinatesVertical.map(
      (x) => (parseFloat(x) / 100) * width
    );
    targetYCoordinates = targetYCoordinatesVertical.map(
      (y) => (parseFloat(y) / 100) * height
    );
  } else {
    targetXCoordinates = targetXCoordinatesHorizontal.map(
      (x) => (parseFloat(x) / 100) * width
    );
    targetYCoordinates = targetYCoordinatesHorizontal.map(
      (y) => (parseFloat(y) / 100) * height
    );
  }

  for (let i = 0; i < numberOfNodes; i++) {
    let x = random(width);
    let y = random(height);
    nodes[i] = new Node(
      x,
      y,
      targetXCoordinates[i],
      nodeData[i].name,
      i,
      nodeData[i].image,
      nodeData[i].description
    );
  }
}

function windowResized() {
  let container = document.getElementById("timeline-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function draw() {
  background(0);

  for (let i = 0; i < numberOfNodes; i++) {
    nodes[i].update();
    nodes[i].display();
  }

  for (let i = 0; i < numberOfNodes - 1; i++) {
    for (let c = i + 1; c < numberOfNodes; c++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[c].x, nodes[c].y);
      if (d < 90) {
        stroke(255, map(d, 0, 100, 100, 0));
        line(nodes[i].x, nodes[i].y, nodes[c].x, nodes[c].y);
      }
    }
  }

  chaosButton.y = isVerticalLayout() ? height - 80 : 20;
  chaosButton.display();
  orderButton.y = isVerticalLayout() ? height - 80 : 20;
  orderButton.display();
}

function mousePressed() {
  if (chaosButton.over()) {
    isOrder = false;
  } else if (orderButton.over()) {
    isOrder = true;
  }
}

function isVerticalLayout() {
  return window.innerWidth < 768;
}
