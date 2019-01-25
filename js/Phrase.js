/*jshint esversion: 6 */
// ============================================
//   Phrase Class
// ============================================

class Phrase {
  constructor(phrase){
    this.phraseArr = phrase;
  }

  // Adds letter placeholders to the display when the game starts
  addPhraseToDisplay(){
    // Loop through each character in phrase array
    for (let i = 0; i < this.phraseArr.length; i += 1) {
      const character = this.phraseArr[i];

      // Create a list item
      const li = document.createElement('li');

      // Put array character inside list item
      li.textContent = character;

      // If character is a space...
      if (li.textContent === ' ') {

        // add class "space" to list item
        li.className = 'space';
      }
      else {
        // add class "letter" to list item
        li.className = 'letter';
      }

      // Append character to phrase board
      $phraseBoard.append(li);
    }
  }

  // Checks if letter selected by player matches a letter in the phrase
  checkLetter(key){
    // variable to be returned
    let response = null;
    // Note: Default value is null so that returned value is null unless the player selects a valid letter.

    // Get every letter in phrase
    const $letters = $('.letter');

    // Loop through each letter
    $letters.each( function (index, letter){
      const $letter = $(letter).text().toLowerCase();
      // If letter matches clicked button
      if ($letter === key.toLowerCase()) {

        // store matching letter inside response
        response = $letter;
        // return response;
      }

    }); // End of $letters.each()

    // return value of chosen letter
    return response;
  }

  // Reveals the letter(s) on the board that matches player's selection
  showMatchedLetter(letterFound){

    // Get every letter in phrase
    const $letters = $('.letter');

    // Loop through each letter
    $letters.each( function (index, letter){
      const $letter = $(letter).text().toLowerCase();
      // If letter matches clicked button
      if ($letter === letterFound) {

        // add "show" class to letter
        $(letter).addClass('show');

      }

    }); // End of $letters.each()

  }
} // end of Phrase class
