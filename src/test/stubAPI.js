import _ from 'lodash';

var posts = null ;
if ( localStorage.getItem('posts') ) {
     posts = JSON.parse(localStorage.getItem('posts')) ;
     localStorage.setItem('updated',false ) ;
} else { 
    posts = [
     {  id: 1 ,
        title : 'India - Tiger population sees 30% increase.',
        link : 'http://www.bbc.com/news/world-asia-30896028',
        username : 'jbloggs',
        comments : [],
        upvotes : 10
      },
     { 
        id: 2,
        title : 'The button that is not.',
        link : 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
        username : 'notme',
        comments : [],
        upvotes : 12
      },
      { 
        id: 3,
        title : 'Google Nears $1B Investment in SpaceX',
        link : null,
        username : 'notme',
        comments : [],
        upvotes : 12
      },
      { 
        id: 4,
        title : 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
        link : 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
        username : 'psmith',  
        comments : [],
        upvotes : 2
      }
  ] ;
  localStorage.setItem('posts', JSON.stringify(posts)) ;
  localStorage.setItem('updated', false ) ;
}
 
 var stubAPI = {
     getAll : function() {
        return posts ;
      },
     add : function(t,l) {
          var id = 1 ;
          var last = _.last(posts) ;
          if (last) {
             id = last.id + 1 ;
          }
          var len = posts.length ;
          var newL_len = posts.push({ 
          	'id': id,  
             title: t, link : l, username: '', comments: [], upvotes: 0 }) ;
           localStorage.setItem('updated', true ) ;
           return newL_len > len ;
          },
     upvote : function(id) {
         var index = _.findIndex(posts, 
         	  function(post) {
                return post.id === id;
              } );   
         if (index !== -1) {                 
              posts[index].upvotes += 1 ;
              localStorage.setItem('updated', true ) ;
              return true ;
            }
          return false ;
       },
     getPost : function(id) {
         var result = null ;
         var index = _.findIndex(posts, function(post) {
                return post.id === id;
                } );     
         if (index !== -1) {                 
            result = posts[index];
                }
        return result ;
        },
     addComment : function(postId,c,n) {
        var post = this.getPost(postId ) ;
        var id = 1 ;
        var last = _.last(post.comments) ;
        if (last) {
           id = last.id + 1 ;
        }
        post.comments.push({ 'id': id,  
                 comment: c , author: n, upvotes: 0 } ) ;
        localStorage.setItem('updated', true ) ;
        },
     upvoteComment : function(postId,commentId) {
        var post = this.getPost(postId ) ;
        var index = _.findIndex(post.comments, function(c) {
                  return c.id === commentId;
                } );  
         if (index !== -1) {                 
             post.comments[index].upvotes += 1 ;
             localStorage.setItem('updated', true ) ;
            }

      },
      persist: function() {
        if (localStorage.getItem('updated') === 'true') { 
          localStorage.setItem('updated',false ) ;
          localStorage.setItem('posts', JSON.stringify(posts)) ;
        }
      }
  }
export default stubAPI ;