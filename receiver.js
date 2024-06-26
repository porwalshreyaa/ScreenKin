// Resources : https://www.videosdk.live/developer-hub/webrtc/webrtc-screen-sharing
// MDN Docs : https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
function loadReceiver() {

  const configuration = {};

  (async() => {
    const response = await fetch('/.netlify/functions/getTurnCredentials');
    const iceServers = await response.json();
    configuration.iceServers = iceServers
  })();
  
  const peerConnection = new RTCPeerConnection(configuration);

// const configuration = {
//     iceServers: [
//       { urls: 'turn:turn02.hubl.in?transport=tcp' }
//     ]
//   };
// const peerConnection = new RTCPeerConnection(configuration);
const offerElem = document.getElementById("offerReceiver");
const answerElem = document.getElementById("answerReceiver");
const iceCandidatesElem = document.getElementById("iceCandidatesReceiver");
const senderIceCandidatesElem = document.getElementById("senderIceCandidatesReceiver");
const videoElem = document.getElementById("videoReceiver");
const logElem = document.getElementById("log");

// function log(msg){
//   logElem.textContent += msg + '\n';
// }
peerConnection.ontrack = event => {
  videoElem.srcObject = event.streams[0];
};

peerConnection.onicecandidate = event => {
  if (event.candidate) {
    iceCandidatesElem.value += JSON.stringify(event.candidate) +'\n';

  }
};

offerElem.addEventListener("input", async () => {
  const offer = JSON.parse(offerElem.value);
  if (offer && offer.type === 'offer') {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    answerElem.value = JSON.stringify(answer);
  }
})

senderIceCandidatesElem.addEventListener("input", async () => {
  const candidateLines = senderIceCandidatesElem.value.split('\n');
  for (const line of candidateLines) {
    if (line) {
      const candidate = JSON.parse(line);
      await peerConnection.addIceCandidate(candidate);
    }
  }
});

// console.log = msg => (logElem.textContent = `${logElem.textContent}\n${msg}`);
// console.error = msg => {logElem.textContent = `${logElem.textContent}\nError: ${msg}`}
}
