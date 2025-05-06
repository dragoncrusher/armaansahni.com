const canvas = document.getElementById("game-canvas");
const charecter = canvas.getContext("2d");
const touchElement = canvas.getContext("2d");
let currentAngle = 0;
let rotationSpeed = 0.5;
let spinDirection = 0;
const personimg = new Image();
personimg.src = "character.png";
const touchDetector = new Image();
touchDetector.src = "test.png";
let aPressed = false;
let dPressed = false;
let sPressed = false;
let wPressed = false;
let moveSpeed = 2;
let touching = false;
let imageSize = 0.5;
let imageX = canvas.width / 2;
let imageY = canvas.height / 2;
let theDetectorX = 0;
let theDetectorY = 0;
let detectorWidth;
let detectorHeight;
touchDetector.onload = function () {
  detectorWidth = touchDetector.width / 2;
  detectorHeight = touchDetector.height / 2;
};
personimg.onload = function () {
  function drawRotatedImage() {
    charecter.clearRect(0, 0, canvas.width, canvas.height);
    touchElement.drawImage(touchDetector, theDetectorX, theDetectorY, detectorWidth, detectorHeight);
    const angleInRadians = (currentAngle * Math.PI) / 180;
    charecter.save();
    charecter.translate(imageX, imageY);
    charecter.rotate(angleInRadians);
    const newWidth = personimg.width * imageSize;
    const newHeight = personimg.height * imageSize;
    charecter.drawImage(personimg, -newWidth / 2, -newHeight / 2, newWidth, newHeight);
    charecter.restore();
    currentAngle += rotationSpeed * spinDirection;
    const moveX = moveSpeed * Math.cos(angleInRadians);
    const moveY = moveSpeed * Math.sin(angleInRadians);
    const rect1 = {
      d1y: imageY + newHeight,
      a1y: imageY,
      c1x: imageX + newWidth,
      d1x: imageX,
    };
    const rect2 = {
      a2y: theDetectorY,
      d2y: theDetectorY + detectorHeight,
      d2x: theDetectorX,
      c2x: theDetectorX + detectorWidth,
    };
    // console.log("d2x " + rect2.d2x + " c2x " + rect2.c2x + " a2y " + rect2.a2y + " a1y " + rect1.a1y);
    // console.log("theDetectorY" + theDetectorY + "detectorWidth" + detectorWidth);

    const isTouching = checkCollision(rect1, rect2);
    if (isTouching && !touching) {
      console.error("touching");
      touching = true;
      touchDetector.src = "touching.png";
    } else if (!isTouching && touching) {
      console.error("not touching");
      touching = false;
      touchDetector.src = "test.png";
    }

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
function checkCollision(rect1, rect2) {
  const not_touching_x = rect2.d2x > rect1.c1x || rect1.d1x > rect2.c2x;
  const not_touching_y = rect1.d1y < rect2.a2y || rect2.d2y < rect1.a1y;

  console.log(rect2.d2x > rect1.c1x);
  console.log("11");
  console.log(rect1.d1x > rect2.c2x);
  console.log("12");
  console.log(rect1.d1y < rect2.a2y);
  console.log("21");
  console.log(rect2.d2y < rect1.a1y);
  console.log("22");
  // console.log("not_touching_x ", not_touching_x, "not_touching_y ", not_touching_y);
  // console.log(
  //   "d2x " +
  //     rect2.d2x +
  //     " c1x " +
  //     rect1.c1x +
  //     " d1x " +
  //     rect1.d1x +
  //     " c2x " +
  //     rect2.c2x +
  //     " d1y " +
  //     rect1.d1y +
  //     " a2y " +
  //     rect2.a2y +
  //     " d2y " +
  //     rect2.d2y +
  //     " a1y " +
  //     rect1.a1y
  // );

  return !(not_touching_x || not_touching_y);
}
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
