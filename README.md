# stateKit

stupid but simple af realtime state over WebSockets.

## what this is

stateKit lets a server expose some state and lets clients subscribe to it.

when the value changes on the server, clients update.
there's no event design, no protocol decisions, no extra concepts.

it's just state.

## why this exists

why not? a lot of realtime libraries assume you're building a platform.
sometimes you just want a value to change and the ui to react.

## install

```sh
npm install @judekim0507/statekit-server  # server
npm install @judekim0507/statekit-client  # client
```

## usage

### server

```js
import { stateKit } from "@judekim0507/statekit-server";

const state = stateKit({ moneyRaised: 0 });

state.moneyRaised = 500; // clients update instantly
```

### client (vanilla)

```js
import { live } from "@judekim0507/statekit-client";

live("moneyRaised", (value) => {
  document.getElementById("money").textContent = value;
});
```

### client (svelte 5)

```svelte
<script>
  import { live } from "@judekim0507/statekit-client/svelte";
  
  const moneyRaised = live("moneyRaised");
</script>

<p>{moneyRaised()} raised</p>
```

### client (react)

```jsx
import { live } from "@judekim0507/statekit-client";
import { useState, useEffect } from "react";

function App() {
  const [money, setMoney] = useState(0);
  
  useEffect(() => live("moneyRaised", setMoney), []);
  
  return <p>{money} raised</p>;
}
```

## what this is good for

- internal tools
- prototypes/mvp
- demos
- for fun

## what this is bad at

- auth
- permissions
- offline support
- multi-region scaling
- anything serious

if u need those this is not for u.

## license
MIT
do what you want.
