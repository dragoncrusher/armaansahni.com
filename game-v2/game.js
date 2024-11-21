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
const the_end_screen = document.getElementById("theendscreen")
const BossSelect = document.querySelector(".ChoosePage");
const the_end_message = document.querySelector(".EndPage")
const info_div = document.getElementById("InfoDiv")
const input_teller = document.getElementById("input_teller")
const attack_holder = document.getElementById("AttackHolder")   
const AttackInProgress = document.getElementById("AttackInProgress")

info_div.appendChild(infoDivInput)

let yhpOutput = document.createElement("p");
let wisard_hp = 300;
yhpOutput.innerHTML = "yourHp =" + wisard_hp;
wisardHpHolder.appendChild(yhpOutput);
const full_hp = document.createElement("p");
whereToPrint.appendChild(full_hp);

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
  attack_button_2.classList.add('Uncharged')
  attack_button_3.classList.add('Uncharged')
  attack_button_4.classList.add('Uncharged')
  info_div.style.display = "none"
  attack_holder.style.display  = "block"
  input_teller.style.display = "none"
  //imagePath = `${theboss}/background1.gif`;
  // thebackground.style.backgroundImage = `url(${imagePath})`;
  bossTimerInHtml = 
setInterval(() =>  {
  timertick(boss_attack_timer_time)
}, 1000);
  BossSelect.style.display = "none";
  bossKill.style.display = "flex";
  hp = HPsetter;
  full_hp.innerHTML = "enemyHP = " + hp;
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
  info_div.style.display = "none"
  attack_holder.style.display  = "none"
  input_teller.style.display = "block"
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
      attack_button_2.classList.add('Uncharged')
    } else {
      attack_button_2.classList.remove('Uncharged')
    }
    if (attackCharges["attackButton3Charge"] <= 3) {
      attack_button_3.classList.add('Uncharged')
    } else {
      attack_button_3.classList.remove('Uncharged')
    }
    if (attackCharges["attackButton4Charge"] <= 4) {
      attack_button_4.classList.add('Uncharged')
    } else {
      attack_button_4.classList.remove('Uncharged')
    }
    let the_math_question;
    theGlobalDamageInfo = TheDamage

    if (TheDamage == 1) {
      let a = Math.floor(Math.random() * 101);
      let b = Math.floor(Math.random() * 101);
      the_math_question = a + "+" + b + "=";
      theMathAnswer = a + b;
    }

    if (TheDamage == 2) {
      let a = Math.floor(Math.random() * 51);
      let b = Math.floor(Math.random() * 51);
      a = a + 50;
      the_math_question = a + "-" + b + "=";
      theMathAnswer = a - b;
    }

    if (TheDamage == 3) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 11);
      the_math_question = a + "x" + b + "=";
      theMathAnswer = a * b;
    }

    if (TheDamage == 4) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 10);
      b = b + 1;
      a = a * b;
      the_math_question = a + "÷" + b + "=";
      theMathAnswer = a / b;
    }

    theInputBox.focus()
    theInputWords.innerHTML = "To proseed you must do math. What is " + the_math_question + "?"
    theMathAsk.appendChild(theInputWords);
    
  } else {
    infoDivInput.innerHTML = "The move you want to use is not charged up yet. Please select another move."
    info_div.style.display = "block"
    attack_holder.style.display  = "none"
    input_teller.style.display = "none"
    setTimeout(function(){
      info_div.style.display = "none"
      attack_holder.style.display  = "block"
      input_teller.style.display = "none"

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
  info_div.style.display = "none"
  attack_holder.style.display  = "none"
  input_teller.style.display = "none"
  
  if (Number(theAnswer) == theMathAnswer) {
    attackCharges["attackButton1Charge"] = attackCharges["attackButton1Charge"] + 1 
    attackCharges["attackButton2Charge"] = attackCharges["attackButton2Charge"] + 1
    attackCharges["attackButton3Charge"] = attackCharges["attackButton3Charge"] + 1
    attackCharges["attackButton4Charge"] = attackCharges["attackButton4Charge"] + 1
    GoleShootHit();

  } else {
    infoDivInput.innerHTML = "sorry that was the wrong answer, the corect answer was: " + theMathAnswer + "."
    info_div.style.display = "block"
    attack_holder.style.display  = "none"
    input_teller.style.display = "none"
    wisardAttackWrapper.src = "costumewrong.png";
    setTimeout(function () {
      wisardAttackWrapper.src = "wisardgoodguy/wisardgoodguy.gif";
      info_div.style.display = "none"
      attack_holder.style.display  = "block"
      input_teller.style.display = "none"
    }, 1000);
  }
}

function GoleShootHit() {
  info_div.style.display = "none"
  attack_holder.style.display  = "none"
  input_teller.style.display = "none"
  AttackInProgress.style.display = "block"
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
    full_hp.innerHTML = "enemyHP = " + hp;
     
    if (hp < 0) {
      hp = 0
    }

    if (hp <= 0) {
    
    info_div.style.display = "none"
    attack_holder.style.display  = "none"
    input_teller.style.display = "none"
    the_end_message.style.display = "block"
    theEndScreenInput.innerHTML = "you win"
    clearInterval(bossTimerInHtml)
    the_end_screen.appendChild(theEndScreenInput)
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
    info_div.style.display = "none"
    attack_holder.style.display  = "block"
    input_teller.style.display = "none"
    AttackInProgress.style.display = "none"
  }, 6000);
}

function restart() {
  wisard_hp = 300 
  yhpOutput.innerHTML = "yourHP = " + wisard_hp  
  the_end_message.style.display = "none"
  BossSelect.style.display = "block"
}

function BossAttack() {
  const boss_attack_sound = boss + "/" + "attack_sound.m4a"
  let random_index;
  let the_bosses_answer;
  const boss_array = ["yes", "no"];
  

  random_index = Math.floor(Math.random() * 2);
  the_bosses_answer = boss_array[random_index];
  if (the_bosses_answer == "yes") {
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
      playSound(boss_attack_sound)
    }, 4000);

    setTimeout(function () {
      bossAttackWraper.src = boss + "/" + boss + ".gif";
    }, 5000);
    setTimeout(function () {
      wisardPlayer.style.backgroundColor = "red";
      playSound(hitSound)
      
      const the_boss_attack = Math.floor(Math.random() * 4);
      const bossmovearray = ["10", "20", "30", "40"];
      let thedamigeas;
  
      thedamigeas = bossmovearray[the_boss_attack];
      wisard_hp = wisard_hp - thedamigeas;
      yhpOutput.innerHTML = "yourHp =" + wisard_hp;

      if (wisard_hp < 0) {
        wisard_hp = 0
      }
      if (wisard_hp <= 0) {
        setTimeout(function () {
        info_div.style.display = "none"
        attack_holder.style.display  = "none"
        input_teller.style.display = "none"
        the_end_message.style.display = "block"
        theEndScreenInput.innerHTML = "you lose"
        clearInterval(bossTimerInHtml)
        the_end_screen.appendChild(theEndScreenInput)
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
