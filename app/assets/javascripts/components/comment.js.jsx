var Comment = React.createClass({
  removeClick: function(){
    this.props.remove(this.props.data.id)
  },
  getInitialState: function() {
    return {
      editable: false
    };
  },
  editClick: function(){
    this.setState({editable: !this.state.editable});
  },
  updateClick: function(){
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.setState({editable: false});
    this.props.updateComment(this.props.data.id, text);
  },
  render: function() {
    var mainPart;
    if (this.state.editable) {
      mainPart = (
        <div>
          <textarea ref='text' className='form-control textHW-update'
          defaultValue={this.props.data.text}/>
          <div className='wrap-send-button'>
            <button className="btn btn-primary btn-xs btn-st change-news"
            onClick={this.updateClick}>
              Сохранить
            </button>
          </div>
        </div>
        )
    } else {
      mainPart =(
        <div className='main-text-news'>
          <span className='span-main-text-comment'>{this.props.data.text}</span>
        </div>
      )
    }
    var remove_link;
    if (this.props.data.can_remove) {
      remove_link = (
        <span
          className="glyphicon glyphicon-remove"
          onClick={this.removeClick}>
        </span>
        );
    }
    var edit_link;
    if (this.props.data.can_edit) {
      edit_link = (
        <span
          className="glyphicon glyphicon-pencil pencil-news"
          onClick={this.editClick}>
        </span>
        );
    }
    return(
    <div className='the-comment'>
      <div className='row'>
        <div className='col-xs-1 wrap-avatar-news'>
          <img src={this.props.data.author.avatar} width='40' height='40' className='img-avatar'/>
        </div>
        <div className='col-xs-11 the-comment-content'>
          <div className = 'sign-sp close-news'>
            {edit_link}
            &nbsp;&nbsp;
            {remove_link}
          </div>
          <div className='comment-username'>
          <a href={this.props.data.author.urls}>{this.props.data.author.name}</a>
          </div>
          {mainPart}
          <div className='menu-of-form-send-comment-of-news'>
            <span className='date-news'>{this.props.data.time}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
});