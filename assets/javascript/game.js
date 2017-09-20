var wordList = ['doubleword']
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wins = 0;
var losses = 0;
var guesses = '';
var remaining = 6;
var currentWord = '';
var currentSolved = [];

initialize();

	//When key pressed, begin checking the values

document.onkeyup = function(event) {
	console.log(event.key);

	var currentGuess = event.key;
		//sets currentGuess to input letter

		if( alphabet.indexOf(currentGuess.toLowerCase()) > -1 && guesses.indexOf(currentGuess.toLowerCase()) === -1){
		//verifies currentGuess is alphabet character and not already guessed

		var checkGuess = currentWord.indexOf(currentGuess.toLowerCase());
		//locates currentGuess within currentWord

			if(checkGuess > -1){
			//successful check

				for( i = 0; i < currentWord.length; i++){
					if(currentWord[i] === currentGuess.toLowerCase()){
						currentSolved[i]=currentGuess;
					}
				}
				//currentSolved[currentWord.indexOf(currentGuess)] = currentGuess;
				//adds current guess to currentSolved array
					
				//convert currentSolved array to checkSolvedString string
					var checkSolvedString = '';
					for( i = 0; i < currentWord.length; i++ ){
						checkSolvedString = checkSolvedString + currentSolved[i];
					}

					
					//check for win
					if(checkSolvedString === currentWord){
						wins ++;
						initialize();
					}

					else{
						guesses = guesses +' ' +currentGuess;
						printScreen();
					}

				} else if (remaining === 1) {
					losses ++;
					initialize();
				}

				else
				{	
					guesses = guesses +' ' +currentGuess;
					remaining--;
					printScreen();
				}
			}
		}


		//function definitions

		function initialize(){
			// randomly assigns a word from wordList to currentWord and resets other counters

			currentWord = wordList[Math.floor(Math.random() * wordList.length)];
			guesses = '';
			remaining = 6;

			for( i=0; i < currentWord.length; i++){
				currentSolved[i] = '_';
			}

			console.log(currentSolved);
			console.log(currentWord);
			
			printScreen();
		}

		function printScreen(){

			//converts currentSolved array to String for Display
			var currentSolvedString = '';
			for( i = 0; i < currentWord.length; i++ ){
				currentSolvedString = currentSolvedString + currentSolved[i] + ' ';
			}

			document.getElementById('currentWordID').innerHTML = currentSolvedString;
			document.getElementById('guessesID').innerHTML = guesses;
			document.getElementById('remainingID').innerHTML = remaining;
			document.getElementById('winsID').innerHTML = wins;
			document.getElementById('lossesID').innerHTML = losses;
		}