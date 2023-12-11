let imagesData = [
  { src: "img1.png", title: "Gold bowl", year: "2600 BC" },
  { src: "img2.png", title: "Copper figure of a bull", year: "2500 BC" },
  { src: "img3.png", title: "Stone vessel", year: "2600 BC" },
  { src: "img4.png", title: "Grey and white marble jar", year: "2600 BC" },
  { src: "img5.png", title: "Disk of Enheduanna", year: "2350—2300 BC" },
  { src: "img6.png", title: "Stone head of a woman", year: "2150–2000 BC" },
];
let images = [];
let imgGallery;
let camX = 0;
let camY = 0;
let camZ = 0;
let ease = 0.5;

function preload() {
  for (let data of imagesData) {
    let img = loadImage(data.src);
    images.push({ img: img, title: data.title, year: data.year });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  imgGallery = new ImageGallery(images);

  camX = 0;
  camY = 0;
  mouseX = width / 2;
  mouseY = height / 2;
}

function draw() {
  background(0);

  let targetX = map(mouseX, 0, width, -100, 100);
  let dx = targetX - camX;
  camX += dx * ease;

  let targetY = map(mouseY, 0, height, -100, 100);
  let dy = targetY - camY;
  camY += dy * ease;

  camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);

  imgGallery.update(mouseX, mouseY);
  imgGallery.display();
}

class ImageGallery {
  constructor(imagesInfo) {
    this.imgObjects = imagesInfo.map((data, i) => {
      let angle = random(TWO_PI);
      let v = p5.Vector.fromAngle(angle);
      v.mult(300);
      let zOffset = random(-50, 50);
      let description = `${data.title}, ${data.year}`;
      return new ImageObject(data.img, v.x, v.y, zOffset, description);
    });
  }

  update(mx, my) {
    let closestImg = null;
    let recordDistance = Infinity;
    this.imgObjects.forEach((imgObj) => {
      let d = imgObj.distanceTo(mx, my);
      if (d < recordDistance) {
        recordDistance = d;
        closestImg = imgObj;
      }
    });

    this.imgObjects.forEach((imgObj) => {
      imgObj.update(mx, my, imgObj === closestImg);
    });
  }

  display() {
    this.imgObjects.forEach((imgObj) => imgObj.display());
  }
}

class ImageObject {
  constructor(img, x, y, z, description) {
    this.img = img;
    this.pos = createVector(x, y, z);
    this.originalWidth = img.width;
    this.originalHeight = img.height;
    this.size = 100;
    this.description = description;
    this.descElement = createDiv(this.description);
    this.descElement.hide();
    this.descElement.addClass("image-description");
    this.descElement.position(0, 0); // Изначальное положение
    this.descElement.style("transform", "translate(-50%, -50%)");
  }

  distanceTo(mx, my) {
    return dist(mx - width / 2, my - height / 2, this.pos.x, this.pos.y);
  }

  update(mx, my, isActive) {
    let d = this.distanceTo(mx, my);
    if (isActive) {
      this.size = map(d, 0, width / 4, 150, 100, true);
      this.pos.lerp(
        createVector(mx - width / 2, my - height / 2, this.pos.z),
        0.1
      );
      this.descElement.show(); // Показать описание для активного объекта
    } else {
      this.size = 100;
      this.descElement.hide(); // Скрыть описание для всех неактивных объектов
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    imageMode(CENTER);
    let aspectRatio = this.originalWidth / this.originalHeight;
    let displayWidth, displayHeight;
    if (aspectRatio >= 1) {
      displayWidth = this.size * aspectRatio;
      displayHeight = this.size;
    } else {
      displayWidth = this.size;
      displayHeight = this.size / aspectRatio;
    }
    image(this.img, 0, 0, displayWidth, displayHeight);
    pop();

    // Обновление позиции и отображение описания
    if (this.size > 100) {
      // Устанавливаем позицию описания под изображением
      this.descElement.position(
        this.pos.x + width / 2 - displayWidth / 2,
        this.pos.y + height / 2 + displayHeight / 2 + 10 // немного ниже изображения
      );
      this.descElement.style("width", `${displayWidth}px`); // Устанавливаем ширину описания равной ширине изображения
      this.descElement.show();
    } else {
      this.descElement.hide();
    }
  }
}
