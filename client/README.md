# @judekim0507/statekit-client

this is the **client** package. see full docs at [stateKit](https://github.com/judekim0507/stateKit).

## install

```sh
npm install @judekim0507/statekit-client
```

## usage

### vanilla

```js
import { live } from "@judekim0507/statekit-client";

live("moneyRaised", (value) => {
  document.getElementById("money").textContent = value;
});
```

### svelte 5

```svelte
<script>
  import { live } from "@judekim0507/statekit-client/svelte";
  
  const moneyRaised = live("moneyRaised");
</script>

<p>{moneyRaised()} raised</p>
```

### react

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
