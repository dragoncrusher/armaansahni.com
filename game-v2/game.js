//let imagePath;
//let thebackground = document.getElementById("background");
let hp;
let the_math_answer;
let the_answer;
let boss;
let TheCharge = 1;
let TheGlobalDamageInfo
let the_input_words = document.createElement("p")
let the_end_screen_input = document.createElement("p")
let info_div_input = document.createElement("p")

const BossKill = document.querySelector(".FightPage");
const wisard_attack_wrapper = document.getElementById("wisard_attack_wrapper");
const boss_attack_wraper = document.getElementById("boss_attack_wrapper");
const wisard_player = document.getElementById("wisard_player");
const boss_player = document.getElementById("to_be_boss_player");
const where_to_print = document.getElementById("bosshpholder");
const wisardhpholder = document.getElementById("wisardhpholder");
const the_math_ask = document.getElementById("TheInputWords")
const the_input_box = document.getElementById("input")
const the_end_screen = document.getElementById("theendscreen")
const BossSelect = document.querySelector(".ChoosePage");
const the_end_message = document.querySelector(".EndPage")
const info_div = document.getElementById("InfoDiv")
const input_teller = document.getElementById("input_teller")

info_div.appendChild(info_div_input)

let yhpOutput = document.createElement("p");
let wisard_hp = 300;
yhpOutput.innerHTML = "yourHp =" + wisard_hp;
wisardhpholder.appendChild(yhpOutput);
const full_hp = document.createElement("p");
where_to_print.appendChild(full_hp);

function startGame(HPsetter, theboss) {
  //imagePath = `${theboss}/background1.gif`;
  // thebackground.style.backgroundImage = `url(${imagePath})`;
  
  

  wisard_player.style.borderColor = "blue";
  boss_player.style.borderColor = "transparent";
  BossSelect.style.display = "none";
  BossKill.style.display = "block";
  hp = HPsetter;
  full_hp.innerHTML = "enemyHP = " + hp;
  boss = theboss;
  boss_attack_wraper.src = boss + "/" + boss + ".gif";
}

function askThem(charge, TheDamage) {
  input_teller.style.display = "block"
  if (charge <= TheCharge) {
    TheCharge = TheCharge - charge;
    let the_math_question;
    TheGlobalDamageInfo = TheDamage

    if (TheDamage == 1) {
      let a = Math.floor(Math.random() * 101);
      let b = Math.floor(Math.random() * 101);
      the_math_question = a + "+" + b + "=";
      the_math_answer = a + b;
    }

    if (TheDamage == 2) {
      let a = Math.floor(Math.random() * 51);
      let b = Math.floor(Math.random() * 51);
      a = a + 50;
      the_math_question = a + "-" + b + "=";
      the_math_answer = a - b;
    }

    if (TheDamage == 3) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 11);
      the_math_question = a + "x" + b + "=";
      the_math_answer = a * b;
    }

    if (TheDamage == 4) {
      let a = Math.floor(Math.random() * 11);
      let b = Math.floor(Math.random() * 10);
      b = b + 1;
      a = a * b;
      the_math_question = a + "÷" + b + "=";
      the_math_answer = a / b;
    }

    the_input_box.focus()
    the_input_words.innerHTML = "To proseed you must do math. What is " + the_math_question + "?"
    the_math_ask.appendChild(the_input_words);
    
  } else {
    info_div_input.innerHTML = "The move you want to use is not charged up yet. Please select another move."
  }
}
function getTheInput () {
  the_answer = the_input_box.value;
    checkTheAnswer(TheGlobalDamageInfo);
  the_input_box.value = ""
  the_input_words.innerHTML = ""
  the_math_ask.appendChild(the_input_words)
}
function checkTheAnswer(TheDamage) {
  if (the_answer == null) {
    return;
  }

  input_teller.style.display = "none"

  if (Number(the_answer) == the_math_answer) {
    TheCharge = TheCharge + 1;
    GoleShootHit();

  } else {
    info_div_input.innerHTML = "sorry that was the wrong answer, the corect answer was: " + the_math_answer + "."
    wisard_attack_wrapper.src = "costumewrong.png";
    setTimeout(function () {
      wisard_attack_wrapper.src = "wisardgoodguy/wisardgoodguy.gif";
    }, 1000);
    setTimeout(function () {
      BossAttack();

    }, 2000);
  }
}

function GoleShootHit() {
  wisard_attack_wrapper.src = "costumeright.png";
  setTimeout(function () {
    wisard_attack_wrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  }, 1000);

  setTimeout(function () {
    wisard_attack_wrapper.src = "wisardgoodguy/wizardgoodguycostume2.gif";
  }, 2000);


  setTimeout(function () {
    wisard_attack_wrapper.src = "wisardgoodguy/wisardgoodguy.gif";
  }, 3000);

  setTimeout(function () {
    boss_player.style.backgroundColor = "red";

    hp = hp - TheGlobalDamageInfo  *10;
    full_hp.innerHTML = "enemyHP = " + hp;
     
    if (hp < 0) {
      hp = 0
    }

    if (hp <= 0) {
  
    BossKill.style.display = "none"
    the_end_message.style.display = "block"
    the_end_screen_input.innerHTML = "you win"
    the_end_screen.appendChild(the_end_screen_input)
  } else {
    setTimeout(function () {
      BossAttack();
    }, 7000);

  }
  }, 4000);

  setTimeout(function () {
    boss_player.style.backgroundColor = "transparent";
  }, 5000);

}

function restart() {
  wisard_hp = 300 
  yhpOutput.innerHTML = "yourHP = " + wisard_hp  
  the_end_message.style.display = "none"
  BossSelect.style.display = "block"
}

function BossAttack() {
  wisard_player.style.borderColor = "transparent";
  boss_player.style.borderColor = "blue";
  let random_index;
  let the_bosses_answer;
  const boss_array = ["yes", "no"];

  random_index = Math.floor(Math.random() * 2);
  the_bosses_answer = boss_array[random_index];
  if (the_bosses_answer == "yes") {

    setTimeout(function () {
      boss_attack_wraper.src = "costumeright.png";
    }, 1000);
    setTimeout(function () {
      boss_attack_wraper.src = boss + "/" + boss + ".gif";
    }, 2000);
    setTimeout(function () {
      boss_attack_wraper.src = boss + "/" + boss + "costume2.gif";
    }, 3000);
    setTimeout(function () {
      boss_attack_wraper.src = boss + "/" + boss + "costume3.gif";
    }, 4000);

    setTimeout(function () {
      boss_attack_wraper.src = boss + "/" + boss + ".gif";
    }, 5000);
    setTimeout(function () {
      wisard_player.style.backgroundColor = "red";
      
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
        BossKill.style.display = "none"
        the_end_message.style.display = "block"
        the_end_screen_input.innerHTML = "you lose"
        the_end_screen.appendChild(the_end_screen_input)
        }, 7000);
  
      }
    }, 5000);
    setTimeout(function () {

      wisard_player.style.backgroundColor = "transparent";
    }, 6000);

    setTimeout(function () {
      wisard_player.style.borderColor = "blue";
      boss_player.style.borderColor = "transparent";
    }, 8000);
    
  } else {
    boss_attack_wraper.src = "costumewrong.png";
    setTimeout(function () {
      boss_attack_wraper.src = boss + "/" + boss + ".gif";
    }, 1000);

    setTimeout(function () {
      wisard_player.style.borderColor = "blue";
      boss_player.style.borderColor = "transparent";
    }, 2000);

  }
}
