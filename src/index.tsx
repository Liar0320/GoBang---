import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import rootReducer from './store';

const store = createStore(
  rootReducer,
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

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#🐍'),
);
