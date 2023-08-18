const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

console.log(audioContext);

const audioElement = document.querySelector("audio");

// grab the source from the element and pipe it into the context
const track = audioContext.createMediaElementSource(audioElement);

const playButton = document.querySelector("button");

// create gainNode with factory method of audioContext
const gainNode = audioContext.createGain();

// create pannerNode with constructor
// ** using factory method is more widely supported by browsers!
const panner = new StereoPannerNode(audioContext, {
  pan: 0,
});

// track is a mediaElement
track.connect(gainNode).connect(panner).connect(audioContext.destination);

const volumeControl = document.querySelector("#volume");
const volumeAmount = document.querySelector("#volume-amount");
volumeAmount.innerHTML = volumeControl.value;

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
    volumeAmount.innerHTML = volumeControl.value;
  },
  false
);

const pannerControl = document.querySelector("#panner");
const pannerAmount = document.querySelector("#panner-amount");
pannerAmount.innerHTML = pannerControl.value;

pannerControl.addEventListener("input", () => {
  panner.pan.value = pannerControl.value;
  pannerAmount.innerHTML = pannerControl.value;
});

playButton.addEventListener(
  "click",
  () => {
    console.log("audio context state", audioContext.state);

    // check if the conetxt in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  },
  false
);

// when audio is ended
audioElement.addEventListener("ended", () => {
  playButton.dataset.playing = "false";
});
