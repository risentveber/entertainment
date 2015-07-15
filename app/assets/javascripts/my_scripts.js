function main(){

    function update_crop(coords) {
      $('#crop_x').val(coords.x);
      $('#crop_y').val(coords.y);
      $('#crop_w').val(coords.w);
      $('#crop_h').val(coords.h);
    }

    $('#cropbox').Jcrop({
      onChange: update_crop,
      onSelect: update_crop,
      setSelect: [0, 0, 500, 500],
      aspectRatio: 1
    });

    $('textarea').autoResize({
      limit:300, 
      animate:true
    });
    $('textarea.description-add-material').autoResize({
      limit:600, 
      animate:true
    });

    /*$(".element-of-squares-menu").mouseover(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '1');
    });
    $(".element-of-squares-menu").mouseout(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '0.5');
    });*/

    $('.right-functional').css('margin-left', '80%');


    $(".choice-class").select2({
      placeholder: "Класс"
    });
    $(".choice-theme-material").select2({
      maximumSelectionLength: 1,
      placeholder: "Предмет"
    });

    $(".choice-theme-material").next().children().children().addClass('my-setting-select2-selection');

    $(".type-profiles").click(function(){

      the_id = $(this).attr('id');

      if (the_id == 'all-students'){
        $('#each-students').css('display', 'block');
        $('#each-teachers').css('display', 'none');
      }
      else{
        $('#each-students').css('display', 'none');
        $('#each-teachers').css('display', 'block');
      }
    });



    $("#textHW").focus(function(){

      $(this).css('color', 'black');
      $('.wrap-send-news').css('display', 'block');

    });



    $("#textHW").blur(function(){

      val = $(this).val();
      val = $.trim(val);

      if(!val){
        //$('.wrap-send-news').css('display', 'none');
        $(this).css('height', '30px');
      }
    });

    /*$(".description-add-material").focus(function(){
      $(this).addClass('all0');
    });*/

    

    $(".textHW_comment").focus(function(){

      $(this).css('color', '#383838');
      $(this).next().children('.post-comment-of-news').css('display', 'block');


    });

    $(".textHW_comment").blur(function(){

      val = $(this).val();
      val = $.trim(val);

      if(!val){
        $(this).next().children('.post-comment-of-news').css('display', 'none');
        $(this).css('height', '30px');
      }
    });



    $(".give-comment").click(function(){

      $(this).parent().next().css('display', 'block');
      $(this).parent().next().children('form').children('.textHW_comment').focus();
    });


    $(".pencil-news").click(function(){

      val = $(this).parent().next().next().children().html();
      height = $(this).parent().next().next().height();
      $(this).parent().next().next().children('span').css('display', 'none');
      $(this).parent().next().next().next().children().children('textarea').height(height).val(val);
      $(this).parent().next().next().next().css('display', 'block');
      $(this).parent().next().next().next().children().children('textarea').focus();

    });



    $(".pencil-comment").click(function(){

      val = $(this).parent().next().next().children().html();
      height = $(this).parent().next().next().height();
      $(this).parent().next().next().css('display', 'none');
      $(this).parent().next().next().next().children().children('textarea').height(height).val(val);
      $(this).parent().next().next().next().css('display', 'block');
      $(this).parent().next().next().next().children().children('textarea').focus();

    });


  $(".fancybox-thumb").fancybox({
    parent: 'body',
    prevEffect  : 'none',
    nextEffect  : 'none',
    helpers  : {
      title : {
        type: 'outside'
      },
      thumbs   : {
        width : 50,
        height   : 50
      }
    }
  });

  $('#settigns-profile').tooltip();

  $(".type-of-community").click(function(){
    $(".type-of-community").removeClass('active-type-of-community');
    $(this).addClass('active-type-of-community');
  });


}

$(document).on("page:load ready", main)
