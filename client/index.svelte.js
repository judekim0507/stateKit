import { live as _live, init } from "./index.js";

export { init };

export function live(key) {
  let current = $state(undefined);
  
  _live(key, (value) => {
    current = value;
  });
  
  return () => current;
}

export default live;
