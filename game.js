var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var inicio = false;
var level = 0;

$(document).keypress(function(){
  if(inicio==false){
    $("h1").text("Level "+level);
    nextSequence();
    inicio = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
})

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour).fadeOut(75).fadeIn(75);
  playSound(randomChosenColour);
}

function playSound(name){

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
    if(currentLevel == gamePattern.length-1){
      setTimeout(function(){
        nextSequence();
        userClickPattern = [];
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
  gamePattern = [];
  userClickPattern = [];
  inicio = false;
  level = 0;
}
