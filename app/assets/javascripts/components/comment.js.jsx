var Comment = React.createClass({
  getInitialState: function() {
    return {
      editable: false
    };
  },
  removeClick: function(){
    this.props.removeComment(this.props.comment.id)
  },
  editClick: function(){
    this.setState({
      editable: true
    });
    CI('Comment::EditClick');
  },
  updateComment: function(text){
    CI('Comment::updateComment', text);
    this.setState({
      editable: false
    });
    this.props.updateComment(this.props.comment.id, text);
  },
  render: function(){
    var style = {
      background: 'url(' + this.props.comment.author.avatar + ') no-repeat',
      backgroundSize: 'cover'
    };
    var main_part;
    if (this.state.editable){
      main_part = (
        <div className="object-text">
          <div className="object-maintext">
            <a href={this.props.comment.author.url}>{this.props.comment.author.name}</a>
            <span className="status-user-line">
              <span> • </span>
              <span> </span>
              <span>{this.props.comment.author.type}</span>
            </span>
            <span className="post-autor-data">
              <span> • </span>
              <span>{this.props.comment.time}</span>
            </span>
          </div>
          <CommentText
            updateComment={this.updateComment}
            text={this.props.comment.text}/>
        </div>
      );
    } else {
      var edit_button, remove_button, menu;
      if (this.props.comment.can_edit){
        edit_button = <li><a onClick={this.editClick}>Редактировать</a></li>
      }
      if (this.props.comment.can_remove){
        remove_button = <li><a onClick={this.removeClick}>Удалить</a></li>
      }
      if (remove_button || edit_button){
        menu = (
          <span>
            <span className = 'sign-dots-menu action-angle' data-toggle="dropdown">•••</span>
            <ul className="dropdown-menu" role="menu">
              {edit_button}
              {remove_button}
            </ul>
          </span>
        );
      }
      main_part = (
        <div className='object-text'>
          <div className='object-maintext'>
            <a href={this.props.comment.author.url}>{this.props.comment.author.name}</a>
            <span className='status-user-line'><span> • </span> <span>{this.props.comment.author.type}</span></span>
            <span className="post-autor-data"><span > • </span>
              <span>
              {this.props.comment.time}
              </span>
            </span>
            {menu}
          </div>
          <div className='text-unit-post-comments'>
            {this.props.comment.text} 
          </div>
        </div>
      );
    }

    return (
      <div className='unit-post-comments'>
        <div className='preview-object'>
          <div className='preview-object-avatar-mini' style={style}>
          </div>
          <div className='preview-object-info-mini'>
            {main_part}
          </div>
          <div className='clearboth'>
          </div>
        </div>
      </div>
    )
  }
})

var CommentText = React.createClass({
  componentDidMount: function() {
    var node = this.refs.text.getDOMNode();
    $(node).autoResize({
      limit: 600,
      extraSpace: 13,
      animate: true
    });
    $(node).on('keydown', this.handleKeyDown);
    $(node).change();
  },
  componentWillUnmount: function() {
    var node = this.refs.text.getDOMNode();
    $(node).off('keydown', this.handleKeyDown);
    // $(node).unbind('.autoResize');
  },
  handleKeyDown: function(e){
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      e.preventDefault();
      var node = this.refs.text.getDOMNode();
      this.props.updateComment(node.value);
    }
  },
  render: function() {
    return (
      <div>
      <textarea
        ref='text'
        className="form-control textarea-form-control-comment"
        placeholder='Введите комментарий'
        defaultValue={this.props.text}/>
      </div>
    );
  }
});
  // <div className="unit-post-comments">
  //   <div className="preview-object">
  //     <div className="preview-object-avatar-mini" style={style}>
  //     </div>
  //     <div className="preview-object-info-mini">

  //     </div>
  //     <div className="clearboth">
  //     </div>
  //   </div>
  // </div>
//   removeClick: function(){
//     this.props.remove(this.props.data.id)
//   },
//   getInitialState: function() {
//     return {
//       editable: false
//     };
//   },
//   editClick: function(){
//     this.setState({editable: !this.state.editable});
//   },
//   updateClick: function(){
//     var text = React.findDOMNode(this.refs.text).value.trim();
//     if (!text) {
//       return;
//     }
//     this.setState({editable: false});
//     this.props.updateComment(this.props.data.id, text);
//   },
//   render: function() {
//     var mainPart;
//     if (this.state.editable) {
//       mainPart = (
//         <div>
//           <textarea ref='text' className='form-control textHW-update'
//           defaultValue={this.props.data.text}/>
//           <div className='wrap-send-button'>
//             <button className="btn btn-primary btn-xs btn-st change-news"
//             onClick={this.updateClick}>
//               Сохранить
//             </button>
//           </div>
//         </div>
//         )
//     } else {
//       mainPart =(
//         <div className='main-text-news'>
//           <span className='span-main-text-comment'>{this.props.data.text}</span>
//         </div>
//       )
//     }
//     var remove_link;
//     if (this.props.data.can_remove) {
//       remove_link = (
//         <span
//           className="glyphicon glyphicon-remove"
//           onClick={this.removeClick}>
//         </span>
//         );
//     }
//     var edit_link;
//     if (this.props.data.can_edit) {
//       edit_link = (
//         <span
//           className="glyphicon glyphicon-pencil pencil-news"
//           onClick={this.editClick}>
//         </span>
//         );
//     }
//     return(
//     <div className='the-comment'>
//       <div className='row'>
//         <div className='col-xs-1 wrap-avatar-news'>
//           <img src={this.props.data.author.avatar} width='40' height='40' className='img-avatar'/>
//         </div>
//         <div className='col-xs-11 the-comment-content'>
//           <div className = 'sign-sp close-news'>
//             {edit_link}
//             &nbsp;&nbsp;
//             {remove_link}
//           </div>
//           <div className='comment-username'>
//           <a href={this.props.data.author.urls}>{this.props.data.author.name}</a>
//           </div>
//           {mainPart}
//           <div className='menu-of-form-send-comment-of-news'>
//             <span className='date-news'>{this.props.data.time}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
//   }
// });
