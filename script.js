
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var started = false;
var level = 0;

function startGame(){
    start = true;
    setTimeout(() => {nextSequence()}, 500);
    $("#start-game").hide();
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    palySound(randomChosenColour);
}

$(".btn").click(function (event){
    // var userChosenColour = this.id;
    if(start){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        palySound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
})

function palySound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {$("#"+currentColour).removeClass("pressed");}, 100);
}

$(document).keypress(function(e){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        start = true;
        started = true;
    }
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {nextSequence()}, 1000);
        }
    }else{
        palySound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over<br> Level "+level);
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern= [];
    start = false;
    started = false;
    $("#start-game").show();
}