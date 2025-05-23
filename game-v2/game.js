"use strict";

let bossHP;
let totalBossHP;
let wizardHp = 300;
let isGameOver = false;
let realAnswer;
let userAnswer;
let bossId;
let bossTimerValue = 10;
let damageToBoss;
let bossTimer;
let attackCharges = {
  attackButton1Charge: 1,
  attackButton2Charge: 1,
  attackButton3Charge: 1,
  attackButton4Charge: 1,
};
let currentAttack;

const hitSound = "Hit_sound.m4a";
const battleSound = "Battle_sound_game.m4a";
const wizardAttackSound = "wizardgoodguy/Wizard_attack_sound.m4a";
const backgroundMusic = new Audio(battleSound);
backgroundMusic.loop = true;

const bossTimerHtml = document.getElementById("boss-timer");
const attackButton2 = document.getElementById("attack-button-2");
const attackButton3 = document.getElementById("attack-button-3");
const attackButton4 = document.getElementById("attack-button-4");
const underBoss = document.getElementById("under-boss");
const bossRightOrWrong = document.querySelector(".boss-right-or-wrong");
const bossTimerHolder = document.getElementById("boss-timer-holder");
const fightPage = document.querySelector(".fight-page");
const wizardAttackWrapper = document.getElementById("wizard-attack-wrapper");
const bossAttackWraper = document.getElementById("boss-attack-wrapper");
const wizardPlayer = document.getElementById("wizard-player");
const bossPlayer = document.getElementById("to-be-boss-player");
const bossHPholder = document.getElementById("boss-hp-holder");
const wizardHpHolder = document.getElementById("wizard-hp-holder");
const mathQuestionContainer = document.getElementById("math-question-container");
const inputBox = document.getElementById("input");
const endWords = document.getElementById("end-words");
const choosePage = document.querySelector(".choose-page");
const endPage = document.querySelector(".end-page");
const infoDiv = document.getElementById("info-div");
const inputContaner = document.getElementById("input-container");
const attackHolder = document.getElementById("attack-holder");
const attackInProgress = document.getElementById("attack-in-progress");
const bossHPbar = document.getElementById("boss-hp-bar");
const wizardHPbar = document.getElementById("wizard-hp-bar");
const body = document.body;

const wizardHPOutput = document.createElement("div");
wizardHPOutput.innerHTML = wizardHp;
wizardHpHolder.appendChild(wizardHPOutput);
const bossHPoutput = document.createElement("div");
bossHPholder.appendChild(bossHPoutput);
bossTimerHtml.innerHTML = bossTimerValue;

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

function startGame(totalHP, selectedBoss) {
  bossId = selectedBoss;
  body.style.backgroundColor = "rgb(0, 0, 0)";
  isGameOver = false;
  bossHPbar.style.width = "100%";
  bossHPbar.style.backgroundColor = "rgb(19, 130, 0)";
  wizardHPbar.style.width = "100%";
  wizardHPbar.style.backgroundColor = "rgb(19, 130, 0)";
  attackButton2.classList.add("uncharged");
  attackButton3.classList.add("uncharged");
  attackButton4.classList.add("uncharged");
  underBoss.style.display = "flex";
  infoDiv.style.display = "none";
  attackHolder.style.display = "block";
  inputContaner.style.display = "none";
  endPage.style.display = "none";
  wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguy.gif";
  bossAttackWraper.src = bossId + "/" + bossId + ".gif";
  body.style.backgroundImage = "url('" + bossId + "/background.png')";

  bossTimer = setInterval(() => {
    timertick();
  }, 1000);
  choosePage.style.display = "none";
  fightPage.style.display = "flex";
  body.style.backgroundColor = "rgb(0, 0, 0)";
  bossHP = totalHP;
  totalBossHP = totalHP;
  bossHPoutput.innerHTML = bossHP;
  bossAttackWraper.src = bossId + "/" + bossId + ".gif";
  bossTimerValue = 10;
  bossTimerHtml.innerHTML = bossTimerValue;
  backgroundMusic.play();
}

function randomChoice(choices) {
  const size = choices.length;
  const indexLookup = Math.floor(Math.random() * size);
  return choices[indexLookup];
}

function timertick() {
  bossTimerValue = bossTimerValue - 1;
  bossTimerHtml.innerHTML = bossTimerValue;
  if (bossTimerValue == 0) {
    BossAttack();
  }
}
function askThem(charge, damage) {
  infoDiv.style.display = "none";
  attackHolder.style.display = "none";
  inputContaner.style.display = "block";
  if (damage == 1) {
    currentAttack = "attackButton1Charge";
  }
  if (damage == 2) {
    currentAttack = "attackButton2Charge";
  }
  if (damage == 3) {
    currentAttack = "attackButton3Charge";
  }
  if (damage == 4) {
    currentAttack = "attackButton4Charge";
  }
  if (charge <= attackCharges[currentAttack]) {
    attackCharges[currentAttack] = attackCharges[currentAttack] - charge;
    if (attackCharges["attackButton2Charge"] <= 2) {
      attackButton2.classList.add("uncharged");
    } else {
      attackButton2.classList.remove("uncharged");
    }
    if (attackCharges["attackButton3Charge"] <= 3) {
      attackButton3.classList.add("uncharged");
    } else {
      attackButton3.classList.remove("uncharged");
    }
    if (attackCharges["attackButton4Charge"] <= 4) {
      attackButton4.classList.add("uncharged");
    } else {
      attackButton4.classList.remove("uncharged");
    }
    let mathQuestion;
    damageToBoss = damage * 10;
    if (damage == 1) {
      const level = randomChoice(["addition", "subtraction"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 10);
        let b = 1 + Math.floor(Math.random() * 10);
        mathQuestion = a + "+" + b + "=";
        realAnswer = a + b;
      } else {
        let a = 1 + Math.floor(Math.random() * 6);
        let b = 1 + Math.floor(Math.random() * 6);
        a = a + 5;
        mathQuestion = a + "-" + b + "=";
        realAnswer = a - b;
      }
    } else if (damage == 2) {
      const level = randomChoice(["addition", "subtraction", "division"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 10);
        let b = 1 + Math.floor(Math.random() * 100);
        mathQuestion = a + "+" + b + "=";
        realAnswer = a + b;
      } else if (level == "subtraction") {
        let a = 1 + Math.floor(Math.random() * 500);
        let b = 1 + Math.floor(Math.random() * 10);
        a = a + 500;
        mathQuestion = a + "-" + b + "=";
        realAnswer = a - b;
      } else {
        let a = 1 + Math.floor(Math.random() * 6);
        let b = 1 + Math.floor(Math.random() * 6);
        a = a * b;
        mathQuestion = a + "÷" + b + "=";
        realAnswer = a / b;
      }
    } else if (damage == 3) {
      const level = randomChoice(["addition", "multiplication", "division"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 100);
        let b = 1 + Math.floor(Math.random() * 100);
        mathQuestion = a + "+" + b + "=";
        realAnswer = a + b;
      } else if (level == "multiplication") {
        let a = 1 + Math.floor(Math.random() * 6);
        let b = 1 + Math.floor(Math.random() * 6);
        mathQuestion = a + "x" + b + "=";
        realAnswer = a * b;
      } else {
        let a = 6 + Math.floor(Math.random() * 7);
        let b = 6 + Math.floor(Math.random() * 7);
        a = a * b;
        mathQuestion = a + "÷" + b + "=";
        realAnswer = a / b;
      }
    } else if (damage == 4) {
      const level = randomChoice(["subtraction", "multiplication"]);
      if (level == "subtraction") {
        let a = 61 + Math.floor(Math.random() * 50);
        let b = 11 + Math.floor(Math.random() * 50);
        mathQuestion = a + "-" + b + "=";
        realAnswer = a - b;
      } else {
        let a = 6 + Math.floor(Math.random() * 7);
        let b = 6 + Math.floor(Math.random() * 7);
        mathQuestion = a + "x" + b + "=";
        realAnswer = a * b;
      }
    }
    inputBox.focus();
    mathQuestionContainer.innerHTML = "To proceed you must do math." + "<br/>" + " What is " + mathQuestion + "?";
  } else {
    infoDiv.innerHTML = "The move you want to use is not charged up yet. Please select another move.";
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputContaner.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        infoDiv.style.display = "none";
        attackHolder.style.display = "block";
        inputContaner.style.display = "none";
      }
    }, 4000);
  }
}
function getTheInput() {
  userAnswer = inputBox.value;
  console.log(userAnswer, "the answer");
  checkTheAnswer();
}
function checkTheAnswer() {
  if (userAnswer == null || userAnswer == "") {
    return;
  }
  infoDiv.style.display = "none";
  attackHolder.style.display = "none";
  inputContaner.style.display = "none";
  inputBox.value = "";
  mathQuestionContainer.innerHTML = "";

  if (Number(userAnswer) == realAnswer) {
    attackCharges["attackButton1Charge"] = attackCharges["attackButton1Charge"] + 1;
    attackCharges["attackButton2Charge"] = attackCharges["attackButton2Charge"] + 1;
    attackCharges["attackButton3Charge"] = attackCharges["attackButton3Charge"] + 1;
    attackCharges["attackButton4Charge"] = attackCharges["attackButton4Charge"] + 1;
    wizardAttack();
  } else {
    infoDiv.innerHTML = "Wrong Answer";
    infoDiv.classList.add("info-div-question-wrong");
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputContaner.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguy.gif";
        infoDiv.style.display = "none";
        infoDiv.classList.remove("info-div-question-wrong");
        attackHolder.style.display = "block";
        inputContaner.style.display = "none";
      }
    }, 1000);
  }
}

function wizardAttack() {
  let barWidth;
  if (isGameOver == false) {
    const bossHitsplat = document.getElementById("boss-hitsplat");
    infoDiv.innerHTML = "Right Answer";
    infoDiv.style.display = "block";
    infoDiv.classList.add("info-div-question-right");
    attackHolder.style.display = "none";
    inputContaner.style.display = "none";
    attackInProgress.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        infoDiv.style.display = "none";
        infoDiv.classList.remove("info-div-question-right");
        attackHolder.style.display = "none";
        inputContaner.style.display = "none";
        attackInProgress.style.display = "block";
      }
    }, 2000);
    setTimeout(function () {
      if (isGameOver == false) {
        playSound(wizardAttackSound);
        wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguy.gif";
      }
    }, 1000);

    setTimeout(function () {
      if (isGameOver == false) {
        wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguycostume2.gif";
      }
    }, 2000);

    setTimeout(function () {
      if (isGameOver == false) {
        wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguy.gif";
      }
    }, 3000);

    setTimeout(function () {
      if (isGameOver == false) {
        bossPlayer.style.backgroundColor = "red";
        bossHitsplat.innerHTML = "-" + damageToBoss;
        bossHitsplat.style.display = "flex";
        let timeout = 250;

        setTimeout(function () {
          if (isGameOver == false) {
            barWidth = ((bossHP - damageToBoss) / totalBossHP) * 100;
            if (barWidth < 0) {
              barWidth = 0;
            }
            bossHPbar.style.width = barWidth + "%";
            console.log("updated", barWidth);
          }
        }, 359);
        for (let i = 0; i < 10; i++) {
          setTimeout(function () {
            setTimeout(function () {
              if (isGameOver == false) {
                bossHP = bossHP - damageToBoss / 10;
                const bossHpPercentage = (bossHP / totalBossHP) * 100;
                if (bossHpPercentage > 80) {
                  bossHPbar.style.backgroundColor = "rgb(19, 130, 0)";
                }
                if (bossHpPercentage <= 80 && bossHpPercentage > 49) {
                  bossHPbar.style.backgroundColor = "rgb(255, 221, 0)";
                }
                if (bossHpPercentage < 50) {
                  bossHPbar.style.backgroundColor = "rgb(167, 14, 14)";
                }
                if (bossHP < 0) {
                  bossHP = 0;
                }
                bossHPoutput.innerHTML = +bossHP;
                if (bossHP == 0) {
                  isGameOver = true;
                  underBoss.style.display = "none";
                  bossAttackWraper.src = "dead.png";
                  attackInProgress.style.display = "none";
                  infoDiv.style.display = "none";
                  attackHolder.style.display = "none";
                  inputContaner.style.display = "none";
                  endPage.style.display = "block";
                  endWords.innerHTML = "You Win!! 🏆";
                  backgroundMusic.pause();
                  clearInterval(bossTimer);
                }
              }
            }, 100);
          }, timeout);
          timeout = timeout + 250;
        }
        setTimeout(function () {
          bossHitsplat.style.display = "none";
          bossHitsplat.innerHTML = " ";
        }, 2000);
        playSound(hitSound);

        if (bossHP < 0) {
          bossHP = 0;
        }
      }
    }, 4000);

    setTimeout(function () {
      bossPlayer.style.backgroundColor = "transparent";
    }, 5000);
    setTimeout(function () {
      if (isGameOver == false) {
        infoDiv.style.display = "none";
        attackHolder.style.display = "block";
        inputContaner.style.display = "none";
        attackInProgress.style.display = "none";
      }
    }, 6000);
  } else {
    infoDiv.innerHTML = "sorry you are dead, and you cannot attack if you are dead";
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputContaner.style.display = "none";
    attackInProgress.style.display = "none";
  }
}

function restart() {
  wizardAttackWrapper.src = "wizardgoodguy/wizardgoodguy.gif";
  wizardHp = 300;
  wizardHPOutput.innerHTML = wizardHp;
  endPage.style.display = "none";
  choosePage.style.display = "block";
  body.style.backgroundColor = "rgb(255, 255, 255)";
  fightPage.style.display = "none";
  body.style.backgroundImage = "url('blank-space.png')";
}

function BossAttack() {
  let barWidth;
  const bossAttackSound = bossId + "/" + "attack_sound.m4a";
  let randomIndex;
  let bossAnswer;
  const bossArray = ["yes", "no"];

  randomIndex = Math.floor(Math.random() * 2);
  bossAnswer = bossArray[randomIndex];
  if (bossAnswer == "yes") {
    bossRightOrWrong.classList.add("boss-question-right");
    bossRightOrWrong.style.display = "block";
    bossRightOrWrong.innerHTML = "Right Answer";

    bossTimerHolder.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        bossRightOrWrong.classList.remove("boss-question-right");
        bossTimerValue = 15;
        bossTimerHtml.innerHTML = bossTimerValue;
        bossRightOrWrong.style.display = "none";
        bossTimerHolder.style.display = "flex";
        bossAttackWraper.src = bossId + "/" + bossId + ".gif";
      }
    }, 2000);
    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = bossId + "/" + bossId + "costume2.gif";
      }
    }, 3000);
    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = bossId + "/" + bossId + "costume3.gif";
      }
      playSound(bossAttackSound);
    }, 4000);

    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = bossId + "/" + bossId + ".gif";
      }
    }, 5000);
    setTimeout(function () {
      if (isGameOver == false) {
        wizardPlayer.style.backgroundColor = "red";
        playSound(hitSound);

        const bossAttackChoice = Math.floor(Math.random() * 4);
        const bossMoveArray = ["10", "20", "30", "40"];
        let damageToWizard;

        const wizardHitsplat = document.getElementById("wizard-hitsplat");

        damageToWizard = bossMoveArray[bossAttackChoice];

        wizardHitsplat.style.display = "flex";
        wizardHitsplat.innerHTML = "-" + damageToWizard;
        setTimeout(function () {
          wizardHitsplat.style.display = "none";
          wizardHitsplat.innerHTML = " ";
        }, 2000);

        let timeout = 250;
        setTimeout(function () {
          barWidth = ((wizardHp - damageToWizard) / 300) * 100;
          if (barWidth < 0) {
            barWidth = 0;
          }
          wizardHPbar.style.width = barWidth + "%";
        }, 350);
        for (let i = 0; i < 10; i++) {
          setTimeout(function () {
            setTimeout(function () {
              if (isGameOver == false) {
                wizardHp = wizardHp - damageToWizard / 10;
                const wizardHpPercentage = (wizardHp / 300) * 100;
                if (wizardHpPercentage > 80) {
                  wizardHPbar.style.backgroundColor = "rgb(19, 130, 0)";
                }
                if (wizardHpPercentage <= 80 && wizardHpPercentage > 49) {
                  wizardHPbar.style.backgroundColor = "rgb(255, 221, 0)";
                }
                if (wizardHpPercentage < 50) {
                  wizardHPbar.style.backgroundColor = "rgb(167, 14, 14)";
                }
                if (wizardHp < 0) {
                  wizardHp = 0;
                }
                if (wizardHp == 0) {
                  isGameOver = true;
                  wizardAttackWrapper.src = "dead.png";
                  underBoss.style.display = "none";
                  attackInProgress.style.display = "none";
                  infoDiv.style.display = "none";
                  attackHolder.style.display = "none";
                  inputContaner.style.display = "none";
                  endPage.style.display = "block";
                  endWords.innerHTML = "You Lose 😭😭😭";
                  backgroundMusic.pause();
                  clearInterval(bossTimer);
                }
                wizardHPOutput.innerHTML = wizardHp;
              }
            }, 100);
          }, timeout);
          timeout = timeout + 250;
        }
      }
    }, 5000);
    setTimeout(function () {
      wizardPlayer.style.backgroundColor = "transparent";
    }, 6000);
  } else {
    bossTimerHolder.style.display = "none";
    bossRightOrWrong.style.display = "block";
    bossRightOrWrong.innerHTML = "Wrong Answer";
    console.log("Wrong Answer");
    bossRightOrWrong.classList.add("boss-question-wrong");
    console.log("class add" + bossRightOrWrong.style.display + bossRightOrWrong.innerHTML);
    setTimeout(function () {
      if (isGameOver == false) {
        bossTimerHolder.style.display = "flex";
        bossRightOrWrong.style.display = "none";
        bossRightOrWrong.classList.remove("boss-question-wrong");
        console.log("class remove");
        bossTimerValue = 10;
        bossTimerHtml.innerHTML = bossTimerValue;
      }
    }, 2000);
  }
}
