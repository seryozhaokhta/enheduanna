class Node {
  constructor(xp, yp, targetX, nodeName, index, imageSrc, description) {
    this.radius = 3;
    this.x = xp;
    this.y = yp;
    this.xv = random(-1, 1);
    this.yv = random(-1, 1);
    this.targetX = targetX;
    this.targetY = targetYCoordinates[index];
    this.name = nodeName;
    this.image = nodeImages[index];
    this.description = description;
    this.isHovered = false;
  }

  update() {
    if (isOrder) {
      this.x = lerp(this.x, this.targetX, 0.05);
      this.y = lerp(this.y, this.targetY, 0.05);
      this.xv = 0;
      this.yv = 0;
    } else {
      if (this.xv === 0 && this.yv === 0) {
        this.xv = random(-1, 1);
        this.yv = random(-1, 1);
      }
      this.xv *= 0.999;
      this.yv *= 0.999;
      this.x += this.xv;
      this.y += this.yv;
      if (this.x < 0) this.xv += 0.1;
      else if (this.x > width) this.xv -= 0.1;
      if (this.y < 0) this.yv += 0.1;
      else if (this.y > height) this.yv -= 0.1;
      if (this.xv > 5) this.xv = 5;
      else if (this.xv < -5) this.xv = -5;
      if (this.yv > 5) this.yv = 5;
      else if (this.yv < -5) this.yv = -5;
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    noStroke();
    fill(255);
    textAlign(isVerticalLayout() ? LEFT : CENTER, CENTER);
    text(this.name, this.x, this.y + 10);

    if (dist(mouseX, mouseY, this.x, this.y) < this.radius * 2) {
      this.isHovered = true;
      image(this.image, this.x + 10, this.y - 60);
      fill(255);
      text(this.description, this.x + 10, this.y + 30);
    } else {
      this.isHovered = false;
    }
  }
}
