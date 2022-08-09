const randomWords = require('random-word')
const inquirer = require('inquirer')

//
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

async function splitLetters(word) {
    let letters = [];
    for(let i=0; i<word.length; i++) {
        letters.push(word.charAt(i));
    };
    return letters
}

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


async function main () {
    console.clear();
    console.log("Welcome to Hangman!");
    const word = randomWords()
    console.log('This is just for developing reference. The word is ' + word)
    const letters = await splitLetters(word);
    console.log(letters)
    console.log("Please guess the word. (One letter at a time). There are " + word.length + " letters.");

    let condition = true
    let attempts = 7;
    let guessed = []
    while(attempts>0 && condition){
        const answer = await getAnswer();
        if(guessed.length===word.length) {
            //     console.log(guessed)
            console.log('You won!')
            break;
        }
        else if (word.match(answer)) {
            console.clear();
            drawHangman(attempts);
            // guessed.push(answer);
            console.log('Correct!')
            for(let i=0; i<word.length; i++) {
                if(answer === word[i]) {
                    guessed[i] = answer;
                    console.log(guessed)
                } else {
                    continue;
                }
            }
        } else {
            console.clear();
            console.log(guessed);
            console.log('Wrong')
            drawHangman(attempts);
            attempts = attempts-1;
            console.log('You have ' + attempts + ' attempts left.' )
            if(attempts === 0) {
                console.log('You have lost the game.')
            }
        }
    };
}

main()
