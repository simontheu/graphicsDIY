//Initialise connecton to socket system
var socket = io();

socket.emit('getTeams',0);

var timer = new Timer();
var onAirMatch = -1;

socket.on('adjustScore', function(score, match){
  if (match == onAirMatch) { 
      document.getElementById("teamAScoreVal").textContent = score[match][0];
      document.getElementById("teamBScoreVal").textContent = score[match][1];    
  }
});

socket.on('animateClock', function(match, score, initials){
  //If in animate out, if out, change contents and animate in
  if (document.getElementById("scoreClockDiv").className == "rotateIn") {
    document.getElementById("scoreClockDiv").className = "rotateOut";
  } else {
    //Populate score and name initials for clock before animating
    document.getElementById("teamAInitialsVal").textContent =  initials[0];
    document.getElementById("teamBInitialsVal").textContent = initials[1];
    console.log(match);
    console.log(score[0]);
    document.getElementById("teamAScoreVal").textContent = score[match][0];
    document.getElementById("teamBScoreVal").textContent = score[match][1];
    onAirMatch = match;
    document.getElementById("scoreClockDiv").className = "rotateIn";
  }
});

socket.on('lowerThirdScore', function(msg){
  if (Number(msg) == 1) {
    document.getElementById("lowerThirdScoreDiv").className = "lowerThirdScoreIn";
    socket.emit("lowerThirdScoreOnAirAnnounce", 1);
  } else {
    document.getElementById("lowerThirdScoreDiv").className = "lowerThirdScoreOut";
    socket.emit("lowerThirdScoreOnAirAnnounce", 0);
  }
  
});

socket.on('setLowerThirdScoreBackground', function(msg){
  console.log("test...");

  if (Number(msg) == 1) {
    document.getElementById("lowerThirdScoreBackground").src = "/media/half_time_lower_3rd.png";
    socket.emit("lowerThirdScoreBackgroundAnnounce","/media/half_time_lower_3rd.png")
  } else {
    document.getElementById("lowerThirdScoreBackground").src = "/media/full_time_lower_3rd.png";
    socket.emit("lowerThirdScoreBackgroundAnnounce","/media/full_time_lower_3rd.png")
  }
  
});


socket.on('animateIdent', function(msg){
  console.log("monosodium glutomate" + msg);
  if (document.getElementById("lowerThirdIdentDiv").className == "lowerThirdScoreIn") {
    document.getElementById("lowerThirdIdentDiv").className = "lowerThirdScoreOut";
  } else {
    console.log("Send it in");//
    msg.forEach(player => {
      console.log("player:" + player.player);
      document.getElementById("lower3rdIdentPlayer" + player.player + "Val").textContent = player.name;
    });
    document.getElementById("lowerThirdIdentDiv").className = "lowerThirdScoreIn";
  }
});

socket.on('gotTeams', function(msg){
  console.log("got teams", msg);
  teams = msg;
});