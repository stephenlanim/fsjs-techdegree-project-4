/*jshint esversion: 6 */
// ============================================
//   Application Execution
// ============================================

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This file gets the game started.

  It houses functions to manage the start screen,
  creates a new instance of the Game class,
  adds event listeners for the play button and onscreen keyboard.


Add an event listener to the "Start Game" button which calls the resetDisplay() function, creates a new Game object, and starts the game.
Add event listeners to each of the keyboard buttons, so that clicking a button calls the markButton() function.
NOTE: Keyboard functionality

Only the keys of the onscreen keyboard should be clickable. Clicking the space between and around the keys should not trigger the click event.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Global Variables
const $startScreen = $('#overlay'); // start-screen overlay
const $playBtn = $('#btn__reset'); // play button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phraseBoard = $('#phrase ul'); // on-screen phrase board
const $tries = $('.tries img'); //hearts

// Class Initiations
const game = new Game();
const phrase = new Phrase();

// Hides the start screen overlay
function resetDisplay(){
  // Hide start screen overlay
    $startScreen.hide('clip');

}

// Function to disable and mark the on-screen keyboard and call the Game.handleInteraction() method
function markButton(key){
  // If input is a button on the on-screen keyboard...
  if (key.tagName === 'BUTTON') {
    console.log(key.tagName);
    // show clicked key as "chosen"
    $(key).addClass('chosen')
      // disable clicked key
      .attr('disabled', true);
    // Process input
    game.handleInteraction(phrase, key.textContent);
  }
  // If input comes from user pressing keyboard letter...
  else if ((key) => {/[a-z]/.test(key)}) {
    console.log('press');
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

    // Process user input/interaction
    game.handleInteraction(phrase, key);
  }

}

// Clear overlay screen
function clearScreen() {
  // reset start screen
  $startScreen.removeClass('start win lose');

  // remove win or lose message if present
  $startScreen.find('h3').remove();
}

// -------------------------------------
//   Event Handlers
// -------------------------------------

// When start button is clicked...
$playBtn.on('click', ()=> {

  // If play button is a start button...
  if ($('#btn__reset').text() === 'Start Game') {

    resetDisplay();
    game.startGame();
  }
  // If play button is a reset button...
  if ($playBtn.text() === 'Play Again') {
    // remove phrase
    $phraseBoard.children().remove();

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

}); // end of $playBtn event handler

// When on-screen keyboard is clicked...
$keyboard.on('click', (e) => {
  const key = e.target;
  markButton(key);
});

// When user keyboard is press...
$(document).on('keypress', (e) =>{
  const key = e.key;
  markButton(key);
});
