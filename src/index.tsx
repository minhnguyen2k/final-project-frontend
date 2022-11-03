import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HistoryRouter as ConnectedRouter } from 'redux-first-history/rr6';
import App from './App';
import { history, persistor, store } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
