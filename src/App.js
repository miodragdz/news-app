import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import './styles/App.css';

// import CareerLadderTheme from './styles/theme';

import PageNotFoundView from './views/pageNotFound';
import CategoriesPageView from './views/categories';
import TopNewsPageView from './views/topNews';
// import SearchPageView from './views/search';

const App = props => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      {/* <MuiThemeProvider theme={CareerLadderTheme}> */}
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={TopNewsPageView} />
            <Route exact path="/categories" component={CategoriesPageView} />
            <Route
              exact
              path="/categories/:category"
              component={TopNewsPageView}
            />
            {/* <Route path="/search" component={SearchPageView} /> */}
            <Route path="*" component={PageNotFoundView} />
          </Switch>
        </div>
      </ConnectedRouter>
      {/* </MuiThemeProvider> */}
    </Provider>
  );
};

export default App;
