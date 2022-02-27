const SECOND_PAGE = document.getElementById("secondPage");
const TITLE = document.querySelector(".title");
const RESULT = document.querySelector(".result");
const BTNS = document.querySelector(".btns");
const BTN1 = document.querySelector(".btn1");
const BTN2 = document.querySelector(".btn2");
const BTN3 = document.querySelector(".btn3");
const BOX1 = document.querySelector(".box1");
const HTML_WORDS = document.getElementsByTagName("p");
const BOX2 = document.querySelector(".box2");
const BOX3 = document.querySelector(".box3");
const LETTERS = document.querySelectorAll(".box");
const COUNTER = document.querySelector(".counter");
const MINUT_TIMER = document.querySelector(".minut-timer");
const SECOND_TIMER = document.querySelector(".second-timer");
const AMOUNT = document.querySelector(".amount");
const WINNER = document.querySelector(".winner");
let foundWords = [];
import { words1, words2, words3 } from "./wordsData.js";

// LOGICAL FUNCTIONS

const clickBtn = (btn) => {
  renderTimer();
  BTNS.style.display = "none";
  SECOND_PAGE.id = "secondPageStyle";
  if (btn === BTN1) {
    BOX1.className = "box1 word selected-words-card";
    BOX2.style.opacity = "0.5";
    BOX3.style.opacity = "0.5";
    findWord(words1);
  } else if (btn === BTN2) {
    BOX1.className = "box1 word selected-words-card";
    BOX2.className = "box1 word selected-words-card";
    BOX3.style.opacity = "0.5";
    findWord(words2);
  } else {
    BOX1.className = "box1 word selected-words-card";
    BOX2.className = "box1 word selected-words-card";
    BOX3.className = "box1 word selected-words-card";
    findWord(words3);
  }
};

const handleFoundWord = (signs) => {
  signs.forEach((letter) => {
    setTimeout(() => {
      letter.style.color = "red";
      letter.className = "box";
      letter.style.fontWeight = "bold";
    }, 500);
  });
};

const checkSelectedWords = (words, selectedWord, selectedLetters) => {
  words.forEach((ArrayWord, i) => {
    if (ArrayWord == selectedWord) {
      foundWords.push(selectedWord);
      renderCounter(foundWords);
      HTML_WORDS[i].style = "text-decoration:line-through; opacity:0.7";
      char = [];
      handleFoundWord(selectedLetters);
    }
  });
};

const checkLetters = (letter, id, words) => {
  if (
    char.length === 0 ||
    id === checkID + 8 ||
    id === checkID - 8 ||
    id === checkID + 1 ||
    id === checkID - 1
  ) {
    selectedLetters.push(letter);
    letter.className = "box selected-letter";
    checkID = id;
    char.push(letter.textContent);
    let selectedWord = char.join("");
    checkSelectedWords(words, selectedWord, selectedLetters);
  } else {
    char = [];
    selectedLetters.forEach((letter) => (letter.className = "box"));
    selectedLetters = [];
  }
};

let char = [],
  selectedLetters = [],
  checkID;
function findWord(words) {
  Array.from(LETTERS).forEach((letter, id) =>
    letter.addEventListener("click", () => checkLetters(letter, id, words))
  );
}

// RENDER FUNCTIONS

const finishGame = (prop) => {
  SECOND_PAGE.style.display = "none";
  TITLE.style.display = "none";
  if (prop === "timed") {
    RESULT.className = "finish-game";
    AMOUNT.innerHTML = counter.length;
  } else {
    RESULT.style.display = "none";
    WINNER.className = "finish-game";
  }
};

let sec = 59,
  min = 4;
const renderTimer = () => {
  setTimeout(() => {
    SECOND_TIMER.innerHTML = --sec;
    if (min === 0 && sec === 0) finishGame("timed");
    if (sec === 0 && min !== 0) {
      MINUT_TIMER.innerHTML = --min;
      sec = 59;
    }
    if (sec > 0) renderTimer();
  }, 10);
};

let counter = [];
const renderCounter = (foundWords) => {
  counter = foundWords.filter(
    (item, index) => foundWords.indexOf(item) === index
  );
  COUNTER.innerHTML = counter.length;
  if (counter.length === 15) setTimeout(() => finishGame(), 1000);
};

BTN1.addEventListener("click", () => clickBtn(BTN1));
BTN2.addEventListener("click", () => clickBtn(BTN2));
BTN3.addEventListener("click", () => clickBtn(BTN3));
