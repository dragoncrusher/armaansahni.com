"use strict";
window.onload = function () {
  pageload();
};
const xpBar = document.getElementById("xp-bar");
let currentXp;
let currentLevel;
const levelTeller = document.getElementById("level-teller");
const whatYouGot = document.getElementById("what-you-got");
function randomChoice(choices) {
  const size = choices.length;
  const indexLookup = Math.floor(Math.random() * size);
  return choices[indexLookup];
}
function roll() {
  let xpGained;
  const rollButton = document.getElementById("roll-button");
  rollButton.style.display = "none";
  whatYouGot.src = "rolling.png";
  setTimeout(function () {
    let whatAreYouGetting = randomChoice(["1", "2"]);
    if (whatAreYouGetting == "1") {
      whatYouGot.src = "super-common.png";
      xpGained = 1;
    } else {
      whatAreYouGetting = randomChoice(["1", "2"]);
      if (whatAreYouGetting == "1") {
        whatYouGot.src = "common.png";
        xpGained = 2;
      } else {
        whatAreYouGetting = randomChoice(["1", "2"]);
        if (whatAreYouGetting == "1") {
          whatYouGot.src = "uncommon.png";
          xpGained = 3;
        } else {
          whatAreYouGetting = randomChoice(["1", "2"]);
          if (whatAreYouGetting == "1") {
            whatYouGot.src = "normal.png";
            xpGained = 4;
          } else {
            whatAreYouGetting = randomChoice(["1", "2"]);
            if (whatAreYouGetting == "1") {
              whatYouGot.src = "invaluble.png";
              xpGained = 5;
            } else {
              whatAreYouGetting = randomChoice(["1", "2"]);
              if (whatAreYouGetting == "1") {
                whatYouGot.src = "rare.png";
                xpGained = 6;
              } else {
                whatAreYouGetting = randomChoice(["1", "2"]);
                if (whatAreYouGetting == "1") {
                  whatYouGot.src = "unbalevable.png";
                  xpGained = 7;
                } else {
                  whatAreYouGetting = randomChoice(["1", "2"]);
                  if (whatAreYouGetting == "1") {
                    whatYouGot.src = "legendary.png";
                    xpGained = 8;
                  } else {
                    whatAreYouGetting = randomChoice(["1", "2"]);
                    if (whatAreYouGetting == "1") {
                      whatYouGot.src = "mythical.png";
                      xpGained = 9;
                    } else {
                      whatAreYouGetting = randomChoice(["1", "2"]);
                      if (whatAreYouGetting == "1") {
                        whatYouGot.src = "secret.png";
                        xpGained = 10;
                      } else {
                        whatYouGot.src = "forgoten.png";
                        xpGained = 11;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    currentXp = currentXp + xpGained;
    xpBar.style.width = (currentXp / currentLevel) * 100 + "%";
    if (currentXp >= currentLevel) {
      currentLevel = currentLevel + 1;
      currentXp = 0;
      levelTeller.innerHTML = "level " + currentLevel;
      xpBar.style.width = "100%";
      setTimeout(function () {
        xpBar.classList.add("no-transition");
        console.log("add");
        whatYouGot.src = "level-up.png";
        xpBar.style.width = (currentXp / currentLevel) * 100 + "%";
        setTimeout(function () {
          xpBar.classList.remove("no-transition");
          whatYouGot.src = "default.png";
          console.log("removed");
        }, 100);
      }, 2000);
    }
  }, 1000);
  setTimeout(function () {
    rollButton.style.display = "flex";
  }, 1100);
}
function pageload() {
  xpBar.style.width = "0%";
  currentXp = 0;
  currentLevel = 1;
  levelTeller.innerHTML = "level " + currentLevel;
  whatYouGot.src = "default.png";
}
