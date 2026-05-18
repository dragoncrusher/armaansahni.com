const nameBox = document.getElementById("name");
const img = document.getElementById("img");
const button = document.getElementById("button");
function randomizer() {
  button.disabled = true;
  // 1. Roll for Rarity Category (Legendary is exactly 0.3%)
  let roll = Math.random() * 100;
  let rarity = "";
  let maxNumber = 0;

  if (roll <= 0.01) {
    rarity = "forgotten";
    maxNumber = 1;
  } else if (roll <= 0.05) {
    rarity = "mythical";
    maxNumber = 3;
  } else if (roll <= 0.2) {
    rarity = "unique";
    maxNumber = 2;
  } else if (roll <= 0.5) {
    rarity = "legendary"; // (0.50 - 0.20) = 0.3%
    maxNumber = 4;
  } else if (roll <= 5.0) {
    rarity = "epic";
    maxNumber = 5;
  } else if (roll <= 15.0) {
    rarity = "rare";
    maxNumber = 6;
  } else if (roll <= 40.0) {
    rarity = "uncommon";
    maxNumber = 10;
  } else {
    rarity = "common";
    maxNumber = 12;
  }

  // 2. Pick a specific number within that rarity (e.g., Common 5)
  // This gives an equal chance to every number in that set
  let specificNumber = Math.floor(Math.random() * maxNumber) + 1;

  // 3. Setup the Variant Rank (Starts at M1)
  let variant = "M1";

  // 4. Three 50/50 Fate Rolls (Chained Upgrade)
  if (Math.floor(Math.random() * 2) === 0) {
    if (variant === "M1") variant = "M2";
  }
  if (Math.floor(Math.random() * 2) === 0) {
    if (variant === "M2") variant = "M3";
    else if (variant === "M1") variant = "M2";
  }
  if (Math.floor(Math.random() * 2) === 0) {
    if (variant === "M3") variant = "M4";
    else if (variant === "M2") variant = "M3";
    else if (variant === "M1") variant = "M2";
  }

  // 5. Final Output (e.g., "common 5 M2")
  nameBox.innerHTML = `${rarity} ${specificNumber} ${variant}`;

  console.log(`Roll: ${roll.toFixed(4)}% | Result: ${rarity} ${specificNumber} ${variant}`);
  img.src = rarity + ".gif";
  setTimeout(function () {
    img.src = rarity + ".png";
  }, 1222);
  setTimeout(function () {
    img.src = rarity + "-" + specificNumber + "-" + variant + ".png";
    button.disabled = false;
  }, 2000);
}
