import { WebSocketServer } from "ws";

export function stateKit(state, options = {}) {
  const port = options.port || 8080;
  const wss = new WebSocketServer({ port });

  const values = {};
  const subscribers = new Map();

  for (const key in state) {
    values[key] = state[key];
    subscribers.set(key, new Set());
  }

  wss.on("connection", (ws) => {
    const subscribedKeys = new Set();

    ws.on("message", (data) => {
      try {
        const msg = JSON.parse(data);

        if (msg.type === "subscribe" && msg.key in values) {
          subscribedKeys.add(msg.key);
          subscribers.get(msg.key).add(ws);
          ws.send(JSON.stringify({ key: msg.key, value: values[msg.key] }));
        }

        if (msg.type === "unsubscribe" && subscribers.has(msg.key)) {
          subscribedKeys.delete(msg.key);
          subscribers.get(msg.key).delete(ws);
        }
      } catch (e) {}
    });

    ws.on("close", () => {
      for (const key of subscribedKeys) {
        subscribers.get(key)?.delete(ws);
      }
    });
  });

  return new Proxy(values, {
    set(target, key, value) {
      if (!(key in target)) {
        subscribers.set(key, new Set());
      }
      target[key] = value;

      const clients = subscribers.get(key);
      if (clients) {
        const msg = JSON.stringify({ key, value });
        for (const ws of clients) {
          if (ws.readyState === 1) { // OPEN
            ws.send(msg);
          }
        }
      }
      return true;
    },
    get(target, key) {
      return target[key];
    }
  });
}

export default stateKit;
