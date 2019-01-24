class Phrase {

  // Adds letter placeholders to the display when the game starts
  addPhraseToDisplay(arr){
    // Loop through each character in phrase array
    for (let i = 0; i < arr.length; i += 1) {
      const character = arr[i];

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
      $('#phrase ul').append(li);
    };
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
      // Note: Returning null via an else statement produces a bug in which the value returned is always null unless the player chose the very last letter in the phrase. This is because the loop checks the player's chosen letter against all letters in the phrase and only returns to very last value in the loop. Adding a console.log() before each return statement in the if and else statements reveals the nature of this issue.
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

        // store matching letter inside response
        // response = $letter;
        // return response;
      }
      // Note: Returning null via an else statement produces a bug in which the value returned is always null unless the player chose the very last letter in the phrase. This is because the loop checks the player's chosen letter against all letters in the phrase and only returns to very last value in the loop. Adding a console.log() before each return statement in the if and else statements reveals the nature of this issue.
    }); // End of $letters.each()

  }
} // end of Phrase class
