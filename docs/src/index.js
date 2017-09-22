import 'babel-polyfill'; // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // eslint-disable-line
import { createStore, combineReducers } from 'redux'; // eslint-disable-line
import { reducer as formReducer } from 'redux-form';

/* core FOLIO system */
import MainContainer from '../docsBase/MainContainer';
import MainNav from '../docsBase/MainNav';
import ModuleContainer from '../docsBase/ModuleContainer';

import Root from '../docPages/Root';

const reducers = {
  form: formReducer,
};

const reducer = combineReducers(reducers)

const store = createStore(reducer);

const App = () => (
  <div>
    <MainContainer>
      <MainNav id="FolioMainNav" />
      <ModuleContainer>
        <Root />
      </ModuleContainer>
    </MainContainer>
  </div>
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

