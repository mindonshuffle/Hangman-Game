//----Variable Defitions----

var wordList = ['mocha', 'cafe', 'filter', 'thermos', 'espresso', 'latte', 
				'frappe', 'barista', 'roaster', 'beans', 'coffee', 'caffeine', 
				'grinds', 'black', 'press', 'drip', 'cuppa'];
				
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var wins = 0;
var losses = 0;
var guesses = '';
var remaining = 6;
var currentWord = '';
var currentSolved = [];

//----function definitions----

function initialize(){
	// randomly assigns a word from wordList to currentWord and resets other counters

	currentWord = wordList[Math.floor(Math.random() * wordList.length)];
	guesses = '';
	remaining = 9;

	for( i=0; i < currentWord.length; i++){
		currentSolved[i] = '_';
	}

	//console.log(currentSolved);
	console.log(currentWord);
	
	printScreen();
}

function printScreen(){

	//converts currentSolved array to String for Display
	var currentSolvedString = '';
	for( i = 0; i < currentWord.length; i++ ){
		currentSolvedString = currentSolvedString + currentSolved[i] + ' ';
	}

	console.log(currentSolved);

	document.getElementById('hangmanSVG').src = 'assets/images/hangman' +remaining+ '.svg';

	document.getElementById('currentWordID').innerHTML = currentSolvedString;
	document.getElementById('guessesID').textContent = 'Guesses:  ' +guesses;
	document.getElementById('remainingID').innerHTML = 'Remaining:  ' +remaining;
	document.getElementById('winsID').innerHTML = wins;
	document.getElementById('lossesID').innerHTML = losses;
}


// ---- Main Game Logic ----

initialize();

	//When key pressed, begin checking the values

document.onkeyup = function(event) {
	//console.log(event.key);

	if(currentWord===''){
		initialize();
		return;
	}

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
				//adds current guess to currentSolved array
					
				//convert currentSolved array to checkSolvedString string
					var checkSolvedString = '';
					for( i = 0; i < currentWord.length; i++ ){
						checkSolvedString = checkSolvedString + currentSolved[i];
					}

					if(checkSolvedString === currentWord){
					//check for win
						wins ++;
						printScreen();
						document.getElementById('remainingID').textContent = 'You Win! Press Any Key to Restart!';
						currentWord = '';

		//***adds "You Win" banner
					}

					else{
					//otherwise adds current guess to list

						guesses = guesses +' ' +currentGuess;
						printScreen();
					}

				} else if (remaining === 1) {
				//checks for loss

					remaining --;
					losses ++;

		//***add "Game Over" banner
					printScreen();
					document.getElementById('remainingID').textContent = 'You Lose! Press Any Key to Restart!';
					currentWord = '';

				}

			else
			{	
			//otherwise adds current guess to list and decreases remaining

				guesses = guesses +' ' +currentGuess;
				remaining--;
				printScreen();
			}
		}
	}

