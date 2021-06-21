# ![Store Track Logo](logo.svg) Store Track

The simple Redux-like state manager

💎 **Type safe**. TypeScript support out of box.

⚙️ **Framework agnostic**. Can work with any UI or server framework.

💻️ **Developer-friendly**. Simple API.

⚡️ **Maximum performance**. Static initialization provides boost in performance for runtime.

📦️ **Size**. No dependencies.

## Examples

```js
import { createStore } from 'store-track';

function counterReducer(state, action) {
    if (action.type === 'add') return state + action.value;
    if (action.type === 'sub') return state - action.value;
    if (action.type === 'reset') return 0;
    return state;
}

const counter = createStore(counterReducer, 0);

counter.subscribe(n => console.log('counter:', n));
// counter: 0

counter.dispatch({ type: 'add', value: 10 });
// counter: 10
counter.dispatch({ type: 'sub', value: 5 });
// counter: 5
counter.dispatch({ type: 'reset' });
// counter: 0
```

## Install

```sh
npm install --save store-track
# or
yarn add store-track
```

## Core Concepts

### Store

_Store_ is an object that holds state value.

```ts
// Create new store.
const store = createStore(
    // Declaring reducers and business logic
    (state, action) => action.type === 'add'
        ? { count: state.count + action.value }
        : state,
    // Initial state
    { count: 0 }
);
```

* `.getState()` – Returns current state of store.
* `.dispatch(action, data)` – Calls a reducer with the appropriate `action` and the `data` passed to it.
* `.subscribe(handler)` – Call `handler` function each time when store is updated. 

## React

### Hook

```ts
import { useEffect, useState } from 'react';
import { Action, Store } from 'store-track';

export function useStoreTrack<S, A extends Action>(store: Store<S, A>): S {
    const [, forceRender] = useReducer((s: number) => s + 1, 0);

    useEffect(() => store.subscribe(forceRender), [store]);

    return state;
}
```

## Inspiration

* [**Effector**](https://effector.dev/) – The state manager
* [**Redux**](https://redux.js.org/) – A Predictable State Container for JS Apps
* [**Storeon**](https://github.com/storeon/storeon) – Tiny (185 bytes) event-based Redux-like state manager for React and Preact

## License

[**MIT License**](LICENSE)
