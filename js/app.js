//contains the list of cards

let cardList= ["diamond", "paper-plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
let clickedCards = [];
let matches = [];
let moves = 0;
let time = 0;
let clockTimer;
let cOff = true;
let complete = 0;
const win = 8;



const deck = document.querySelector('.deck');
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleCards(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffleDeck = shuffle(cardsToShuffle);
  for(card of shuffleDeck){
    deck.append(card);
  }
}
shuffleCards();

function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */






//stores the card clicked

deck.addEventListener('click', flipF);
//flips the card
function flipF(event){

const flip = event.target;

if(flip.classList.contains('card') && !flip.classList.contains('match') &&
clickedCards.length < 2 && !clickedCards.includes(flip)){

  show();
  clickedCards.push(flip);
  matches.push(flip);
  if(cOff ===true){
    timer();
    cOff=false;
}

  if(clickedCards.length === 2){
    matchCards(flip);
    countMove();
    score();

}
  }

  //function to flip cards
  function show (card){
    flip.classList.toggle('open');
    flip.classList.toggle('show');
  }
//compare cards
  function matchCards(){
    if(clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className){
      clickedCards[0].classList.toggle('match');
      clickedCards[1].classList.toggle('match');
      clickedCards = [];
      complete++;
      console.log('match');
      if(complete === win){
        gameOver();
      }

    }
    else{
      setTimeout(function hideCards(){
        clickedCards[0].classList.toggle('open');
        clickedCards[0].classList.toggle('show');
        clickedCards[1].classList.toggle('open');
        clickedCards[1].classList.toggle('show');
        clickedCards = [];

      }, 600);
    }
  }
}
//check the score/ removing the star
  function score(){
    if(moves === 12 || moves === 18){
      starRating();
    }
  }

//function to remove the star
  function starRating(){
    const stars = document.querySelector('.stars');
    const star = 	'<li><i class="fa fa-star"></i></li>';

  if(moves <12){
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  if(moves < 18){
    stars.innerHTML ='<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  else {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
  }
}

//counts the number of moves
function countMove(){
  moves++;
  const movesCounter = document.querySelector('.moves');
  movesCounter.innerHTML = moves;
}

function timer(){
    clockTimer = setInterval(function(){
        time++;
        showTime();
    }, 1000);
}
//stops the timer
function stopTimer(){
  clearInterval(clockTimer);

}
//resets the clock
function resetClock(){
  time =0;
  stopTimer();
  showTime();
}

function showTime(){
      const clock = document.querySelector('.clock');
      const minutes = Math.floor(time/60);
      const seconds = time% 60;
      if(seconds<10){
        clock.innerHTML = `${minutes}:0${seconds}`;
      }
      else{
        clock.innerHTML = `${minutes}:${seconds}`;
      }
    }

function modalOn(){
  const modal = document.querySelector('.background');
  modal.classList.toggle('hide');
}

function modalStats(){
  const gameTime = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesnum = document.querySelector('.modal_moves');
  const starsnum = document.querySelector('.modal_stars');
  const starsF = document.querySelector('.stars').innerHTML;


  gameTime.innerHTML = `Time : ${clockTime}`;
  movesnum.innerHTML = `Moves: ${moves}`;
  starsnum.innerHTML = `Stars: ${starsF}`;
}

function resetStar(){
stars=0;
const starList = document.querySelectorAll('stars li');
for(star of starList){
  star.style.display = 'inline';
}
  }

function resetMoves(){
  moves =0;
  document.querySelector('.moves').innerHTML = moves;
}
function resetCards(){
  const cards =document.querySelectorAll('.deck li');
  for(let card of cards){
    card.className ='card';
  }
}

function reset(){
  resetClock();
  resetMoves();
  resetStar();
  resetCards();
  shuffleCards();

}

function gameOver(){
  stopTimer();
  modalStats();
  modalOn();
}

document.querySelector('.restart').addEventListener('click', reset);

document.querySelector('.close').addEventListener("click", modalOn);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
