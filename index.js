var app = require('express')();//TESTx
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Timer = require('easytimer'); 
var teams = require('./teams.json');

var timer = new Timer();

console.log(teams.away);

app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/updater', function(req, res){
    res.sendFile(__dirname + '/updater.html');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/media/clock_static.png', function(req, res) {
    res.sendFile(__dirname + '/media/clock_static.png');
});

app.get('/media/half_time_lower_3rd.png', function(req, res) {
    res.sendFile(__dirname + '/media/half_time_lower_3rd.png');
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
    socket.on('awayScore', function(msg){
      io.emit('awayScore',  msg);
    });
    socket.on('homeScore', function(msg){
        io.emit('homeScore', msg);
    });
    socket.on('clockAnim', function(msg){
        io.emit('clockAnim', msg);
    });
    socket.on('clockTime', function(msg){
        io.emit('clockTime', msg);
    });
    socket.on('timeAnnounce', function(msg){
        io.emit('timeAnnounce', msg);
    });
    socket.on('halfUpdate', function(msg){
        io.emit('halfUpdate', msg);
    });
    socket.on('halfAnnounce', function(msg){
        io.emit('halfAnnounce', msg);
    });
    socket.on('timeAdjust', function(msg){
        io.emit('timeAdjust', msg);
    });
    socket.on('homeScoreUpdate', function(msg){
        io.emit('homeScoreUpdate', msg);
    });
    socket.on('awayScoreUpdate', function(msg){
        io.emit('awayScoreUpdate', msg);
    });
    socket.on('lowerThirdScore', function(msg){
        io.emit('lowerThirdScore', msg);
    });
    socket.on('setLowerThirdScoreBackground', function(msg){
        io.emit('setLowerThirdScoreBackground', msg);
    });
    socket.on('lowerThirdScoreBackgroundAnnounce', function(msg){
        io.emit('lowerThirdScoreBackgroundAnnounce', msg);
    });
    socket.on('lowerThirdScoreOnAirAnnounce', function(msg){
        io.emit('lowerThirdScoreOnAirAnnounce', msg);
    });
    socket.on('clockOnAirAnnounce', function(msg){
        io.emit('clockOnAirAnnounce', msg);
    });
    socket.on('homeL3', function(msg){
        io.emit('homeL3', msg);
    });
    socket.on('awayL3', function(msg){
        io.emit('awayL3', msg);
    });
    socket.on('getTeams', function(){
        console.log(teams);
        io.emit('gotTeams', teams);
    })
    console.log('connection received');
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});