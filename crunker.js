let Crunker = require('crunker');

let audio = new Crunker();

audio
  .fetchAudio("/aze.wav", "/rty.wav")
  .then(buffers => audio.mergeAudio(buffers))
  .then(merged => audio.export(merged, "audio/mp3"))
  .then(output => audio.download(output.blob))
  .catch(error => {
    throw new Error(error);
  });