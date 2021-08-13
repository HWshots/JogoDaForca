const inputLetter = document.getElementById("letter");
const newGameBtn = document.getElementById("newGame");
const playBtn = document.getElementById("play");
const image = document.querySelector(".image");
const game = document.querySelector(".game");
const h2 = document.querySelector(".try");
const score = document.querySelector(".score");
const usedLetters = document.querySelector(".usedLetters");
const wordList = ["banana", "kiwi", "morango", "pera", "laranja", "maracuja", "limao", "pessego", "ameixa", "uva"];
usedLetters.textContent = "Letras jogadas: " ;
imagesArr = [
    "url(images/hangman.jpg) -524px -1px",
    "url(images/hangman.jpg) -421px -1px",
    "url(images/hangman.jpg) -317px -1px",
    "url(images/hangman.jpg) -209px -1px",
    "url(images/hangman.jpg) -107px -1px",
    "url(images/hangman.jpg) -1px -1px",
];

image.style.background = imagesArr[5];

let secretWord;
let playWord = [];
let cacheL = [];
const result = document.querySelector(".resultado");

let jogadas = 5;
let playLetters = 0;

function init() {
    h2.textContent = "Tentativas: " + jogadas + " de 5"
    randomGeneratedNumber = Math.floor(Math.random() * wordList.length);
    secretWord = wordList[randomGeneratedNumber];
    console.log("Palavra secreta: " + secretWord);
    for (let i = 0; i < secretWord.length; i++) {
        const letters = document.createElement("div");
        letters.classList.add("letters")
        letters.textContent = " ";
        result.appendChild(letters);
    }
    play();
}

function play() {
    
    inputLetter.onchange = function () {
        playLetters = 0;
        jogadas--;
        h2.textContent = "Tentativas: " + jogadas + " de 5"
        result.innerHTML = "";
        console.log("letra jogada: " + inputLetter.value);
        cacheL.push(inputLetter.value);
        for (let i = 0; i < secretWord.length; i++) {
            const letters = document.createElement("div");
            letters.classList.add("letters");
            if (inputLetter.value == secretWord.charAt(i)) {
                playWord[i] = true;
            }
            if (playWord[i] == true) {
                playLetters++;
                letters.textContent = secretWord.charAt(i);
                letters.style.backgroundColor = "#a3ffa3";
            } else if (playWord.length > 0) {
                letters.textContent = " ";
            }
            result.appendChild(letters);
        }
        console.log("letras certas: " + playLetters);
        console.log("jogadas: " + jogadas);
        check();
        inputLetter.value = "";
    }
}

function check() {
    image.style.background = imagesArr[jogadas];
    console.log(cacheL);
    if (playLetters >= secretWord.length) {
        console.log("Ganhou!!");
        const div = document.createElement("div");
        div.textContent = "Ganhou!!";
        score.appendChild(div);
        inputLetter.disabled = true;
    } else if (jogadas <= 0) {
        console.log("Perdeu!!");
        const div = document.createElement("div");
        div.textContent = "Perdeu!!";
        score.appendChild(div);
        inputLetter.disabled = true;
    }
    usedLetters.textContent = "Letras jogadas: " + cacheL.join(', ');
    
}

function reset() {
    playWord = [];
    jogadas = 5;
    playLetters = 0;
    cacheL = [];
    
    usedLetters.textContent = "Letras jogadas: " ;
    result.innerHTML = '';
    score.innerHTML = '';
    inputLetter.disabled = false;
    image.style.background = imagesArr[5];
    init();
}

newGameBtn.addEventListener('click', reset);
playBtn.addEventListener('click', play)

init();