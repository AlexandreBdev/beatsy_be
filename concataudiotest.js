var audioconcat = require('audioconcat')
 
var songs = [
  './aze.wav',
  './rty.wav',
]
 
audioconcat(songs)
  .concat('all.mp3')
  .on('start', function (command) {
      console.log('#a')
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.log('#b')
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.log('#c')
    console.error('Audio created in:', output)
  })


  // https://www.npmjs.com/package/audioconcat#api