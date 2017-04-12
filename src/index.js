import React from 'react';
import ReactDOM from 'react-dom';
import RecipeApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Recipes from  './Data';

    ReactDOM.render(
      <RecipeApp recipes={Recipes}/>,
      document.getElementById('root')
    );
