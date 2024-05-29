// Resources : https://www.videosdk.live/developer-hub/webrtc/webrtc-screen-sharing
// MDN Docs : https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture

function loadSender() {
  const configuration = {};

  (async() => {
    // const response = await fetch(`https://screenkin.metered.live/api/v1/turn/credentials?apiKey=${API_KEY}`);
    const response = await fetch('/.netlify/functions/getTurnCredentials');
    const iceServers = await response.json();
    configuration.iceServers = iceServers
  })();
  
  const peerConnection = new RTCPeerConnection(configuration);
const answerElem = document.getElementById("answerSender");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const iceCandidatesElem = document.getElementById("iceCandidatesSender");
const offerElem = document.getElementById("offer");

let stream;
// function log(msg) {
//   logElem.textContent += msg + '\n';
// }
async function captureScreen() {
  // logElem.innerHTML = "";
  const displayMediaOptions = {
    video: {
      displaySurface: "window",
      cursor: "always"
    },
    audio: false,
  };
  startElem.disabled = true;
  stopElem.disabled = false;
  startElem.classList.toggle('bg-green-300');
  startElem.classList.toggle('bg-green-600');
  stopElem.classList.toggle('bg-red-300');
  stopElem.classList.toggle('bg-red-600');
  stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  return stream;
}

async function addStreamToPeerConnection() {
  const stream = await captureScreen();
  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
  videoElem.srcObject = stream;  // Display the stream in the video element
}

peerConnection.onicecandidate = event => {
  if (event.candidate) {
    iceCandidatesElem.value += JSON.stringify(event.candidate) + '\n';
  }
};

async function createAndSendOffer() {
  await addStreamToPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  offerElem.value = JSON.stringify(offer);
  console.log(JSON.stringify(offer))
}

startElem.addEventListener("click", createAndSendOffer);

function stopCapture() {
  stream.getTracks().forEach(track => track.stop());
  startElem.disabled = false;
  stopElem.disabled = true;
  startElem.classList.toggle('bg-green-300');
  startElem.classList.toggle('bg-green-600');
  stopElem.classList.toggle('bg-red-300');
  stopElem.classList.toggle('bg-red-600');
}

stopElem.addEventListener(
  "click", () => {
    stopCapture();
  },
  false,
);

answerElem.addEventListener("input", async () =>{
  const answer = JSON.parse(answerElem.value);
  if (answer && answer.type === 'answer') {
    await peerConnection.setRemoteDescription(answer);
  }
});

iceCandidatesElem.addEventListener("input", async () => {
  const candidateLines = iceCandidatesElem.value.split('\n');
  for (const line of candidateLines) {
    if (line){
      const candidate = JSON.parse(line);
      await peerConnection.addIceCandidate(candidate);
    }
  }
});

// console.log = msg => (logElem.textContent = `${logElem.textContent}\n${msg}`);
// console.error = msg => (logElem.textContent = `${logElem.textContent}\nError: ${msg}`)


}
