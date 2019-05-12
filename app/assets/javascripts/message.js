$(function() {
  function buildHTML(message) {
    var image = message.image.url
    if (image) {
      var imageHtml=`<img src='${image}' class='lower-message__image'/>`
    } else{
      var imageHtml=''
    }

    var html = `<div class="message" data-message-id="${message.id}">
                 <div class="upper-message" data-message-id="${message.id}"></div>
                 <div class="upper-message__user-name">${message.user.name}</div>
                 <div class="upper-message__date">${message.date}</div>
                 <div class="lower-meesage">
                  <p class="lower-message__content">${message.content}</p>
                  ${imageHtml}
                 </div>
                </div>`;
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
      processdata: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.message.content').val('');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
})