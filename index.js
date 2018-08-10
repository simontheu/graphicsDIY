var app = require('express')();//TESTx
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Timer = require('easytimer'); 
var jsonfile = require('jsonfile');

var timer = new Timer();


app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/media/bowls/clock.png', function(req, res) {
    res.sendFile(__dirname + '/media/bowls/clock.png');
});

app.get('/media/bowls/bowls-ident.png', function(req, res) {
    res.sendFile(__dirname + '/media/bowls/bowls-ident.png');
});

app.get('/media/full_time_lower_3rd.png', function(req, res) {
    res.sendFile(__dirname + '/media/full_time_lower_3rd.png');
});

app.get('/media/SaintsL3.png', function(req, res) {
    res.sendFile(__dirname + '/media/SaintsL3.png');
});

app.get('/media/ArmyL3.png', function(req, res) {
    res.sendFile(__dirname + '/media/ArmyL3.png');
});

app.get('/index_script.js', function(req, res) {
    res.sendFile(__dirname + '/index_script.js');
});

app.get('/updater_script.js', function(req, res) {
    res.sendFile(__dirname + '/updater_script.js');
});

app.get('/node_modules/easytimer/dist/easytimer.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/easytimer/dist/easytimer.min.js');
});

io.on('connection', function(socket){
    socket.on('animateClock', function(msg){
        console.log("Test index");
        io.emit('animateClock',  msg);
    });
    socket.on('animateIdent', function(msg){
        var graphicPlayers = Array();
        var matches = ["A","B","C","D"];
        var match = matches[msg-1];
        jsonfile.readFile("names.json", function(err, names) {
            names.forEach(element => {
                if (element.match == match) {
                    graphicPlayers.push(element);
                }
            });
            console.log(graphicPlayers);
            io.emit('animateIdent', graphicPlayers);//Only send valid names
            if (err) console.log(err); 
          })
    });
    socket.on('adjustScore', function(match, team, newScore){
        console.log("Test score adjust:" + match + ":" + team + ":" + newScore);
        io.emit('adjustScore', match, team, newScore);
    });

    socket.on('getNames', function(){
        jsonfile.readFile("names.json", function(err, names) {
            io.emit('gotNames', names);
            console.log(names);
            console.log(err); 
          })
    });
    socket.on('saveNames', function(msg){
        console.log("saveNames");
        jsonfile.writeFile("names.json", msg, function(err) {
            console.error(err);
        })
        io.emit('saveNames');
    })
    console.log('connection received');
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});