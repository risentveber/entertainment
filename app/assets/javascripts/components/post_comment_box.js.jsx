const PostCommentBox = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    createComment: React.PropTypes.func.isRequired,
    removeComment: React.PropTypes.func.isRequired,
    comments: React.PropTypes.array,
    likeClick: React.PropTypes.func.isRequired,
    current_like: React.PropTypes.bool.isRequired,
    current_like_just: React.PropTypes.bool.isRequired,
    likes: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {
    var node = this.refs.ceditable.getDOMNode();
      $(node).emojiarea({
        buttonLabel: '&#9786;',
        buttonPosition: 'before',
      });
      $(node).next().next().on('keydown', this.handleKeyDown)
      $(node).next().next().attr("placeholder", "Ваш комментарий");
    // var node = this.refs.commentText.getDOMNode();
    // $(node).autoResize({
    //   limit:600,
    //   extraSpace:13,
    //   animate:true
    // });
    // $(node).on('keydown', this.handleKeyDown);
    // $(node).change();
  },
  componentWillUnmount: function() {
    // var node = this.refs.commentText.getDOMNode();
    // $(node).off('keydown', this.handleKeyDown);
  },
  handleKeyDown: function(e) {
    CI('keydown');
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      e.preventDefault();
      var node = this.refs.ceditable.getDOMNode();
      if (!node.value.trim()) return;
      if (currentUser)
        this.props.createComment(node.value);
      $(node).val('');
      $(node).next().next().html('');
    }
  },
  handleChange: function(event){
    this.setState({new_comment: event.target.value});
  },
  //END*****************************************************DECLARE
  render: function() {
    var likes_count = this.props.likes;
    var classname;
    if (likes_count == 0)
      likes_count = '';
    if (this.props.current_like){
      classname = 'post-like post-like-active';
      if (this.props.current_like_just)
        classname += ' post-like-active-animate';
    } else
      classname = 'post-like';
    return (
      <div>
        <div className='wrap-post-comments'>
          <div className='post-footer'>
            <div className='wrap-write-comment-post-footer'>
              <textarea
                ref='ceditable'
                onChange={this.handleChange} />
            </div>
            <div className='wrap-like-post-footer'>
              <span
                className={classname}
                onClick={this.props.likeClick}>
                {likes_count}
              </span>
            </div>
          </div>
          <div className='clearboth'>
          </div>
          <CommentList
            updateComment={this.props.updateComment}
            removeComment={this.props.removeComment}
            comments={this.props.comments}/>
        </div>
      </div>
    );
  }
})

// var ContentEditable = React.createClass({
//     render: function(){
//       return <div
//         ref='text'
//         onInput={this.emitChange}
//         onBlur={this.emitChange}
//         placeholder="Введите комментарий"
//         className='textarea-form-control-comment'
//         contentEditable
//         dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
//     },
//     componentDidMount: function(){
//       var node = this.refs.text.getDOMNode();
//       $(node).emojiarea({
//         buttonLabel: '&#9786;',
//         buttonPosition: 'before',
//       });
//     },
//     shouldComponentUpdate: function(nextProps){
//       return nextProps.html !== this.getDOMNode().innerHTML;
//     },
//     // handleClick: function(){
//     //   this.props.handleClick();
//     // },
//     emitChange: function(){
//       var html = this.getDOMNode().innerHTML;
//       if (this.props.onChange && html !== this.lastHtml) {
//         this.props.onChange({
//           target: {
//             value: html
//           }
//         });
//       }
//       this.lastHtml = html;
//     }
// });
// <div
//   contentEditable='true'
//   placeholder="Введите комментарий"
//   className='textarea-form-control-comment'
//   onChange={this.handleChange}
//   onClick={this.handleClick}
//   dangerouslySetInnerHTML={{__html: this.state.new_comment}}>
// </div>
