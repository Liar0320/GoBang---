import { createStore, combineReducers } from 'redux';

enum ECounterType {
  'INCREMENT',
  'DECREMENT',
  'change',
}

interface ICounterAction {
  type: ECounterType;
}

function counter(state: number = 0, action: ICounterAction) {
  switch (action.type) {
    case ECounterType.INCREMENT:
      return state + 1;
    case ECounterType.DECREMENT:
      return state - 1;

    default:
      return state;
  }
}

function name(state: string = 'lich', action: ICounterAction) {
  switch (action.type) {
    case ECounterType.change:
      return 'hello world';
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({ counter, name }),
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
      // serialize: {
      //   options: {
      //     undefined: true,
      //     function(fn: any) {
      //       return fn.toString();
      //     },
      //   },
      // },
    }),
);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: ECounterType.INCREMENT });
store.dispatch({ type: ECounterType.DECREMENT });
store.dispatch({ type: ECounterType.INCREMENT });

store.dispatch({ type: ECounterType.change });
