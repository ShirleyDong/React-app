import React from 'react';
import request from 'superagent' ; 
import _ from 'lodash';
import api from './test/stubAPI';

var Specification = React.createClass({
	 getInitialState: function() {
       return { comment: '', name: ''};
    },
    handleCommentChange: function(e) {
         this.setState({comment : e.target.value});
     },
     handleNameChange: function(e) {
         this.setState({name: e.target.value});
     },
     onSubmit : function(e) {
          e.preventDefault();
          var comment = this.state.comment.trim();
          var name = this.state.name.trim();
          if (!comment ) {
              return;
          }
          this.props.commentHandler(comment ,name );
          this.setState({comment: '', name: ''});
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
				      <dt>Add a new comment</dt>
				      <dd>
            <div className="form-group">
              <input type="text"  className="form-control"
                    placeholder="Comment" value={this.state.comment}
                    onChange={this.handleCommentChange} ></input>
            </div>     
            <div className="form-group">
              <input type="text"  className="form-control"
                    placeholder="Your name" value={this.state.name}
                    onChange={this.handleNameChange} ></input>
            </div>
            <button type="submit" className="btn btn-primary"
                    onClick={this.onSubmit}>Submit</button>
                    </dd>
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
	var Comment = React.createClass({
    handleVote : function() {
         this.props.upvoteHandler(this.props.comment.id);
    },
    render : function() {
        var lineStyle = {
             fontSize: '20px', marginLeft: '10px'  };
        return (
           <div>
              <span className="glyphicon glyphicon-thumbs-up"
                    onClick={this.handleVote}></span>
                {this.props.comment.upvotes} - by {this.props.comment.author}
              <span style={lineStyle} >
                {this.props.comment.comment}
              </span>
            </div>                
           );
      }
 }) ;

var CommentList = React.createClass({
    render : function() {
      var items = this.props.comments.map(function(comment,index) {
             return <Comment key={index} comment={comment} 
                      upvoteHandler={this.props.upvoteHandler}  /> ;
         }.bind(this) )
      return (
            <div>
              {items}
            </div>
        );
    }
}) ;  

var CommentView = React.createClass({ 
    componentWillUnmount: function() {
        api.persist() ;
    },
    addComment : function(c,n) {
      var pid = parseInt( this.props.params.postId, 10);
      api.addComment(pid,c,n);
      this.setState({});
  }, 
  incrementUpvote : function(commentId) {
  	   var pid = parseInt( this.props.params.postId, 10);
       api.upvoteComment(pid,commentId) ;
       this.setState({});
  },    
  render: function(){
  	   var pid = parseInt(this.props.params.postId,10) ;
       var post = api.getPost( pid);
       var line = null ;
       if (post.link ) {
           line = <a href={post.link} >
                        {post.title} </a> ;
        } else {
           line = <span>{post.title} </span> ;
        }
       var comments = _.sortBy(post.comments, function(comment) {
                             return - comment.upvotes;
                        }
                    ); 
       return (  
        <div >
          <h3>{line} </h3>
          <CommentList comments={comments} 
              upvoteHandler={this.incrementUpvote } />
          <Form post={post}  commentHandler={this.addComment} /> 
        </div>
      );
  }
});

export default RecipeDetail;