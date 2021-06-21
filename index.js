exports.createStore = function createStore(reducer, initialState) {
    let state = initialState;
    let subscriptions = [];

    return {
        getState: () => state,
        subscribe(listener) {
            subscriptions.push(listener);

            return () => subscriptions.splice(subscriptions.indexOf(listener) >>> 0, 1);
        },
        dispatch(action) {
            state = reducer(state, action);
            subscriptions.forEach(cb => cb());
        }
    };
};
