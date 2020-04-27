
var userClickedPattern = [];
var gamePattern = [];
var buttonColorsArray = ["green","red","yellow","blue"];
var started = false;
var level = 0;

$(".a").hide();

$("h1").click(function(){
  $("h1").text("Level "+level);
  if (started === false) {
    started = true;
    $('#level-title').css('margin-top', '5%');
    $(".a").show();
    nextSequence();
  }
});


$(".btn").click(function(){
  var userInput = this.id;
  if (userInput === "green") {
    $(".green").addClass("pressed");
  } else if (userInput === "red") {
    $(".red").addClass("pressed");
  } else if (userInput === "yellow") {
    $(".yellow").addClass("pressed");
  } else if (userInput === "blue") {
    $(".blue").addClass("pressed");
  }

  var audio = new Audio("sounds/"+userInput+".mp3");
  audio.play();

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  setTimeout(function(){
    $(".btn").removeClass("pressed");
  },100);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentlevel){
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("sucsess");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");
    var audio3 = new Audio("sounds/wrong.mp3");
    audio3.play();
    $("body").css("background-color","red");
    setTimeout(function () {
      $("body").css("background-color","#011F3F");
    }, 300);

    $("h1").text("Game Over Press Here to start again");
    $("h1").append("<h6> You made it to Level <h6>"+level);

    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);

  var num = Math.floor(Math.random()*4);
  var randColor = buttonColorsArray[num];
  gamePattern.push(randColor);

  $("#" + randColor).fadeOut(100).fadeIn(100);
  var audio2 = new Audio("sounds/"+randColor+".mp3");
  audio2.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
