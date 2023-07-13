var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;


$(document).keydown(function () {
    if (level==0) {
        $("h1").text("Level "+ level);
        nextSequence();
    } });

$(".btn").click(function (event) {
        if (level == 0) {
            gameOver();
        } else {
            var userChosenColour = event.target.id;
            userClickedPattern.push(userChosenColour);
            console.log("userpattern",userClickedPattern);
            playAudio(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length - 1); // very important
        }
    }
)
function nextSequence () {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random()*4); // gives random number between 0 and 3
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("gamepattern",gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playAudio(randomChosenColour);
}

function playAudio(color) {
    if (color == "green") {
        var audio1 = new Audio("sounds/green.mp3");
        audio1.play();
    } else if (color == "red") {
        var audio1 = new Audio("sounds/red.mp3");
        audio1.play();
    } else if (color == "yellow") {
        var audio1 = new Audio("sounds/yellow.mp3");
        audio1.play();
    } else if (color == "blue") {
        var audio1 = new Audio("sounds/blue.mp3");
        audio1.play();
    } else if (color == "wrong") {
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
    }
}


function gameOver () {
    $("h1").text("Game Over, Press Any Key to Restart")
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over"), 200
    })  
}


function animatePress(currentColour) {
    var activeButton = $("."+currentColour)
    activeButton.addClass("pressed");
    setTimeout(function() {activeButton.removeClass("pressed")}, 100)
}

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
        console.log("wrong!"); 
        level = 0;
        gamePattern =[];

    }  
    } 