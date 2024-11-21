//let imagePath;
//let thebackground = document.getElementById("background");
let hp;
let theMathAnswer;
let theAnswer;
let boss;
let theGlobalDamageInfo
let theInputWords = document.createElement("p")
let theEndScreenInput = document.createElement("p")
let infoDivInput = document.createElement("p")
let bossTimerInHtml
let attackCharges = {
  attackButton1Charge: 1,
  attackButton2Charge: 1,
  attackButton3Charge: 1,
  attackButton4Charge: 1
}
let theAttack

const attackButton2 = document.getElementById("Attackbutton2")
const attackButton3 = document.getElementById("Attackbutton3")
const attackButton4 = document.getElementById("Attackbutton4")
const hitSound = "Hit_sound.m4a"
const battleSound = "Battle_sound_game.m4a"
const wisardAttackSound = "wisardgoodguy/Wisard_attack_sound.m4a"
const bossKill = document.querySelector(".FightPage");
const wisardAttackWrapper = document.getElementById("wisard_attack_wrapper");
const bossAttackWraper = document.getElementById("boss_attack_wrapper");
const wisardPlayer = document.getElementById("wisard_player");
const bossPlayer = document.getElementById("to_be_boss_player");
const whereToPrint = document.getElementById("bosshpholder");
const wisardHpHolder = document.getElementById("wisardhpholder");
const theMathAsk = document.getElementById("TheInputWords")
const theInputBox = document.getElementById("input")
const theEndScreen = document.getElementById("theendscreen")
const bossSelect = document.querySelector(".ChoosePage");
const theEndMessage = document.querySelector(".EndPage")
const infoDiv = document.getElementById("InfoDiv")
const inputTeller = document.getElementById("input_teller")
const attackHolder = document.getElementById("AttackHolder")   
const attackInProgress = document.getElementById("AttackInProgress")

infoDiv.appendChild(infoDivInput)

let yhpOutput = document.createElement("p");
let wisardHp = 300;
yhpOutput.innerHTML = "yourHp =" + wisardHp;
wisardHpHolder.appendChild(yhpOutput);
const fullHp = document.createElement("p");
whereToPrint.appendChild(fullHp);

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

function playSoundForever(soundFile) {
  const audio = new Audio(soundFile);
  audio.loop = true
  audio.play();
}

function startGame(HPsetter, theboss, boss_attack_timer_time) {
  attackButton2.classList.add('Uncharged')
  attackButton3.classList.add('Uncharged')
  attackButton4.classList.add('Uncharged')
  infoDiv.style.display = "none"
  attackHolder.style.display  = "block"
  inputTeller.style.display = "none"
  //imagePath = `${theboss}/background1.gif`;
  // thebackground.style.backgroundImage = `url(${imagePath})`;
  bossTimerInHtml = 
setInterval(() =>  {
  timertick(boss_attack_timer_time)
}, 1000);
  bossSelect.style.display = "none";
  bossKill.style.display = "flex";
  hp = HPsetter;
  fullHp.innerHTML = "enemyHP = " + hp;
  boss = theboss;
  bossAttackWraper.src = boss + "/" + boss + ".gif";
  bossTimer(boss_attack_timer_time)
  
  playSoundForever(battleSound)
  
}
function bossTimer(boss_attack_timer_time) {
  boss_timer_html = document.getElementById("bosstimer")
  boss_timer_html.innerHTML = boss_attack_timer_time 
}
function timertick(boss_attack_timer_time) {
  boss_timer_html.innerHTML = boss_timer_html.innerHTML  - 1
  if (boss_timer_html.innerHTML <= 0) {
    BossAttack()
    boss_timer_html.innerHTML = boss_attack_timer_time
  }
}
function askThem(charge, TheDamage) {
  infoDiv.style.display = "none"
  attackHolder.style.display  = "none"
  inputTeller.style.display = "block"
  if (TheDamage == 1) {
    theAttack = "attackButton1Charge"
  }
  if (TheDamage == 2) {
    theAttack = "attackButton2Charge"
  }
  if (TheDamage == 3) {
    theAttack = "attackButton3Charge"
  }
  if (TheDamage == 4) {
    theAttack = "attackButton4Charge"
  }
  if (charge <= attackCharges[theAttack]) {
    attackCharges[theAttack] = attackCharges[theAttack] - charge;
    if (attackCharges["attackButton2Charge"] <= 2) {
      attackButton2.classList.add('Uncharged')
    } else {
      attackButton2.classList.remove('Uncharged')
    }
    if (attackCharges["attackButton3Charge"] <= 3) {
      attackButton3.classList.add('Uncharged')
    } else {
      attackButton3.classList.remove('Uncharged')
    }
    if (attackCharges["attackButton4Charge"] <= 4) {
      attackButton4.classList.add('Uncharged')
    } else {
      attackButton4.classList.remove('Uncharged')
    }
    let theMathQuestion;
    theGlobalDamageInfo = TheDamage

    if (TheDamage == 1) {
      let a = Math.floor(Math.random() * 101);
      let b = Math.floor(Math.random() * 101);
      theMathQuestion = a + "+" + b + "=";
      theMathAnswer = a + b;
    }

    if (TheDamage == 2) {
      let a = Math.floor(Math.random() * 51);
      let b = Math.floor(Math.random() * 51);
      a = a + 50;
      theMathQuestion = a + "-" + b + "=";
      theMathAnswer = a - b;
    }

    if (TheDamage == 3) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 11);
      theMathQuestion = a + "x" + b + "=";
      theMathAnswer = a * b;
    }

    if (TheDamage == 4) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 10);
      b = b + 1;
      a = a * b;
      theMathQuestion = a + "÷" + b + "=";
      theMathAnswer = a / b;
    }

    theInputBox.focus()
    theInputWords.innerHTML = "To proseed you must do math. What is " + theMathQuestion + "?"
    theMathAsk.appendChild(theInputWords);
    
  } else {
    infoDivInput.innerHTML = "The move you want to use is not charged up yet. Please select another move."
    infoDiv.style.display = "block"
    attackHolder.style.display  = "none"
    inputTeller.style.display = "none"
    setTimeout(function(){
      infoDiv.style.display = "none"
      attackHolder.style.display  = "block"
      inputTeller.style.display = "none"

    },4000)

  }
}
function getTheInput () {
  theAnswer = theInputBox.value;
    checkTheAnswer();
  theInputBox.value = ""
  theInputWords.innerHTML = ""
  theMathAsk.appendChild(theInputWords)
}
function checkTheAnswer() {
  if (theAnswer == null) {
    return;
  }
  infoDiv.style.display = "none"
  attackHolder.style.display  = "none"
  inputTeller.style.display = "none"
  
  if (Number(theAnswer) == theMathAnswer) {
    attackCharges["attackButton1Charge"] = attackCharges["attackButton1Charge"] + 1 
    attackCharges["attackButton2Charge"] = attackCharges["attackButton2Charge"] + 1
    attackCharges["attackButton3Charge"] = attackCharges["attackButton3Charge"] + 1
    attackCharges["attackButton4Charge"] = attackCharges["attackButton4Charge"] + 1
    GoleShootHit();

  } else {
    infoDivInput.innerHTML = "sorry that was the wrong answer, the corect answer was: " + theMathAnswer + "."
    infoDiv.style.display = "block"
    attackHolder.style.display  = "none"
    inputTeller.style.display = "none"
    wisardAttackWrapper.src = "costumewrong.png";
    setTimeout(function () {
      wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
      infoDiv.style.display = "none"
      attackHolder.style.display  = "block"
      inputTeller.style.display = "none"
    }, 1000);
  }
}

function GoleShootHit() {
  infoDiv.style.display = "none"
  attackHolder.style.display  = "none"
  inputTeller.style.display = "none"
  attackInProgress.style.display = "block"
  wisardAttackWrapper.src = "costumeright.png";
  setTimeout(function () {
    playSound(wisardAttackSound)
    wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  }, 1000);

  setTimeout(function () {
    wisardAttackWrapper.src = "wisardgoodguy/wizardgoodguycostume2.gif";
  }, 2000);


  setTimeout(function () {
    wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  }, 3000);

  setTimeout(function () {
    bossPlayer.style.backgroundColor = "red";
    playSound(hitSound)

    hp = hp - theGlobalDamageInfo  *10;
    fullHp.innerHTML = "enemyHP = " + hp;
     
    if (hp < 0) {
      hp = 0
    }

    if (hp <= 0) {
    
    infoDiv.style.display = "none"
    attackHolder.style.display  = "none"
    inputTeller.style.display = "none"
    theEndMessage.style.display = "block"
    theEndScreenInput.innerHTML = "you win"
    clearInterval(bossTimerInHtml)
    theEndScreen.appendChild(theEndScreenInput)
    setInterval(function() {
      boss_attack_wrapper.src = "dead.png"
    },1)
  } else {
    setTimeout(function () {
      BossAttack();
    }, 7000);

  }
  }, 4000);

  setTimeout(function () {
    bossPlayer.style.backgroundColor = "transparent";
  }, 5000);
  setTimeout(function() {
    infoDiv.style.display = "none"
    attackHolder.style.display  = "block"
    inputTeller.style.display = "none"
    attackInProgress.style.display = "none"
  }, 6000);
}

function restart() {
  wisardHp = 300 
  yhpOutput.innerHTML = "yourHP = " + wisardHp  
  theEndMessage.style.display = "none"
  bossSelect.style.display = "block"
}

function BossAttack() {
  const bossAttackSound = boss + "/" + "attack_sound.m4a"
  let randomIndex;
  let theBossesAnswer;
  const bossArray = ["yes", "no"];
  

  randomIndex = Math.floor(Math.random() * 2);
  theBossesAnswer = bossArray[randomIndex];
  if (theBossesAnswer == "yes") {
    setTimeout(function () {
      bossAttackWraper.src = "costumeright.png";
    }, 1000);
    setTimeout(function () {
      playSound(wisardAttackSound)
      bossAttackWraper.src = boss + "/" + boss + ".gif";
    }, 2000);
    setTimeout(function () {
      bossAttackWraper.src = boss + "/" + boss + "costume2.gif";
    }, 3000);
    setTimeout(function () {
      bossAttackWraper.src = boss + "/" + boss + "costume3.gif";
      playSound(bossAttackSound)
    }, 4000);

    setTimeout(function () {
      bossAttackWraper.src = boss + "/" + boss + ".gif";
    }, 5000);
    setTimeout(function () {
      wisardPlayer.style.backgroundColor = "red";
      playSound(hitSound)
      
      const theBossAttack = Math.floor(Math.random() * 4);
      const bossmovearray = ["10", "20", "30", "40"];
      let theDamigeas;
  
      theDamigeas = bossmovearray[theBossAttack];
      wisardHp = wisardHp - theDamigeas;
      yhpOutput.innerHTML = "yourHp =" + wisardHp;

      if (wisardHp < 0) {
        wisardHp = 0
      }
      if (wisardHp <= 0) {
        setTimeout(function () {
        infoDiv.style.display = "none"
        attackHolder.style.display  = "none"
        inputTeller.style.display = "none"
        theEndMessage.style.display = "block"
        theEndScreenInput.innerHTML = "you lose"
        clearInterval(bossTimerInHtml)
        theEndScreen.appendChild(theEndScreenInput)
        setInterval(function() {
          wisardAttackWrapper.src = "dead.png"
        },1)
        }, 7000);
  
      }
    }, 5000);
    setTimeout(function () {

      wisardPlayer.style.backgroundColor = "transparent";
    }, 6000);

    
  } else {
    bossAttackWraper.src = "costumewrong.png";
    setTimeout(function () {
      bossAttackWraper.src = boss + "/" + boss + ".gif";
    }, 1000);


  }
}
