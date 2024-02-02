let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'vareta', power: 5 },
  { name: 'adaga', power: 30 },
  { name: 'martelo de guerra', power: 50 },
  { name: 'espada bastarda', power: 100 },
];
const monsters = [
  {
    name: "gosma",
    level: 2,
    health: 15
  },
  {
    name: "besta flagelada",
    level: 8,
    health: 60
  },
  {
    name: "dragão",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "village town",
    "button text": ["Rumo à loja", "Rumo ao covil", "Combater dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Você está na praça da cidade. Avista uma placa que diz: \"Loja\"."
  },
  {
    name: "store",
    "button text": ["Curandeiro (10 ouro)", "Comprar armamento (30 ouro)", "Rumo ao centro da vila"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entre na loja"
  },
  {
    name: "cave",
    "button text": ["Combater gosma", "Combater besta flagelada", "Rumo ao centro da vila"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Adentra a caverna. Vislumbra criaturas."
  },
  {
    name: "fight",
    "button text": ["Atacar", "Esquivar", "Correr"],
    "button functions": [attack, dodge, goTown],
    text: "Você está combatendo uma criatura."
  },
  {
    name: "kill monster",
    "button text": ["Rumo ao centro da vila", "Rumo ao centro da vila", "Rumo ao centro da vila"],
    "button functions": [goTown, goTown, goTown],
    text: 'A criatura solta um grito estridente ao perecer. A experiência é conquistada e ouro é descoberto.'
  },
  {
    name: "lose",
    "button text": ["Novamente?", "Novamente?", "Novamente?"],
    "button functions": [restart, restart, restart],
    text: "Na escuridão da derrota, a sombra da adversidade envolve tudo. Os ecos da batalha desvanecem, substituídos por um silêncio pesaroso. Seu destino se entrelaça com o tecido implacável do insucesso. As esperanças despedaçadas e sonhos desfeitos são testemunhados pelas estrelas indiferentes. Em meio às ruínas da luta perdida, a jornada cessa, e o caminho é encerrado sob um manto sombrio de desespero. ☠️"
  },
  { 
    name: "win", 
    "button text": ["Novamente?", "Novamente?", "Novamente?"], 
    "button functions": [restart, restart, restart], 
    text: "Na penumbra da vitória, as sombras do desafio dissipam-se. O rugido do dragão silencia diante da sua destreza inigualável. A cidade, outrora oprimida, celebra na esperança renascida. Teu triunfo ecoa pelas muralhas como uma canção de coragem. Você emerge como um herói, as cicatrizes da batalha contam histórias de resistência. No firmamento, as estrelas testemunham sua jornada épica. A vitória é um cálice amargo, misturado com o sabor da perda e da conquista. O jogo é seu, mas as marcas da jornada permanecem, como capítulos imortais em um livro de feitos épicos. 🎉" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você descobre um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que você escolher coincidir com um dos números aleatórios, você vence!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Tua bolsa não abriga riquezas suficientes para adquirir vitalidade.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Você adquiriu uma nova arma: " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " No seu inventario há " + inventory;
    } else {
      text.innerText = "Tua fortuna não alcança para adquirir uma arma.";
    }
  } else {
    text.innerText = "Já empunhas a arma mais poderosa!";
    button2.innerText = "Venda arma por 15 ouros.";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu uma arma: " + currentWeapon + ".";
    text.innerText += " No seu inventoria há:  " + inventory;
  } else {
    text.innerText = "Não abra mão de sua única arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "Bloqueado";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "O/A " + monsters[fighting].name + " ataca.";
  text.innerText += " Você ataca com sua arma: " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Errou.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " O/A " + inventory.pop() + " quebrou.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivou-se do ataque da besta: " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["vareta"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Você escolheu " + guess + ". Aqui está um numero aleatório:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Certo! Acaba de ganhar 20 ouros";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Errado! Perdeu 10 de vitalidade!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}