const canvas = document.getElementById("game-canvas");
const charecter = canvas.getContext("2d");
let currentAngle = 0;
let rotationSpeed = 0.5;
let spinDirection = 0;
const img = new Image();
img.src = "character.png";
let aPressed = false;
let dPressed = false;
let sPressed = false;
let wPressed = false;
let moveSpeed = 2;
let imageSize = 0.5;
let imageX = canvas.width / 2;
let imageY = canvas.height / 2;
img.onload = function () {
  const x = 0;
  const y = 0;
  const width = img.width / 2;
  const height = img.height / 2;
  charecter.drawImage(img, x, y, width, height);
};
img.onload = function () {
  function drawRotatedImage() {
    charecter.clearRect(0, 0, canvas.width, canvas.height);
    const angleInRadians = (currentAngle * Math.PI) / 180;
    charecter.save();
    charecter.translate(imageX, imageY);
    charecter.rotate(angleInRadians);
    const newWidth = img.width * imageSize;
    const newHeight = img.height * imageSize;
    charecter.drawImage(img, -newWidth / 2, -newHeight / 2, newWidth, newHeight);
    charecter.restore();
    currentAngle += rotationSpeed * spinDirection;
    const moveX = moveSpeed * Math.cos(angleInRadians);
    const moveY = moveSpeed * Math.sin(angleInRadians);

    if (wPressed == true) {
      imageX += moveY;
      imageY -= moveX;
    }
    if (sPressed == true) {
      imageX -= moveY;
      imageY += moveX;
    }
    requestAnimationFrame(drawRotatedImage);
  }
  requestAnimationFrame(drawRotatedImage);
};
document.addEventListener("keydown", function (event) {
  if (event.key === "d" || event.key === "D") {
    dPressed = true;
    spinDirection = 1;
  } else if (event.key === "a" || event.key === "A") {
    aPressed = true;
    spinDirection = -1;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key == "a" || event.key === "A") {
    aPressed = false;
    if (!dPressed) {
      spinDirection = 0;
    }
  } else if (event.key === "d" || event.key === "D") {
    dPressed = false;
    if (!aPressed) {
      spinDirection = 0;
    }
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "w" || event.key === "W") {
    wPressed = true;
  } else if (event.key === "S" || event.key === "s") {
    sPressed = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "W" || event.key === "w") {
    wPressed = false;
    if (!wPressed) {
      spinDirection = 0;
    }
  } else if (event.key === "s" || event.key === "S") {
    sPressed = false;
    if (!sPressed) {
      spinDirection = 0;
    }
  }
});
