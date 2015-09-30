var PostText = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    addImage: React.PropTypes.func.isRequired,
    addDivider: React.PropTypes.func.isRequired,
    removeTextElement: React.PropTypes.func.isRequired,
    text_elements: React.PropTypes.array.isRequired
  },
  //END*****************************************************DECLARE
  render: function() {
    var elements = this.props.text_elements;
    var length = elements.length;
    rendered_elements = elements.map(function (e, position) {
      return <PostTextElement
                key={position}
                element={e}
                position={position}
                onChangeElementText={this.props.changeElementText}
                removeTextElement={this.props.removeTextElement}
                lengthElements={length}/>
    }.bind(this));

    return (
      <div>
        <PostTextManagmentPanel
          addImage={this.props.addImage}
          addDivider={this.props.addDivider}/>
        {rendered_elements}
      </div>
    );
  }
});

var PostTextElement = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    element: React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      text: React.PropTypes.string
    })
  },
  //END*****************************************************DECLARE
  handleChange: function(e) {
    this.props.onChangeElementText(
      this.props.position,
      e.target.value
    );
  },
  handleRemoveElementPost: function() {
    this.props.removeTextElement(
      this.props.position
    );
  },
  componentDidMount: function() {
    if(this.props.element.type == ElementTypes.text){
      var node = this.refs.textElement.getDOMNode();
      $(node).autoResize({
        limit:600,
        extraSpace:0,
        animate:true
      });
      $(node).change();
    }
  },
  render: function() {
    var textPlaceholder;
    var element_content;
    var remove_button_all = <button className='remove-angle all-remove-angle' onClick={this.handleRemoveElementPost}>&times;</button>
    var remove_button_devider = <button className='remove-angle devider-remove-angle' onClick={this.handleRemoveElementPost}>&times;</button>
    switch (this.props.element.type) {
      case ElementTypes.text:
        // if(this.props.typePost == PostTypes.text){
        textPlaceholder = 'Введите текст';
        // }else if(this.props.typePost == PostTypes.link || this.props.typePost == PostTypes.file){
        //   textPlaceholder = 'Если хотите, добавьте описание';
        // }else{
        //   textPlaceholder = '- Источник';
        // }
        element_content = (
          <div className = 'usual-post-text action-create-element-post'>
            {remove_button_all}
            <textarea
              ref='textElement'
              id='hhh'
              className='textarea-new-post textarea-sp form-control'
              value={this.props.element.text}
              placeholder = {textPlaceholder}
              onChange={this.handleChange}
              onLoad={this.handleAutofocus}>
            </textarea>
          </div>
        );
        break;
      case ElementTypes.image:
        element_content = (
            <div className = 'usual-post-photo action-create-element-post'>
              {remove_button_all}
              <img src = {this.props.element.url} />
            </div>
        );
        break;
      case ElementTypes.divider:
        element_content = (
            <div>
              {remove_button_devider}
              <div className = 'usual-post-devider create-usual-post-divider action-create-element-post'/>
              <div className = 'clearboth' />
            </div>
        );
        break;
      default:
        CE('Undefined PostText type');
    }
    return element_content;
  }
});
