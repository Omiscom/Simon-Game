

// $(".btn").click(function () {
//     const audio = new Audio("sounds/blue.mp3")
//     audio.play(); 
// })

// document.querySelector(".green").addEventListener("click", function () {
//     const audio = new Audio("sounds/blue.mp3")
//     audio.play(); 
// })

var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    // $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // $("#"+userChosenColour).addClass("pressed")
    animatedPress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct!")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong!");
        playsound("wrong")
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
};
function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatedPress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}

$(document).keypress(function (event) {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }

