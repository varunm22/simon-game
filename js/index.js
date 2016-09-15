var strict = false;
var counter = 0;
var sequence = [];
var seqCount = 0;
var playCount = 0;
var play = false;
var myTimers = [];
var playSequence;
var winSequence;
var green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var delay = 500;

function start() {
  counter = 0;
  sequence = [];
  var seqCount = 0;
  
  for (var i = 0; i < myTimers.length; i++) {
    clearTimeout(myTimers[i]);
  }
  clearInterval(playSequence);
  clearInterval(winSequence);
  $("#green").css("background-color", "#2a2");
  $("#red").css("background-color", "#a22");
  $("#blue").css("background-color", "#22a");
  $("#yellow").css("background-color", "#cb2");
  var timers = []; 
  runTurn (true);  
}

function runTurn (correct) {
  play = false;
  playCount = 0;
  if (correct) {
    sequence = sequence.concat(Math.floor(Math.random()*4));
    counter++;
    if (counter == 21) {
      gameWon();
      return;
    }
  }
  $("#counter").html(counter);
  seqCount = 0;
  delay = 500;
  playSequence = setInterval (function() {
    if (seqCount >= 4) {
      delay = 400;
    }
    if (seqCount >= 8) {
      delay = 300;
    }
    if (seqCount >= 12) {
      delay = 200;
    }
    if (sequence[seqCount]===0) {
      $("#green").css("background-color", "#4d4");
      green.play();
      myTimers.push(setTimeout(function() {$("#green").css("background-color", "#2a2");},delay));
    }
    else if (sequence[seqCount]==1) {
      $("#red").css("background-color", "#d44");
      red.play();
      myTimers.push(setTimeout(function() {$("#red").css("background-color", "#a22");},delay));
    }
    else if (sequence[seqCount]==2) {
      $("#blue").css("background-color", "#44d");
      blue.play();
      myTimers.push(setTimeout(function() {$("#blue").css("background-color", "#22a");},delay));
    }
    else {
      $("#yellow").css("background-color", "#fe4");
      yellow.play();
      myTimers.push(setTimeout(function() {$("#yellow").css("background-color", "#cb2");},delay));
    }
    seqCount++;
    if (seqCount == sequence.length) {
      clearInterval(playSequence);
    }
  }, 2*delay);
  myTimers.push(setTimeout(function () {play=true;}, sequence.length*2*delay+2*delay));
}

function press(num) {
  if (!play) {return;}
  if (num===0) {
    $("#green").css("background-color", "#4d4");
    green.play();
    myTimers.push(setTimeout(function() {$("#green").css("background-color", "#2a2");},200));
  }
  else if (num==1) {
    $("#red").css("background-color", "#d44");
    red.play();
    myTimers.push(setTimeout(function() {$("#red").css("background-color", "#a22");},200));
  }
  else if (num==2) {
    $("#blue").css("background-color", "#44d");
    blue.play();
    myTimers.push(setTimeout(function() {$("#blue").css("background-color", "#22a");},200));
  }
  else {
    $("#yellow").css("background-color", "#fe4");
    yellow.play();
    myTimers.push(setTimeout(function() {$("#yellow").css("background-color", "#cb2");},200));
  }
  if (num == sequence[playCount]) {
    playCount++;
    if (playCount == sequence.length) {
      runTurn(true);
    }
  } else {
    if (strict) {
      $("#counter").html("!!");
      myTimers.push(setTimeout(function () {$("#counter").html(counter); start();}, 500));
    } else {
      $("#counter").html("!!");
      myTimers.push(setTimeout(function () {$("#counter").html(counter); runTurn(false);}, 500));
    }
  }
}

function switchStrict() {
  if (strict) {
    strict = false;
    $("#light").css("background-color", "#400");
  } else {
    strict = true;
    $("#light").css("background-color", "red");
  }
}

function gameWon() {
  var flash = 0;
  for (var i = 0; i < myTimers.length; i++) {
    clearTimeout(myTimers[i]);
  }
  clearInterval(playSequence);
  winSequence = setInterval(function() {
    if (flash%2 === 0) {
      $("#green").css("background-color", "#4d4");
      $("#red").css("background-color", "#d44");
      $("#blue").css("background-color", "#44d");
      $("#yellow").css("background-color", "#fe4");
    } else {
      $("#green").css("background-color", "#2a2");
      $("#red").css("background-color", "#a22");
      $("#blue").css("background-color", "#22a");
      $("#yellow").css("background-color", "#cb2");
    }
    if (flash%4 === 0) {
      $("#counter").html("you");
    } else if (flash%4 == 2) {
      $("#counter").html("win");
    }
    if (flash==11) {
      clearInterval(winSequence);
    }
    flash++;
  },300);
}