
/*
This file creates a new instance of the Game class, adds event listeners for the onscreen keyboard and a function to display the game:


Add an event listener to the "Start Game" button which calls the resetDisplay() function, creates a new Game object, and starts the game.
Add event listeners to each of the keyboard buttons, so that clicking a button calls the markButton() function.
NOTE: Keyboard functionality

Only the keys of the onscreen keyboard should be clickable. Clicking the space between and around the keys should not trigger the click event.

*/

const $startScreen = $('#overlay'); // start-screen overlay
const $playBtn = $('#btn__reset'); // play button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phrase = $('#phrase ul'); // on-screen phrase board
const $tries = $('.tries img'); //hearts

const game = new Game();
const phrase = new Phrase();

// Hides the start screen overlay
function resetDisplay(){
  // Hide start screen overlay
    $('#overlay').hide('clip');

}

// this function is called when a player selects a letter. It disables the button on the onscreen keyboard and calls the handleInteraction() method of the Game class.
function markButton(key){
  // If input is a button on the on-screen keyboard...
  if (key.tagName === 'BUTTON') {
    // show clicked key as "chosen"
    $(key).addClass('chosen')
      // disable clicked key
      .attr('disabled', true);
    // Process input
    game.handleInteraction(phrase, key.textContent);
  }
  // If input comes from user pressing keyboard letter...
  else if ((key) => {/[a-z]/.test(key)}) {

    // Loop through on-screen keyboard buttons
    $('.key').each((i, button) => {
      // If button matches user input...
      if ($(button).text().toLowerCase() === key){
        // show clicked key as "chosen"
        $(button).addClass('chosen')
          // disable clicked key
          .attr('disabled', true);
      }
    });

    // Process input
    game.handleInteraction(phrase, key);
  }

}

// Clear overlay screen
function clearScreen() {
  // reset start screen
  $('#overlay').removeClass('start win lose');

  // remove win or lose message if present
  $('#overlay').find('h3').remove();
}

// When start button is clicked...
$('#btn__reset').on('click', ()=> {

  // If play button is a start button...
  if ($('#btn__reset').text() === 'Start Game') {

    resetDisplay();
    game.startGame();
  }
  // If play button is a reset button...
  if ($playBtn.text() === 'Play Again') {
    // remove phrase
    $phrase.children().remove();

    // reset keyboard
      // remove "chosen" class
      $keyboard.find('button').removeClass('chosen')
      // remove disabled attribute
      .attr('disabled', false);

    // reset hearts
    $tries.attr('src', 'images/liveHeart.png');

    // reset missed
    game.missed = 0;

    resetDisplay();
    game.startGame();

  }

});

// When on-screen keyboard is clicked...
$('#qwerty').on('click', (e) => {
  const key = e.target;
  markButton(key);
});

// When user keyboard is press...
$(document).on('keypress', (e) =>{
  const key = e.key;
  markButton(key);
});
