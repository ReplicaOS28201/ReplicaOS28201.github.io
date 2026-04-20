import { db } from "./firebase.js";
import { doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let pc = new RTCPeerConnection();

async function startShare() {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  document.getElementById("video").srcObject = stream;
  stream.getTracks().forEach(track => pc.addTrack(track, stream));
}

window.createSession = async function () {
  await startShare();

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  await setDoc(doc(db, "sessions", code), {
    offer: {
      sdp: offer.sdp,
      type: offer.type
    }
  });

  alert("Your code: " + code);

  onSnapshot(doc(db, "sessions", code), async (snap) => {
    const data = snap.data();
    if (data.answer && !pc.currentRemoteDescription) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  });
};

window.joinSession = async function () {
  const code = document.getElementById("codeInput").value;
  const session = await getDoc(doc(db, "sessions", code));

  if (!session.exists()) {
    alert("Invalid code");
    return;
  }

  pc.ontrack = (event) => {
    document.getElementById("video").srcObject = event.streams[0];
  };

  await pc.setRemoteDescription(new RTCSessionDescription(session.data().offer));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  await setDoc(doc(db, "sessions", code), {
    ...session.data(),
    answer: {
      type: answer.type,
      sdp: answer.sdp
    }
  });
};
