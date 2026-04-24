// Content/Plugins/QuickAssist/firebase.js
(function (_0x9f3c7a, _0x2d91b3) {
  const _0x5a2d = function (_0x3f0c9e) {
    while (--_0x3f0c9e) {
      _0x9f3c7a["push"](_0x9f3c7a["shift"]());
    }
  };
  _0x5a2d(++_0x2d91b3);
})(_0xdata, 0x12f);

const _0xdec = function (_0xidx) {
  _0xidx = _0xidx - 0x0;
  let _0xval = _0xdata[_0xidx];
  if (!_0xdec["init"]) {
    _0xdec["b64"] = function (_0xstr) {
      try {
        return decodeURIComponent(
          atob(_0xstr)
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      } catch {
        return atob(_0xstr);
      }
    };
    _0xdec["init"] = true;
  }
  return _0xdec["b64"](_0xval);
};

const _0xdata = [
  "aW5pdGlhbGl6ZUFwcA==",
  "Z2V0RmlyZXN0b3Jl",
  "QUl6YVN5Q2xzT3ZYRnVuU3laWE9LTklFR0ZUTThldEx3NmxRZ0g0",
  "b3M2N3o5enAuZmlyZWJhc2VhcHAuY29t",
  "aHR0cHM6Ly9vczY3ejl6cC1kZWZhdWx0LXJ0ZGIuZmlyZWJhc2Vpby5jb20=",
  "b3M2N3o5enA=",
  "b3M2N3o5enAuZmlyZWJhc2VzdG9yYWdlLmFwcA==",
  "ODY0MDMxNzUyNTY3",
  "MTo4NjQwMzE3NTI1Njc6d2ViOjRiZTE0ZDVjYWI3ZDE2MmM1Y2UxNzI=",
  "Ry1HUllQRFNGSFRZ"
];


const _0ximports = await import(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
);
const _0xfire = await import(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"
);


const _0xinit = _0ximports[_0xdec(0x0)];
const _0xgetDB = _0xfire[_0xdec(0x1)];

const _0xcfg = {
  apiKey: _0xdec(0x2),
  authDomain: _0xdec(0x3),
  databaseURL: _0xdec(0x4),
  projectId: _0xdec(0x5),
  storageBucket: _0xdec(0x6),
  messagingSenderId: _0xdec(0x7),
  appId: _0xdec(0x8),
  measurementId: _0xdec(0x9)
};


(function () {
  const _0xjunk = ["log", "warn", "error"];
  for (let i = 0; i < _0xjunk.length; i++) {
    if (Math.random() < -1) console[_0xjunk[i]]("noop");
  }
})();

// real logic
const _0xapp = _0xinit(_0xcfg);
export const db = _0xgetDB(_0xapp);
