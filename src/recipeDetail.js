import React from 'react';
import request from 'superagent' ; 

var Specification = React.createClass({
	  render: function(){
	  	  var recipe = this.props.recipe ;	  	   
          var display = (
              <div>
					<ul className="specs">
				  <li>
				    <span>Steps and material</span>
				    <dl>
				      <dt>Material</dt>
				      <dd>{recipe.storage.ram}</dd>
				      <dt>Steps</dt>
				      <dd>{recipe.storage.flash}</dd>
				    </dl>
				  </li>			  
				  </ul>            
            </div>
	       )
	  	  return (
	  	       <div>
                  {display}
              </div>
	         );
      }
  });

var ImagesSection = React.createClass({
	  render: function(){
	  	  var mainImage = (
          	    <div className="recipe-images">
				  <img src={"/recipeSpecs/" + this.props.recipe.images[0]} 
				        alt={this.props.recipe.name}
				        className="recipe" />
				</div>
                ) ;
	  	return (
	  		<div>
                   {mainImage}
			       <h1>{this.props.recipe.name}</h1>
		           <p>{this.props.recipe.description}</p>
               </div>
               );
	  }
})

var RecipeDetail = React.createClass({
	   getInitialState: function() {
           return { recipe: null };
       },
	 componentDidMount: function() {
	    request.get(
	         '/recipeSpecs/recipes/' + this.props.params.id + '.json', 
	           function(err, res) {
	         	   var json = JSON.parse(res.text);
			       this.setState({ recipe : json});
	             }.bind(this)
	         );
	  },
	  render: function(){
	      var display = <p>No recipe details</p> ; 
	  	  var recipe = this.state.recipe ;
          if (recipe) {
  			display =  (
  				<div>
              	   <ImagesSection recipe={recipe} />
              	   <Specification  recipe={recipe} />  	 
                </div>
                )
          }
	  	  return (
	  	  	    <div>
                  {display}
                </div>
	            );
	  }
	});

export default RecipeDetail;