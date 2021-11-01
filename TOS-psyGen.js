/* TOWN OF SALEM PSYCHIC VISION GENERATOR */
// ...for claiming with a fake will...

/* This program will generate random unique numbers from 1 through 15, excluding the user's number.
The user runs the program with an input of their own number.
The user will be prompted to choose 'evil' or 'good' for generating 3 or 2 numbers, respectively.
The user will have the option of redrawing numbers after the results are displayed.
Instead of redrawing, the user may move on to a new vision.
Aside from a vision, the user may enter a number to be excluded from visions.
If a number was excluded by mistake, the user can enter that number again to undo that */

// GLOBAL VARIABLES
const prompt = require('prompt-sync')({sigint: true}); // prompt-sync function
const lines = process.stdout.getWindowSize()[1]; // for clearing screen
const playerNum = Number(process.argv[2]); // the player's number from command line
let visionOutput = [];
let currentType = 'e'; // for redrawing vision of same type
let deadNums = [playerNum]; // for excluding numbers from visions

/* FUNCTIONS */
// RANDOM NUMBER FUNCTION
// for generating visions
const randos = (amount) => { // AMOUNT = 2 for good || 3 for evil
    let i = visionOutput.length; 
    while (i < amount) {
        let num = (Math.ceil(Math.random() * 15)); // RANDOM number
        // Generated number validation process
        if (num != playerNum // Failsafe for excluding yourself from visions
            && !visionOutput.includes(num) // Prevents duplicate numbers in vision
            && !deadNums.includes(num)) { // Explicitly excluded numbers
                visionOutput.push(num); // Push to vision after validation
                i++;
        } else {
            randos();
        }
    } 
};

// DEAD NUMBER VALIDATION FUNCTION
// for removing duplicate numbers from the deadNums array
// and adding unique numbers to the deadNums array
const numValid = (number) => {
    if (deadNums.length >= 12) {
        throw new Error('T O O   M A N Y   D E A D !   >:(');
    } else if (deadNums.includes(number)) {
        return false; // Number for exclusion is a duplicate
    } else if (!deadNums.includes(number)) {
        return true; // Number is unique
    }
};
    
// MAIN PROMPT
// for calling the randos function with the right argument for vision type
// and for adding/removing dead players
const vision = (type) => {

    // GOOD VISION
    if (type === 'good' || type === 'g') {
        currentType = 'g';
        randos(2);
        console.log('\nGood Vision...', visionOutput);
        visionOutput = [];
        
        // Reusable prompt
        console.log('\nPress enter to redraw, or you may enter another vision type...\nOr enter a number to remove them from future visions... ')
        visionType = prompt('>> ');
        vision(visionType.toLowerCase());

    // EVIL VISION
    } else if (type === 'evil' || type === 'e') {
        currentType = 'e';
        randos(3);
        console.log('\nEvil Vision...', visionOutput);
        visionOutput = [];

        // Reusable prompt
        console.log('\nPress enter to redraw, or you may enter another vision type...\nOr enter a number to remove them from future visions... ')
        visionType = prompt('>> ');
        vision(visionType.toLowerCase());

    // HANDLING DEAD PLAYERS
    /* When a valid player number is entered, it will populate a deadNums array */
    } else if ((Number(type) >= 1 && Number(type) <= 15)) {
    
        // call validation functions
        if (numValid(Number(type)) === true) { 
            deadNums.push(Number(type)); // If number is unique, add it
        
        } else if (numValid(Number(type)) === false) {
            for (let i = 0; i < deadNums.length; i++) {
                if (deadNums[i] === Number(type)) {
                    deadNums.splice(i, 1) // If number is a duplicate, remove it
                }
            }
            deadNums.sort(function(a, b){return a-b});
        };

        // output the excluded nuymbers
        deadNums.sort(function(a, b){return a-b}); // Sorts the deadNums array in ascending order
        console.log('\nExcluded Numbers:')
        console.log(deadNums, '\n');

        // Reusable prompt
        console.log('Press enter to redraw, or you may enter another vision type...\nOr enter a number to remove them from future visions... ')
        visionType = prompt('>> ');
        vision(visionType.toLowerCase());
        
    // PRESSING ENTER
    // redraws numbers
    } else if (type === '' && (currentType === 'g' || currentType === 'e')) {
        vision(currentType);

    // EXITING
    } else if (type.toLowerCase() === 'exit' || type.toLowerCase() === 'x') {
        process.exitCode = 1;
        
    // IMPROPER SELECTION
    } else {
        visionType = prompt('Specify a vision type, or dead player>> ');
        vision(visionType.toLowerCase());
    }
};

/* END FUNCTIONS */

/* RUN the program */
// clear the screen
for(var i = 0; i < lines; i++) {
    console.log('\r\n');
}
// print title
console.log('+++++++= TOWN OF SALEM =+++++++' + '\n' + '-{fake psychic will generator}-' + '\n\n')
// print user number
console.log('Blessed be, ' + typeof(playerNum) + ' ' + playerNum + '...\n');
console.log('\INSTRUCTIONS: Type EVIL or GOOD to recieve a vision.\nYou may also enter a number to be excluded from visions -\nenter that number again to undo it.\n')
// prompt user for vision type
visionType = prompt('Vision or Number? >> ');
vision(visionType.toLowerCase());

/*THIS SPACE INTENTIONALLY LEFT BLANK // DO NOT WRITE BELOW THIS LINE */
//
//
//
//
//
//
//
//
/* OK */