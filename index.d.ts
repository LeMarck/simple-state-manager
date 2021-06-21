export interface Action<T = unknown> {
    type: T
}

export type Reducer<S, A extends Action> = (state: S, action: Action) => S;

export type Dispatch<A extends Action> = <T extends A>(action: T) => void

export type Unsubscribe = () => void;

export interface Store<S, A extends Action> {
    getState: () => S;
    dispatch: Dispatch<A>;
    subscribe: (listener: () => void) => Unsubscribe;
}

export function createStore<S, A extends Action>(
    reducer: Reducer<S, A>,
    initialState: S
): Store<S, A>;
