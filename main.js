const Container = document.querySelector(".container");
let cards = [];
let card1 , card2;
let lockBoard= false;
let score  = 0;
const form = document.querySelector('form');
let tiempoRestante = 180;
const time = document.getElementById("starter");


form.addEventListener('submit',(e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd);
    const json = JSON.stringify(obj);
    localStorage.setItem('form', json);
    console.log(json);
})


fetch("./cards.json")
.then((response) => response.json())
.then((data) => {
    cards = [...data,...data];
    shuffleCards();
    generateCards();
});

function shuffleCards() {
    let index = cards.length,
    randomIndex,
    temp;
    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;
        temp = cards[index];
        cards[index] = cards[randomIndex];
        cards[randomIndex] = temp;
    }
}

function generateCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
      Container.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);

    }
  }
  

  function flipCard() {
    if (lockBoard) return;
    if (this === card1) return;
  
    this.classList.add("flipped");
  
    if (!card1) {
      card1 = this;
      return;
    }
  
    card2 = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;
    checkForMatch();
   
  }
  
  function checkForMatch() {
    let isMatch = card1.dataset.name === card2.dataset.name;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    card1 = null;
    card2 = null;
    lockBoard = false;
  }
  
  function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    Container.innerHTML = "";
    time.reload
    generateCards();
    startTimeragain();

       
  }

  function startTimeragain(){
    if (tiempoRestante==0){
        tiempoRestante=180;
        document.getElementById("tiempo").innerHTML = tiempoRestante;
        tiempoRestante--;
        setTimeout(startTimeragain,1000);

    }
  }


function timesup(){
    alert("Time's up! Your score is " + score);
    document.querySelector(".score").textContent = score;
    document.querySelector(".time").textContent = "Time's Up!";
    document.querySelector(".time").style.color = "red";
  }
  
function temporizador() {
    cuentaRegresiva = setInterval(() => {
      tiempoRestante--;
      timer.innerHTML = "Time: " + tiempoRestante;
      if (tiempoRestante == 0  ) {
        clearInterval(cuentaRegresiva);
        timesup();
      }
    }, 1000);
  }

  
  
  

  