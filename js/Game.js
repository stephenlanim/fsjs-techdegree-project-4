/*jshint esversion: 6 */
// ============================================
//   Game Class
// ============================================

class Game {
  constructor(){
    this.missed = 0;
    this.phrases = [
      'Twitter Bootstrap',
      'ZURB Foundation',
      'Semantic UI',
      'Materialize',
      'Angular JS',
      'React',
      'Vue',
      'Backbone',
      'Ember',
      'Laravel',
      'Node JS',
      'Django',
      'Ruby on Rails',
      'ASP NET',
      'Express',
      'Flask'
    ];
  }

  // Randomly retrieves one of the phrases stored in the phrases array
  getRandomPhrase(){
    // Randomly choose phrase from array
    let phraseQty = this.phrases.length;
    let phrasePosition = Math.floor(Math.random() *  phraseQty);
    let selectedPhrase = this.phrases[phrasePosition];

    // Split phrase array into a new array of characters
    let splitPhrase = selectedPhrase.split('');

    // Return new character array
    return splitPhrase;
  }

  // Check if the button clicked by the player matches a letter in the phrase
  handleInteraction(key){
    const letterFound = this.phrase.checkLetter(key);
    // If it does not, then call the removeLife() method..
    if (letterFound === null){
      this.removeLife();
    }
    // If the selected letter matches, call the showMatchedLetter() method on the phrase and then call the checkForWin() method.
    else if (letterFound) {
      this.phrase.showMatchedLetter(letterFound);
      this.checkForWin();
    }
  } // end of handleInteraction()

  // Removes a life, removes a heart from the board, and, if the player is out of lives, ends the game.
  removeLife(){
    // remove one live heart (by replacing it with a lost heart)
    $tries.eq(this.missed).attr('src', 'images/lostHeart.png');
    // add to count of player's missed guesses
    this.missed += 1;

    // If player used up all tries/hearts
    if (this.missed === $tries.length) {
      // Clear screen before displaying end-of-game message
      clearScreen();

      // Display Lose screen and Reset button
      this.gameOver('lose');

    }
  } // end of removeLife()

  // Checks to see if the player has selected all of the letters
  checkForWin(){
    // Get every letter in phrase
    const $allPhraseLetters = $('.letter').length;
    // Get every letter the player found
    const $foundLetters = $('.show').length;

    // If all phrase letters have been found...
    if ($foundLetters === $allPhraseLetters) {
      // Clear screen before displaying end-of-game message
      clearScreen();

      // Display Win screen and Reset button
      this.gameOver('win');

    }

  } // end of checkForWin()

  // Displays a win or lose message based on the player's performance as indicated on call
  gameOver(condition){
    // Win message
    const winMessage = document.createElement('h3');
    winMessage.textContent = "Congratulations! You won!";

    // Lose message
    const loseMessage = document.createElement('h3');
    loseMessage.textContent = "Sorry. You lost.";

    // If player has won...
    if (condition === 'win'){
      // show "win" screen
      $startScreen.addClass('win').delay(400).show('clip');

      // display "win" message after title
      $('.title').after(winMessage);

      // change start button to reset button
      $playBtn.text('Play Again');
    }
    // If player has lost...
    else if (condition === 'lose'){
      // show "win" screen
      $startScreen.addClass('lose').delay(400).show('clip');

      // display "win" message after title
      $('.title').after(loseMessage);

      // change start button to reset button
      $playBtn.text('Play Again');
    }

  }

  // Calls the getRandomPhrase() method, and adds that phrase to the board by calling the Phrase class' addPhraseToDisplay() method
  startGame(){
    this.phrase = new Phrase(game.getRandomPhrase());
    this.phrase.addPhraseToDisplay();

  }
} // end of Game class
