var socket = io();

socket.emit('getNames');

var score = [[0,0],[0,0],[0,0],[0,0]];//All match scores zeroed

//Outgoing updates to index 
function animateClock(match) { 
  //get initials from teams via match number
  socket.emit('animateClock',match, score, "XX/VV");
}

function setNames(matchNumber) { 
  var matches = ["A","B","C","D"];
  var players = ["A","B","C","D"];
  var namesExport = Array();
  matches.forEach(match => {
    players.forEach(player => {
      var elementID = "match" + match + "Player" + player;
      console.log(elementID);
      var name = document.getElementById(elementID).value;
      namesExport.push ({ "match" : match,
                          "player" : player,
                          "name" : name });
    })
  });
  console.log(namesExport);
  socket.emit("saveNames", namesExport)
}

function animateIdent(matchNumber) {
  console.log("animateIdent");
  socket.emit("animateIdent", matchNumber);
}

function adjustScore(match, team, adjustAmount) {
  console.log("adjustScore");
  score[match][team] = score[match][team] + adjustAmount;
  socket.emit("adjustScore", score);
  populateScoreBoxes();
}

function populateScoreBoxes() {
  var matches = ["A","B","C","D"];
  var teams = ["A","B"];
  for (i=0;i<4;i++) {
    for (j=0;j<2;j++) {
      var docElem = document.getElementById("scoreTextBoxMatch" + matches[i] + "Team" + teams[j]);
      docElem.value = score[i][j];
    }
  }
} 

socket.on('gotNames', function(msg){
  console.log(msg);
  //Set names from file
  var index = 1;
  msg.forEach(element => {
    var docElem = document.getElementById("match" + element.match + "Player" + element.player);
    docElem.value = element.name;
    console.log(element.element + ":" + element.name);
    index++;
  });

});