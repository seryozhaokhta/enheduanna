class ShaderProgram {
  constructor(vertexSource, fragmentSource) {
    this.program = this.createShaderProgram(vertexSource, fragmentSource);
    this.initializeAttributesAndUniforms();
  }

  createShaderProgram(vertexSource, fragmentSource) {
    const vs = drawingContext.createShader(drawingContext.VERTEX_SHADER);
    drawingContext.shaderSource(vs, vertexSource);
    drawingContext.compileShader(vs);

    const fs = drawingContext.createShader(drawingContext.FRAGMENT_SHADER);
    drawingContext.shaderSource(fs, fragmentSource);
    drawingContext.compileShader(fs);

    const program = drawingContext.createProgram();
    drawingContext.attachShader(program, vs);
    drawingContext.attachShader(program, fs);
    drawingContext.linkProgram(program);

    if (!drawingContext.getShaderParameter(vs, drawingContext.COMPILE_STATUS))
      console.log(drawingContext.getShaderInfoLog(vs));

    if (!drawingContext.getShaderParameter(fs, drawingContext.COMPILE_STATUS))
      console.log(drawingContext.getShaderInfoLog(fs));

    if (
      !drawingContext.getProgramParameter(program, drawingContext.LINK_STATUS)
    )
      console.log(drawingContext.getProgramInfoLog(program));

    return program;
  }

  initializeAttributesAndUniforms() {
    this.program.uModelViewMatrix = drawingContext.getUniformLocation(
      this.program,
      "uModelViewMatrix"
    );
    this.program.uProjectionMatrix = drawingContext.getUniformLocation(
      this.program,
      "uProjectionMatrix"
    );
    this.program.uTime = drawingContext.getUniformLocation(
      this.program,
      "uTime"
    );
    this.program.aPosition = drawingContext.getAttribLocation(
      this.program,
      "aPosition"
    );
    drawingContext.enableVertexAttribArray(this.program.aPosition);
    this.program.aColor = drawingContext.getAttribLocation(
      this.program,
      "aColor"
    );
    drawingContext.enableVertexAttribArray(this.program.aColor);
  }

  use() {
    drawingContext.useProgram(this.program);
  }
}

class ParticleImage {
  constructor(img) {
    this.img = img;
    this.vertices = [];
    this.colors = [];
    this.processImage();
  }

  processImage() {
    const pointScale = 1;
    const xAdd = -this.img.width / 2;
    const yAdd = -this.img.height / 2;
    const zAdd = 0;
    for (let y = 0; y < this.img.height; y++) {
      for (let x = 0; x < this.img.width; x++) {
        const c = this.img.get(x, y);
        const z = random(-100, 1000);
        this.vertices.push(
          x * pointScale + xAdd,
          y * pointScale + yAdd,
          z * pointScale + zAdd
        );
        this.colors.push(c[0] / 255, c[1] / 255, c[2] / 255);
      }
    }
  }
}

class ParticleScene {
  constructor(img, vertexSource, fragmentSource) {
    this.shaderProgram = new ShaderProgram(vertexSource, fragmentSource);
    this.particleImage = new ParticleImage(img);
    this.createBuffers();
  }

  createBuffers() {
    this.shaderProgram.program.positionBuffer = drawingContext.createBuffer();
    drawingContext.bindBuffer(
      drawingContext.ARRAY_BUFFER,
      this.shaderProgram.program.positionBuffer
    );
    drawingContext.bufferData(
      drawingContext.ARRAY_BUFFER,
      new Float32Array(this.particleImage.vertices),
      drawingContext.STATIC_DRAW
    );

    this.shaderProgram.program.colorBuffer = drawingContext.createBuffer();
    drawingContext.bindBuffer(
      drawingContext.ARRAY_BUFFER,
      this.shaderProgram.program.colorBuffer
    );
    drawingContext.bufferData(
      drawingContext.ARRAY_BUFFER,
      new Float32Array(this.particleImage.colors),
      drawingContext.STATIC_DRAW
    );
  }

  render() {
    this.shaderProgram.use();

    const program = this.shaderProgram.program;
    drawingContext.bindBuffer(
      drawingContext.ARRAY_BUFFER,
      program.positionBuffer
    );
    drawingContext.vertexAttribPointer(
      program.aPosition,
      3,
      drawingContext.FLOAT,
      false,
      0,
      0
    );
    drawingContext.bindBuffer(drawingContext.ARRAY_BUFFER, program.colorBuffer);
    drawingContext.vertexAttribPointer(
      program.aColor,
      3,
      drawingContext.FLOAT,
      false,
      0,
      0
    );
    drawingContext.uniformMatrix4fv(
      program.uModelViewMatrix,
      false,
      renderer.uMVMatrix.mat4
    );
    drawingContext.uniformMatrix4fv(
      program.uProjectionMatrix,
      false,
      renderer.uPMatrix.mat4
    );
    drawingContext.uniform1f(program.uTime, frameCount / 50);
    drawingContext.drawArrays(
      drawingContext.POINTS,
      0,
      this.particleImage.vertices.length / 3
    );
  }
}

var img;
const pointSize = 3.1;

var program, renderer;
var scene;

const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    uniform float uTime;

    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying vec4 color;

    void main() {
        vec3 pos = aPosition;
        pos.z *= sin(uTime);
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 0.68;
        color = vec4(aColor, 1.0);
    }
`;

const fragmentSource = `
    #ifdef GL_ES
    precision highp float;
    #endif

    varying vec4 color;

    void main() {
        gl_FragColor = color;
    }
`;

function preload() {
  // Функция showLoader() вызывается здесь, чтобы показать прелоадер до начала загрузки
  showLoader();
  img = loadImage("assets/disk-of-en1.png"); // Замените на актуальный путь к вашему изображению
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  scene = new ParticleScene(img, vertexSource, fragmentSource);
  // После создания холста и инициализации сцены, прелоадер можно скрыть
  hideLoader();
}

function draw() {
  background(0);
  orbitControl();

  // Translate the scene along the Z axis to "move the camera back"
  translate(0, 0, -200);

  scene.render();
}
