let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let highestScore = 0;

let btns = ["yellow", "red", "green", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = "level " + level;
  let randomIdx = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIdx];
  let randombtn = document.querySelector(`.${randomColor}`);
  //   console.log(randomIdx);
  //   console.log(randomColor);
  //   console.log(randombtn);
  gameSeq.push(randomColor);
  btnFlash(randombtn);
}

function checkAns(idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highestScore) {
      highestScore = level;
      h2.innerHTML = `<style>h2{color:red}</style>Game Over!Congrats!You have set a new record. Your Score was <b>${level}</b>. Press any key to restart`;
    } else {
      h2.innerHTML = `<style>h2{color:red}</style>Game Over!Your Score was <b>${level}</b>. Press any key to restart`;
    }
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    restart();
  }
}

function btnPress() {
  console.log(this);
  let btn = this;
  userFlash(btn);
  let userbtn = btn.getAttribute("id");
  userSeq.push(userbtn);
  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function restart() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
