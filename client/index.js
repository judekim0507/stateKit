let ws = null;
let connected = false;
let url = "ws://localhost:8080";
const pending = [];
const subscriptions = new Map();
const values = new Map();

function connect() {
  ws = new WebSocket(url);
  
  ws.onopen = () => {
    connected = true;
    for (const msg of pending) ws.send(msg);
    pending.length = 0;
  };
  
  ws.onmessage = (event) => {
    try {
      const { key, value } = JSON.parse(event.data);
      values.set(key, value);
      const cbs = subscriptions.get(key);
      if (cbs) for (const cb of cbs) cb(value);
    } catch (e) {}
  };
  
  ws.onclose = () => {
    connected = false;
    setTimeout(connect, 1000);
  };
}

function send(msg) {
  const data = JSON.stringify(msg);
  if (connected && ws.readyState === 1) ws.send(data);
  else pending.push(data);
}

export function init(serverUrl) {
  url = serverUrl;
}

export function live(key, callback) {
  if (!ws) connect();
  
  if (!subscriptions.has(key)) {
    subscriptions.set(key, new Set());
    send({ type: "subscribe", key });
  }
  
  subscriptions.get(key).add(callback);
  
  // If we already have a value, call immediately
  if (values.has(key)) callback(values.get(key));
  
  // Return unsubscribe
  return () => subscriptions.get(key).delete(callback);
}

export default live;
