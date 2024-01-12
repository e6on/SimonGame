// create a new array called buttonColours and set it to hold
// the sequence "red", "blue", "green", "yellow".
var buttonColours = ["red", "blue", "green", "yellow"];

// At the top of the game.js file, create a new
// empty array with the name userClickedPattern.
var userClickedPattern = [];

// create a new empty array called gamePattern.
var gamePattern = [];

// Create a new variable called level and start at level 0
var level = 0;

var started = false;

// Use jQuery to detect when a keyboard key has been pressed,
// when that happens for the first time, call nextSequence().
// You'll need a way to keep track of whether if the game has
// started or not, so you only call nextSequence() on the first keypress.
$(document).keypress(function () {
    if (!started) {

        // The h1 title starts out saying "Press A Key to Start",
        // when the game has started, change this to say "Level 0".
        // The h1 has a unique id of level-title which you can target with jQuery.
        $("#level-title").text("Level " + level);

        nextSequence();

        // You'll need a variable called started to toggle to true once
        // the game starts and if it's true, then further key presses
        // should not trigger nextSequence().
        started = true;
    }
});

// Use jQuery to detect when any of the buttons
// are clicked and trigger a handler function.
$(".btn").on("click", function () {

    // Inside the handler, create a new variable called userChosenColour
    // to store the id of the button that got clicked.
    // So if the Green button was clicked, userChosenColour
    // will equal its id which is "green".
    // Inside the handler, you can use the keyword this to refer
    // to the button object that triggered the click.
    var userChosenColor = $(this).attr("id");

    // Add the contents of the variable userChosenColour
    // to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);

    // when a user clicks on a button, the corresponding sound should be played.
    // e.g if the Green button is clicked, then green.mp3 should be played.
    playSound(userChosenColor);

    animatePress(userChosenColor);

    // Call checkAnswer() after a user has clicked and chosen their answer,
    // passing in the index of the last answer in the user's sequence.
    // e.g. If the user has pressed red, green, red, yellow,
    // the index of the last answer is 3.
    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern);
});

// Create a new function called checkAnswer(),
// it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if
    // the most recent user answer is the same as the game pattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // If the user got the most recent answer right, then check
        // that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        //In the sounds folder, there is a sound called wrong.mp3,
        // play this sound if the user got one of the answers wrong.
        playSound("wrong");

        // In the styles.css file, there is a class called "game-over",
        // apply this class to the body of the website when the user gets
        // one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart"
        // if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong
        startOver();
    }
}

// create a new function called nextSequence()
function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern
    // to an empty array ready for the next level.
    userClickedPattern = [];

    // Inside nextSequence(), increase the level by 1
    // every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    // You'll need to use jQuery again to change the h1 by targeting the id: level-title.
    $("#level-title").text("Level " + level);

    // generate a new random number between 0 and 3,
    // and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4); //0-3

    // Create a variable called randomChosenColour and use the randomNumber
    // to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];

    // Add the randomChosenColour generated to the end of the gamePattern.
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button with the same id as the randomChosenColour
    // and animate a flash to the button
    // Remember that to select ids with jQuery you need the "#" symbol.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // play the sound for the button colour selected
    playSound(randomChosenColour);

    console.log(randomChosenColour);
    console.log(gamePattern);
}

// Create a new function called playSound() that takes
// a single input parameter called name.
function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

// Create a new function called animatePress(),
// it should take a single input parameter called currentColour.
function animatePress(currentColour) {

    // Take a look inside the styles.css file, you can see there is a class
    // called "pressed", it will add a box shadow and changes the background
    // colour to grey.
    // Use jQuery to add this pressed class to the button
    // that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

    // use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(() => { $("#" + currentColour).removeClass("pressed"); }, 100);
}

// Create a new function called startOver()
function startOver() {
    // Inside this function, you'll need to reset
    // the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}