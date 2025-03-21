//let imagePath;
//let thebackground = document.getElementById("background");
let bossHP;
let wisardHp = 300;
let isGameOver = false;
let theMathAnswer;
let theAnswer;
let boss;
let theGlobalDamageInfo;
let theInputWords = document.createElement("p");
let theEndScreenInput = document.createElement("p");
let infoDivInput = document.createElement("p");
let bossTimerInHtml;
let attackCharges = {
  attackButton1Charge: 1,
  attackButton2Charge: 1,
  attackButton3Charge: 1,
  attackButton4Charge: 1,
};
let theAttack;
let globalHPsetter;

const bossTimerHtml = document.getElementById("boss-timer");
const attackButton2 = document.getElementById("attack-button-2");
const attackButton3 = document.getElementById("attack-button-3");
const attackButton4 = document.getElementById("attack-button-4");
const underBoss = document.getElementById("under-boss");
const hitSound = "Hit_sound.wav";
const bossRightOrWrong = document.querySelector(".boss-right-or-wrong");
const bossTimerHolder = document.getElementById("boss-timer-holder");
const battleSound = "Battle_sound_game.m4a";
const wisardAttackSound = "wisardgoodguy/Wisard_attack_sound.m4a";
const bossKill = document.querySelector(".fight-page");
const wisardAttackWrapper = document.getElementById("wisard-attack-wrapper");
const bossAttackWraper = document.getElementById("boss-attack-wrapper");
const wisardPlayer = document.getElementById("wisard-player");
const bossPlayer = document.getElementById("to-be-boss-player");
const bossHPholder = document.getElementById("boss-hp-holder");
const wisardHpHolder = document.getElementById("wisard-hp-holder");
const theMathAsk = document.getElementById("the-input-words");
const theInputBox = document.getElementById("input");
const theEndScreen = document.getElementById("the-end-screen");
const bossSelect = document.querySelector(".choose-page");
const theEndMessage = document.querySelector(".end-page");
const infoDiv = document.getElementById("info-div");
const inputTeller = document.getElementById("input_teller");
const attackHolder = document.getElementById("attack-holder");
const attackInProgress = document.getElementById("attack-in-progress");
const bossHPbar = document.getElementById("boss-hp-bar");
const wisardHPbar = document.getElementById("wisard-hp-bar");
const body = document.body;

infoDiv.appendChild(infoDivInput);

const wizardHPOutput = document.createElement("div");
wizardHPOutput.innerHTML = wisardHp;
wisardHpHolder.appendChild(wizardHPOutput);
const bossHPoutput = document.createElement("div");
bossHPholder.appendChild(bossHPoutput);

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

function playSoundForever(soundFile) {
  const audio = new Audio(soundFile);
  audio.loop = true;
  audio.play();
}

function startGame(HPsetter, theboss) {
  body.style.backgroundColor = "rgb(0, 0, 0)";
  isGameOver = false;
  bossHPbar.style.width = "100%";
  bossHPbar.style.backgroundColor = "rgb(19, 130, 0)";
  wisardHPbar.style.width = "100%";
  wisardHPbar.style.backgroundColor = "rgb(19, 130, 0)";
  attackButton2.classList.add("uncharged");
  attackButton3.classList.add("uncharged");
  attackButton4.classList.add("uncharged");
  underBoss.style.display = "flex";
  infoDiv.style.display = "none";
  attackHolder.style.display = "block";
  inputTeller.style.display = "none";
  theEndMessage.style.display = "none";
  wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  bossAttackWraper.src = theboss + "/" + theboss + ".gif";
  body.style.backgroundImage = "url('" + theboss + "/background.png')";

  //imagePath = `${theboss}/background1.gif`;
  // thebackground.style.backgroundImage = `url(${imagePath})`;
  bossTimerInHtml = setInterval(() => {
    timertick();
  }, 1000);
  bossSelect.style.display = "none";
  bossKill.style.display = "flex";
  body.style.backgroundColor = "rgb(0, 0, 0)";
  hp = HPsetter;
  globalHPsetter = HPsetter;
  bossHPoutput.innerHTML = hp;
  boss = theboss;
  bossAttackWraper.src = boss + "/" + boss + ".gif";
  bossTimer();

  playSoundForever(battleSound);
}

function randomChoice(choices) {
  const size = choices.length;
  const indexLookup = Math.floor(Math.random() * size);
  return choices[indexLookup];
}

function bossTimer() {
  bossTimerHtml.innerHTML = 15;
}
function timertick() {
  bossTimerHtml.innerHTML = bossTimerHtml.innerHTML - 1;
  if (bossTimerHtml.innerHTML == 0) {
    BossAttack();
  }
}
function askThem(charge, TheDamage) {
  infoDiv.style.display = "none";
  attackHolder.style.display = "none";
  inputTeller.style.display = "block";
  if (TheDamage == 1) {
    theAttack = "attackButton1Charge";
  }
  if (TheDamage == 2) {
    theAttack = "attackButton2Charge";
  }
  if (TheDamage == 3) {
    theAttack = "attackButton3Charge";
  }
  if (TheDamage == 4) {
    theAttack = "attackButton4Charge";
  }
  if (charge <= attackCharges[theAttack]) {
    attackCharges[theAttack] = attackCharges[theAttack] - charge;
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
    let theMathQuestion;
    theGlobalDamageInfo = TheDamage * 10;
    if (TheDamage == 1) {
      const level = randomChoice(["addition", "subtraction"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 10);
        let b = 1 + Math.floor(Math.random() * 10);
        theMathQuestion = a + "+" + b + "=";
        theMathAnswer = a + b;
      } else {
        let a = 1 + Math.floor(Math.random() * 6);
        let b = 1 + Math.floor(Math.random() * 6);
        a = a + 5;
        theMathQuestion = a + "-" + b + "=";
        theMathAnswer = a - b;
      }
    } else if (TheDamage == 2) {
      const level = randomChoice(["addition", "subtraction", "division"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 10);
        let b = 1 + Math.floor(Math.random() * 100);
        theMathQuestion = a + "+" + b + "=";
        theMathAnswer = a + b;
      } else if (level == "subtraction") {
        let a = 1 + Math.floor(Math.random() * 500);
        let b = 1 + Math.floor(Math.random() * 10);
        a = a + 500;
        theMathQuestion = a + "-" + b + "=";
        theMathAnswer = a - b;
      } else {
        let a = 1 + Math.floor(Math.random() * 5);
        let b = 1 + Math.floor(Math.random() * 5);
        a = a * b;
        theMathQuestion = a + "÷" + b + "=";
        theMathAnswer = a / b;
      }
    } else if (TheDamage == 3) {
      const level = randomChoice(["addition", "multiplication", "division"]);
      if (level == "addition") {
        let a = 1 + Math.floor(Math.random() * 100);
        let b = 1 + Math.floor(Math.random() * 100);
        theMathQuestion = a + "+" + b + "=";
        theMathAnswer = a + b;
      } else if (level == "multiplication") {
        let a = 1 + Math.floor(Math.random() * 5);
        let b = 1 + Math.floor(Math.random() * 5);
        theMathQuestion = a + "x" + b + "=";
        theMathAnswer = a * b;
      } else {
        let a = 6 + Math.floor(Math.random() * 12);
        let b = 6 + Math.floor(Math.random() * 12);
        a = a * b;
        theMathQuestion = a + "÷" + b + "=";
        theMathAnswer = a / b;
      }
    } else if (TheDamage == 4) {
      const level = randomChoice(["subtraction", "multiplication"]);
      if (level == "subtraction") {
        let a = 61 + Math.floor(Math.random() * 50);
        let b = 11 + Math.floor(Math.random() * 50);
        theMathQuestion = a + "-" + b + "=";
        theMathAnswer = a - b;
      } else {
        let a = 6 + Math.floor(Math.random() * 12);
        let b = 6 + Math.floor(Math.random() * 12);
        theMathQuestion = a + "x" + b + "=";
        theMathAnswer = a * b;
      }
    }
    theInputBox.focus();
    theInputWords.innerHTML = "To proceed you must do math." + "<br/>" + " What is " + theMathQuestion + "?";
    theMathAsk.appendChild(theInputWords);
  } else {
    infoDivInput.innerHTML = "The move you want to use is not charged up yet. Please select another move.";
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputTeller.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        infoDiv.style.display = "none";
        attackHolder.style.display = "block";
        inputTeller.style.display = "none";
      }
    }, 4000);
  }
}
function getTheInput() {
  theAnswer = theInputBox.value;
  checkTheAnswer();
  theInputBox.value = "";
  theInputWords.innerHTML = "";
  theMathAsk.appendChild(theInputWords);
}
function checkTheAnswer() {
  if (theAnswer == null) {
    return;
  }
  infoDiv.style.display = "none";
  attackHolder.style.display = "none";
  inputTeller.style.display = "none";

  if (Number(theAnswer) == theMathAnswer) {
    attackCharges["attackButton1Charge"] = attackCharges["attackButton1Charge"] + 1;
    attackCharges["attackButton2Charge"] = attackCharges["attackButton2Charge"] + 1;
    attackCharges["attackButton3Charge"] = attackCharges["attackButton3Charge"] + 1;
    attackCharges["attackButton4Charge"] = attackCharges["attackButton4Charge"] + 1;
    GoleShootHit();
  } else {
    infoDivInput.innerHTML = "Wrong Answer";
    infoDiv.classList.add("info-div-question-wrong");
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputTeller.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
        infoDiv.style.display = "none";
        infoDiv.classList.remove("info-div-question-wrong");
        attackHolder.style.display = "block";
        inputTeller.style.display = "none";
      }
    }, 1000);
  }
}

function GoleShootHit() {
  let theBarWidth;
  if (isGameOver == false) {
    const bossHitsplat = document.getElementById("boss-hitsplat");
    infoDivInput.innerHTML = "Right Answer";
    infoDiv.style.display = "block";
    infoDiv.classList.add("info-div-question-right");
    attackHolder.style.display = "none";
    inputTeller.style.display = "none";
    attackInProgress.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        infoDiv.style.display = "none";
        infoDiv.classList.remove("info-div-question-right");
        attackHolder.style.display = "none";
        inputTeller.style.display = "none";
        attackInProgress.style.display = "block";
      }
    }, 2000);
    setTimeout(function () {
      if (isGameOver == false) {
        playSound(wisardAttackSound);
        wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
      }
    }, 1000);

    setTimeout(function () {
      if (isGameOver == false) {
        wisardAttackWrapper.src = "wisardgoodguy/wizardgoodguycostume2.gif";
      }
    }, 2000);

    setTimeout(function () {
      if (isGameOver == false) {
        wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
      }
    }, 3000);

    setTimeout(function () {
      if (isGameOver == false) {
        bossPlayer.style.backgroundColor = "red";
        bossHitsplat.innerHTML = "-" + theGlobalDamageInfo;
        bossHitsplat.style.display = "flex";
        let timeout = 250;

        setTimeout(function () {
          if (isGameOver == false) {
            theBarWidth = ((hp - theGlobalDamageInfo) / globalHPsetter) * 100;
            if (theBarWidth < 0) {
              theBarWidth = 0;
            }
            bossHPbar.style.width = theBarWidth + "%";
            console.log("updated", theBarWidth);
          }
        }, 359);
        for (let i = 0; i < 10; i++) {
          setTimeout(function () {
            setTimeout(function () {
              if (isGameOver == false) {
                hp = hp - theGlobalDamageInfo / 10;
                if (hp < 0) {
                  hp = 0;
                }
                bossHPoutput.innerHTML = +hp;
                if (hp == 0) {
                  isGameOver = true;
                  underBoss.style.display = "none";
                  bossAttackWraper.src = "dead.png";
                  attackInProgress.style.display = "none";
                  infoDiv.style.display = "none";
                  attackHolder.style.display = "none";
                  inputTeller.style.display = "none";
                  theEndMessage.style.display = "block";
                  theEndScreenInput.innerHTML = "You Win!! 🏆";
                  clearInterval(bossTimerInHtml);
                  theEndScreen.appendChild(theEndScreenInput);
                }
                if (theBarWidth > 80) {
                  bossHPbar.style.backgroundColor = "rgb(19, 130, 0)";
                }
                if (theBarWidth <= 80 && theBarWidth > 49) {
                  bossHPbar.style.backgroundColor = "rgb(255, 221, 0)";
                }
                if (theBarWidth < 50) {
                  bossHPbar.style.backgroundColor = "rgb(167, 14, 14)";
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

        if (hp < 0) {
          hp = 0;
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
        inputTeller.style.display = "none";
        attackInProgress.style.display = "none";
      }
    }, 6000);
  } else {
    infoDivInput.innerHTML = "sorry you are dead, and you cannot attack if you are dead";
    infoDiv.style.display = "block";
    attackHolder.style.display = "none";
    inputTeller.style.display = "none";
    attackInProgress.style.display = "none";
  }
}

function restart() {
  wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  wisardHp = 50;
  wizardHPOutput.innerHTML = wisardHp;
  theEndMessage.style.display = "none";
  bossSelect.style.display = "block";
  body.style.backgroundColor = "rgb(255, 255, 255)";
  bossKill.style.display = "none";
  body.style.backgroundImage = "url('blank-space.png')";
}

function BossAttack() {
  let theBarWidth;
  const bossAttackSound = boss + "/" + "attack_sound.wav";
  let randomIndex;
  let theBossesAnswer;
  const bossArray = ["yes", "no"];

  randomIndex = Math.floor(Math.random() * 2);
  theBossesAnswer = bossArray[randomIndex];
  if (theBossesAnswer == "yes") {
    bossRightOrWrong.classList.add("boss-question-right");
    bossRightOrWrong.style.display = "block";
    bossRightOrWrong.innerHTML = "Right Answer";

    bossTimerHolder.style.display = "none";
    setTimeout(function () {
      if (isGameOver == false) {
        bossRightOrWrong.classList.remove("boss-question-right");
        bossTimerHtml.innerHTML = 15;
        bossRightOrWrong.style.display = "none";
        bossTimerHolder.style.display = "flex";
        bossAttackWraper.src = boss + "/" + boss + ".gif";
      }
    }, 2000);
    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = boss + "/" + boss + "costume2.gif";
      }
    }, 3000);
    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = boss + "/" + boss + "costume3.gif";
      }
      playSound(bossAttackSound);
    }, 4000);

    setTimeout(function () {
      if (isGameOver == false) {
        bossAttackWraper.src = boss + "/" + boss + ".gif";
      }
    }, 5000);
    setTimeout(function () {
      if (isGameOver == false) {
        wisardPlayer.style.backgroundColor = "red";
        playSound(hitSound);

        const theBossAttack = Math.floor(Math.random() * 4);
        const bossMoveArray = ["10", "20", "30", "40"];
        let theDamigeas;

        const wisardHitsplat = document.getElementById("wisard-hitsplat");

        theDamigeas = bossMoveArray[theBossAttack];

        wisardHitsplat.style.display = "flex";
        wisardHitsplat.innerHTML = "-" + theDamigeas;
        setTimeout(function () {
          wisardHitsplat.style.display = "none";
          wisardHitsplat.innerHTML = " ";
        }, 2000);

        let timeout = 250;
        setTimeout(function () {
          theBarWidth = ((wisardHp - theDamigeas) / 300) * 100;
          if (theBarWidth < 0) {
            theBarWidth = 0;
          }
          wisardHPbar.style.width = theBarWidth + "%";
          if (theBarWidth > 80) {
            wisardHPbar.style.backgroundColor = "rgb(19, 130, 0)";
          }
          if (theBarWidth <= 80 && theBarWidth > 49) {
            wisardHPbar.style.backgroundColor = "rgb(255, 221, 0)";
          }
          if (theBarWidth < 50) {
            wisardHPbar.style.backgroundColor = "rgb(167, 14, 14)";
          }
        }, 350);
        for (let i = 0; i < 10; i++) {
          setTimeout(function () {
            setTimeout(function () {
              if (isGameOver == false) {
                wisardHp = wisardHp - theDamigeas / 10;
                if (wisardHp < 0) {
                  wisardHp = 0;
                }
                if (wisardHp == 0) {
                  isGameOver = true;
                  wisardAttackWrapper.src = "dead.png";
                  underBoss.style.display = "none";
                  attackInProgress.style.display = "none";
                  infoDiv.style.display = "none";
                  attackHolder.style.display = "none";
                  inputTeller.style.display = "none";
                  theEndMessage.style.display = "block";
                  theEndScreenInput.innerHTML = "You Lose 😭😭😭";
                  clearInterval(bossTimerInHtml);
                  theEndScreen.appendChild(theEndScreenInput);
                }
                wizardHPOutput.innerHTML = wisardHp;
              }
            }, 100);
          }, timeout);
          timeout = timeout + 250;
        }
      }
    }, 5000);
    setTimeout(function () {
      wisardPlayer.style.backgroundColor = "transparent";
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
        bossTimerHtml.innerHTML = 10;
      }
    }, 2000);
  }
}
