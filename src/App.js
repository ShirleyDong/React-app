import React from 'react';
import './App.css' 
import _ from 'lodash';
import Recipes from  './Data';

import { Link } from 'react-router';


    var SelectBox = React.createClass({
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
      render: function(){
          return (
                <div className="col-md-10">
               <input type="text" placeholder="Search" 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
                    Sort by:
                  <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                       <option value="name">Alphabetical</option>
                       <option value="age">Newest</option>
                     </select>
             </div>
               );
          }
       });


       var FilteredRecipeList = React.createClass({
            render: function(){
                var displayedRecipes = this.props.Recipe.map(function(recipe) {
                  return <RecipeItem key={recipe.id} recipe={Recipes} /> ;
                }) ;
                return (
                        <div className="col-md-10">
                          <ul className="recipes">
                              {displayedRecipes}
                          </ul>
                        </div>
                  ) ;
            }
        });

       var RecipeItem = React.createClass({
          render: function(){
            return (
              <li className="thumbnail recipe-listing">
                <Link to={'/recipes/' + this.props.recipe.id} className="thumb">
                     <img src={"/recipeSpecs/" + this.props.recipe.imageUrl} 
                         alt={this.props.recipe.name} /> </Link>
                <Link to={'/recipes/' + this.props.recipe.id}> {this.props.recipe.name}</Link>
                <p>{this.props.recipe.snippet}</p>
              </li>
                ) ;

             }
         }) ;


    var RecipeApp = React.createClass({
      render: function(){
        var list = Recipes.filter(function(p) {
                  return p.name.toLowerCase().search(
                         this.state.search.toLowerCase() ) !== -1 ;
                    }.bind(this) );
        var filteredList = _.sortBy(list, this.state.sort) ;
          return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
                             filterText={this.state.search} 
                             sort={this.state.sort} />
                       <FilteredRecipeList recipes={filteredList} />
                  </div> 
                  </div>                   
                </div>
              </div>
          );
      }
    });

    export default RecipeApp;