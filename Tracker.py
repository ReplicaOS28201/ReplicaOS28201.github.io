import time
import random
import uuid
from collections import deque

# =========================
# In-memory event system
# =========================

EVENTS = deque()
LOGS = []

def now():
    return time.strftime("%H:%M:%S")

def log(event_type, payload):
    EVENTS.append({
        "time": now(),
        "type": event_type,
        "payload": payload,
        "id": str(uuid.uuid4())[:8]
    })

# =========================
# Fake network layer
# =========================

class Packet:
    def __init__(self, user, data):
        self.id = str(uuid.uuid4())[:12]
        self.user = user
        self.data = data
        self.latency = random.uniform(0.2, 1.2)
        self.status = "PENDING"

class Server:
    def __init__(self):
        self.online = True
        self.sessions = {}

    def _delay(self):
        time.sleep(random.uniform(0.1, 0.4))

    def connect(self, user):
        pkt = Packet(user, "HANDSHAKE_INIT")
        self._delay()

        self.sessions[user] = {
            "session_id": str(uuid.uuid4())[:10],
            "status": "ACTIVE",
            "last_ping": now()
        }

        log("CONNECT", {
            "packet": pkt.id,
            "user": user,
            "session": self.sessions[user]["session_id"],
            "status": "OK"
        })

    def send(self, user, data):
        pkt = Packet(user, data)
        self._delay()

        jitter = random.choice(["OK", "DELAYED", "QUEUED"])
        pkt.status = jitter

        log("SEND", {
            "packet": pkt.id,
            "user": user,
            "data": data,
            "status": pkt.status,
            "latency": round(pkt.latency, 3)
        })

    def receive(self, user):
        self._delay()

        response = random.choice(["ACK", "SYNC_OK", "NOOP"])
        log("RECEIVE", {
            "user": user,
            "response": response,
            "session": self.sessions.get(user, {}).get("session_id")
        })

class Connect:
    server = Server()

# =========================
# Fake clients
# =========================

clients = ["denbec.. 0064 .. rsplus .. 0045 .. mayen.de"]

log("SYSTEM", {"event": "INIT", "target": "Connect.server", "status": "READY"})

# =========================
# Simulation loop
# =========================

for _ in range(8):
    user = random.choice(clients)

    Connect.server.connect(user)
    Connect.server.send(user, "SYNC_REQUEST::0x" + uuid.uuid4().hex[:6])
    Connect.server.receive(user)

    log("SESSION", {
        "user": user,
        "state": "STABLE",
        "health": random.randint(80, 100)
    })

    time.sleep(random.uniform(0.3, 1.0))
