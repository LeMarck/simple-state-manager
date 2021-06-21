const { createStore } = require('./index');

it('should be created storage', () => {
    const store = createStore(() => 0, 0);
    expect(Object.keys(store).sort()).toEqual(['dispatch', 'getState', 'subscribe']);
});

function reducer(state, action) {
    if (action.type === 'SET') return state + action.value;
    return state;
}

it('`.getState` should return the current state', () => {
    const store = createStore(reducer, 0);
    expect(store.getState()).toEqual(0);

    store.dispatch({ type: 'SET', value: 10 });
    expect(store.getState()).toEqual(10);
});

it('`.subscribe` must subscribe to state change events', () => {
    const store = createStore(reducer, 0);
    const onChangeState = jest.fn();
    const unsubscribe = store.subscribe(onChangeState);

    store.dispatch({ type: 'SET', value: 10 });
    expect(onChangeState).toBeCalledTimes(1);

    unsubscribe();

    store.dispatch({ type: 'SET', value: 100 });
    expect(onChangeState).toBeCalledTimes(1);
});

it('`.dispatch` should call the action', () => {
    const setState = jest.fn();
    const store = createStore(setState, 0);

    store.dispatch({ type: 'SET', value: 10 });

    expect(setState).toBeCalledTimes(1);
    expect(setState).toBeCalledWith(0, { type: 'SET', value: 10 });
});
