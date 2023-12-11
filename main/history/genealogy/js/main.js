let chaosButton;
let orderButton;
let isOrder = false;
let hoveredNodeIndex = null;
let lineOpacity = 0;

function setNodeTargetPosition(nodeIndex, targetX, targetY) {
  if (nodes[nodeIndex]) {
    nodes[nodeIndex].targetX = targetX;
    nodes[nodeIndex].targetY = targetY;
  }
}

function setup() {
  let container = document.getElementById("genealogy-container");
  let canvasWidth = container.offsetWidth;
  let canvasHeight = container.offsetHeight;
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("genealogy-container");
  background(0);

  let buttonWidth = 60;
  let buttonHeight = 30;
  chaosButton = new ClickButton(
    20,
    height - buttonHeight - 10,
    buttonWidth,
    buttonHeight,
    "Chaos"
  );
  orderButton = new ClickButton(
    20 + buttonWidth + 10,
    height - buttonHeight - 10,
    buttonWidth,
    buttonHeight,
    "Order"
  );

  let levels = [[0], [1, 2], [3, 4, 5, 6, 7], [8]];
  let levelSpacing = height / (levels.length + 1);
  let thirdLevelSpacingMultiplier = 1; // Увеличиваем пространство для третьего уровня

  for (let i = 0; i < numberOfNodes; i++) {
    let x = random(width);
    let y = random(height);

    let levelIndex = levels.findIndex((level) => level.includes(i));
    let nodeIndexInLevel = levels[levelIndex].indexOf(i);
    let levelNodeCount = levels[levelIndex].length;

    let levelY;
    if (levelIndex === 2) {
      // Если это третий уровень (индексация с 0)
      levelY = (levelIndex + 1) * levelSpacing * thirdLevelSpacingMultiplier;
    } else {
      levelY = (levelIndex + 1) * levelSpacing;
    }

    let nodeSpacing = width / (levelNodeCount + 1);
    let targetX = (nodeIndexInLevel + 1) * nodeSpacing;
    let targetY = levelY;

    nodes[i] = new Node(
      x,
      y,
      targetX,
      targetY,
      nodeData[i].name,
      nodeData[i].relationship
    );
  }

  let offset = 100;
  setNodeTargetPosition(2, nodes[1].targetX + offset, nodes[2].targetY);
}

function draw() {
  background(0);
  hoveredNodeIndex = null;

  for (let i = 0; i < numberOfNodes; i++) {
    nodes[i].update(isOrder, mouseX, mouseY);
    nodes[i].display(mouseX, mouseY);

    if (nodes[i].isHovered(mouseX, mouseY)) {
      hoveredNodeIndex = i;
    }
  }

  for (let i = 0; i < numberOfNodes; i++) {
    for (let j = i + 1; j < numberOfNodes; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < 120) {
        let opacity = map(d, 0, 120, 255, 0);
        stroke(255, opacity);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }

  if (hoveredNodeIndex === 0) {
    let enitumData = nodeData[0];
    let parent = nodes[0];

    for (let childIndex of enitumData.children) {
      let child = nodes[childIndex];
      if (lineOpacity < 255) lineOpacity += 5;

      strokeWeight(0.68);
      stroke(255, lineOpacity);
      line(parent.x, parent.y, child.x, child.y);
    }

    noStroke();
    fill(200, lineOpacity);
    textSize(12);
    textAlign(LEFT);

    for (let i = 0; i < enitumData.relationship.length; i++) {
      text(enitumData.relationship[i], parent.x - 20, parent.y + 42 + i * 12);
    }
  } else {
    if (lineOpacity > 0) lineOpacity -= 5;
  }

  chaosButton.display();
  orderButton.display();
}

function mousePressed() {
  if (chaosButton.over()) {
    isOrder = false;
  } else if (orderButton.over()) {
    isOrder = true;
  }
}
