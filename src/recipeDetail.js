import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent' ; 

var Specification = React.createClass({
  getInitialState: function(){
    return {items: []};
  },
  updateItems: function(newItem){
    var allItems = this.state.items.concat([newItem]);
    this.setState({items: allItems});
  },
	
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

                  <div>
                    <h1>Comment</h1>
                    <CommentView/>


                  </div>

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
});


var CommentView = React.createClass({
    getInitialState:function(){
      return{
        comments:[]
      }
    },
    add: function(text){
      var arr = this.state.comments;
      arr.push(text);
      this.setState({comments: arr});
    },

    removeComment: function(i){
      console.log('Removing comments:'+i);
      //arr store the comment want to removed
      var arr = this.state.comments;
      arr.splice(i, 1);
      this.setState({comments: arr});

    },

    updateComment: function(newText, i){
      console.log('updating comments');
      var arr = this.state.comments;
      arr[i] = newText;
      this.setState({comments: arr});
    },

    eachComment: function(text,i){
      return(
        <CommentItem key={i} index={i} updateCommentText={this.updateComment} deleteFromView={this.removeComment}>
        {text}
        </CommentItem>
        );
    },



    render:function(){
      return(
        <div>
        <button onClick={this.add.bind(null,'default')} className="btn btn-info create">Add new</button>
        <div className = "board">
        {this.state.comments.map(this.eachComment)}
        </div>
        </div>



        );
    }
  });

var Votes = React.createClass({
  getInitialState: function() {
    return { votes: 0 }; 
  },
  upvote: function() {
    var newVotes = this.state.votes + 1;

    this.setState({
      votes: newVotes
    });
  },
  downvote: function() {
    var newVotes = this.state.votes - 1;

    this.setState({
      votes: newVotes
    });
  },
  render: function() {
    return (
      <div>
        <span className="glyphicon glyphicon-thumbs-up"
                    onClick={this.upvote}></span>
        <strong>{this.state.votes}</strong>
        <span className="glyphicon glyphicon-thumbs-down"
                    onClick={this.downvote}></span>
      </div>
    );
  }
});

  var CommentItem = React.createClass({
    getInitialState: function(){
      return{editing:false}
      
    },
    edit: function(){
      this.setState({editing: true});
    },
    delete: function(){
      console.log('Removing comments');
      this.props.deleteFromView(this.props.index);
    },
    save: function(){
      this.props.updateCommentText(this.refs.newText.value, this.props.index)
      this.setState({editing: false});
    },
    renderNormal: function(){
      return(
        <div class="container">
          <div class="panel panel-default">
          <div className="commentText">{this.props.children}</div>
          <div><Votes /></div>
        <button onClick={this.edit} className="btn btn-primary">Edit</button>
        <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </div>
        </div>

        );

    },

    renderForm: function(){
      return(
        <div class="container">
          <div class="panel panel-default">
          <textarea ref="newText" defaultValue={this.props.children}></textarea>
        <button onClick={this.save} className="btn btn-success">Save</button>
          </div>
        </div>
      );
      
    },

    render: function(){
      if(this.state.editing){
        return this.renderForm();
      }else{
        return this.renderNormal();
      }

    }
  });




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