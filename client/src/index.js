// React Components
import React from 'react';
import ReactDOM from 'react-dom';

// Redux Components
import { Provider } from "react-redux";
import store from "./store";

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

// Components
import App from './app';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component></Component>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  });
}
