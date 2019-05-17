(function () {
    'use strict';
  
    const URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3';
      
    const context = new AudioContext();
    const playButton = document.querySelector('#play');
      
    let yodelBuffer;
  
    window.fetch(URL)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        playButton.disabled = false;
        yodelBuffer = audioBuffer;
      });
      
      playButton.onclick = () => play(yodelBuffer);
  
    function play(audioBuffer) {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }
  }());