/*jshint esversion: 6 */
// ============================================
//   Application Execution
// ============================================

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  This file gets the game started.

  It houses functions to manage the start screen,
  creates a new instance of the Game class,
  adds event listeners for the play button and onscreen keyboard.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Global Variables
const $startScreen = $('#overlay'); // start-screen overlay
const $playBtn = $('#btn__reset'); // play button
const $keyboard = $('#qwerty'); // on-screen keybaord
const $phraseBoard = $('#phrase ul'); // on-screen phrase board
const $tries = $('.tries img'); //hearts

// Game Class Initialization
const game = new Game();

// Hides the start screen overlay
function resetDisplay(){
  // Hide start screen overlay
    $startScreen.hide('clip');

}

// Function to disable and mark the on-screen keyboard and call the Game.handleInteraction() method
function markButton(key){

    // Loop through on-screen keyboard buttons
    $('.key').each((i, button) => {

      // If button matches user input...
      if ($(button).text().toLowerCase() === key){

        // show clicked key as "chosen"
        $(button).addClass('chosen')
          // disable clicked key
          .attr('disabled', true);
      }
    }); // end of $('.key').each() loop

    // Process user input/interaction
    game.handleInteraction(key);

} // end of markButton()

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
  // If input is a button on the on-screen keyboard (i.e. not a space between buttons)...
  if (key.tagName === 'BUTTON') {

    markButton(key.textContent);
  }

});

// When user keyboard is press...
$(document).on('keypress', (e) =>{
  const key = e.key;
  // If player presses a letter on their keyboard...
  if ((key) => {/[a-z]/.test(key)}) {

    markButton(key);
  }
});
