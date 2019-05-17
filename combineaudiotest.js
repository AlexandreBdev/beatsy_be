var io = require('socket.io').listen(3000);
var exec = require('child_process').exec;

// var audio = new Audio('./aze.mp3');
// audio.play()
// console.log('audio', audio);

var firstFile = './aze.mp3';
console.log('firstFile', firstFile);
var secondFile = './rty.mp3';

var socket = io.connect('http://localhost:3000')
socket.emit('mergeFiles', { firstFile: firstFile, secondFile: secondFile });

io.sockets.on('connection', function (socket) {
  socket.on('mergeFiles', function (data) {
    var firstFile = data.firstFile;
    var secondFile = data.secondFile;

    //do ffmpg stuff by executing a shell script
    execString = "./yourscript.sh " + firstFile + " " + secondFile

    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec(execString , puts);
});
});
