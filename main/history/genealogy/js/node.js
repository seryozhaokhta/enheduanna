class Node {
  constructor(xp, yp, targetX, targetY, nodeName, relationship = "") {
    this.radius = 12;
    this.hoverRadius = 15;
    this.x = xp;
    this.y = yp;
    this.xv = random(-1, 1);
    this.yv = random(-1, 1);
    this.targetX = targetX;
    this.targetY = targetY;
    this.name = nodeName;
    this.relationship = relationship;
    this.opacity = 255;
  }

  isHovered(mx, my) {
    let d = dist(this.x, this.y, mx, my);
    return d <= this.radius;
  }

  handleMouseOverEnitum(mx, my) {
    let enitumData = nodeData[0];
    if (nodes[0].isHovered(mx, my)) {
      if (
        this.name === enitumData.name ||
        enitumData.children.includes(nodes.indexOf(this))
      ) {
        this.opacity = 255;
      } else {
        this.opacity = 255 * 0.5;
      }
    } else {
      this.opacity = 255;
    }
  }

  update(isOrder, mx, my) {
    this.handleMouseOverEnitum(mx, my);

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
      this.x += this.xv;
      this.y += this.yv;
      if (this.x < 0 || this.x > width) this.xv = -this.xv;
      if (this.y < 0 || this.y > height) this.yv = -this.yv;
    }
  }

  display(mx, my) {
    fill(255, this.opacity);
    if (this.isHovered(mx, my)) {
      ellipse(this.x, this.y, this.hoverRadius, this.hoverRadius);
    } else {
      ellipse(this.x, this.y, this.radius, this.radius);
    }
    // Примените прозрачность к имени
    fill(255, this.opacity); // Здесь мы добавляем прозрачность
    textSize(12);
    textAlign(CENTER, CENTER);
    text(this.name, this.x, this.y + 20);
  }
}
