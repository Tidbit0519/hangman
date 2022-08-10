const randomWords = require('random-word')
const inquirer = require('inquirer')

/**
 * Hangman
 * A program that plays Hangman.
 * @author Jason Ban Tze Tan
 * @version 1.0
 */

/*The function to get user input
*/
async function getAnswer() {
    const answer = await inquirer
        .prompt([
            {
                message: 'Please enter your answer.',
                name: 'key',
                type: 'input',
                validation: async(input) => {
                    if (input.length > 1) {
                        console.log('Please answer with one letter at a time.')
                    }
                }
            }
        ])
    return answer.key;
}

/*The function to split the randomly generated word and return it as an array from by each letter.
@returns [letters]
*/

async function splitLetters(word) {
    let letters = [];
    for(let i=0; i<word.length; i++) {
        letters.push(word.charAt(i));
    };
    return letters
}

/*The function to that draws hangman depending on the number of attempts user has left.
@param counter
*/

function drawHangman(counter) {
        if(counter === 7) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      ')
            console.log('|     ')
            console.log('|     ')
            console.log('|____________')
        }else if(counter ===6) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     ')
            console.log('|     ')
            console.log('|____________')
        }else if(counter ===5) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     -')
            console.log('|     ')
            console.log('|____________')
        }else if(counter ===4) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     -|')
            console.log('|     ')
            console.log('|____________')
        }else if(counter ===3) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     -|-')
            console.log('|     ')
            console.log('|____________')
        }else if(counter ===2) {
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     -|-')
            console.log('|     /')
            console.log('|____________')
        }else{
            console.clear()
            console.log(' ____________')
            console.log('|      |')
            console.log('|      O')
            console.log('|     -|-')
            console.log('|     / \\')
            console.log('|____________')
    }
}

/*The main function that controls the flow of the program.
*/
async function main () {
    console.clear();
    console.log("Welcome to Hangman!");
    const word = randomWords()
    //For developing reference. Feel free to remove this line of code to play the game for real.
    console.log('This is just for developing reference. The word is ' + word)
    const letters = await splitLetters(word);
    //For developing reference. Feel free to remove this line of code to play the game for real.
    console.log(letters)
    console.log("Please guess the word. (One letter at a time). There are " + word.length + " letters.");
    
    
    let condition = true
    let attempts = 7;
    let guessed = []
    while(attempts>0 && condition){
        const answer = await getAnswer();
        //Ends the game if user guessed all the letters correctly.
        if(guessed.length===word.length) {
            console.log('You won!')
            break;
        }
        //Display the result of correctly guessed words.
        else if (word.match(answer)) {
            console.clear();
            drawHangman(attempts);
            console.log('Correct!')
            for(let i=0; i<word.length; i++) {
                if(answer === word[i]) {
                    guessed[i] = answer;
                    console.log(guessed)
                } else {
                    continue;
                }
            }
        //Shows the amount of user attempts left.
        } else {
            console.clear();
            console.log(guessed);
            console.log('Wrong')
            drawHangman(attempts);
            attempts = attempts-1;
            console.log('You have ' + attempts + ' attempts left.' )
            //Ends the game if user used up all attempts.
            if(attempts === 0) {
                console.log('You have lost the game.')
            }
        }
    };
}

main()
