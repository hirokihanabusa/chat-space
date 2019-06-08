$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = message.image
    if (image) {
      var imageHtml=`<img src='${image}' class='lower-message__image'/>`
    } else{
      var imageHtml=''
    }

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message" data-message-id="${message.id}">
                    <div class="upper-message__user-name">${message.user_name}</div>
                    <div class="upper-message__date">${message.date}</div>
                  </div>          
                  <div class="lower-meesage">
                    <p class="lower-message__content">${message.content}</p>
                    ${imageHtml}
                  </div>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e) { 
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      data: formData,
      type: 'POST',
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__message').val('');
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      return false
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
})