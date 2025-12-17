# @judekim0507/statekit-server

this is the **server** package. see full docs at [stateKit](https://github.com/judekim0507/stateKit).

## install

```sh
npm install @judekim0507/statekit-server
```

## usage

```js
import { stateKit } from "@judekim0507/statekit-server";

const state = stateKit({ moneyRaised: 0 });

state.moneyRaised = 500; // clients update instantly
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
