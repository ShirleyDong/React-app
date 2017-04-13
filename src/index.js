import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCatalogueApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import RecipeDetail from './recipeDetail';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

var App = React.createClass({
  render : function() {
    return (
      <div>
        <h1>My Recipe </h1>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render( (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
       <IndexRoute component={RecipeCatalogueApp}/>
       <Route path="recipes/:id" component={RecipeDetail} />
    </Route>
  </Router>
),
  document.getElementById('root')
);

