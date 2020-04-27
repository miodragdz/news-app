import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import './styles/App.css';

import PageNotFoundView from './views/pageNotFound';
import CategoriesPageView from './views/categories';
import CategoryPageView from './views/category';
import TopNewsPageView from './views/topNews';
import ArticlePageView from './views/article';
import SearchPageView from './views/search';

const App = props => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/topNews" component={TopNewsPageView} />
            <Route exact path="/categories" component={CategoriesPageView} />
            <Route
              exact
              path="/categories/:category"
              component={CategoryPageView}
            />
            <Route
              exact
              path="/categories/:category/article"
              component={ArticlePageView}
            />
            <Route exact path="/:page/article" component={ArticlePageView} />
            <Route path="/search" component={SearchPageView} />
            <Redirect exact from="/" to="/topNews" />
            <Route path="*" component={PageNotFoundView} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
