$(function() {
  function buildHTML(message) {
    var html = $('<input class="form_message">').append(message.content);
    return html;
  }

  $('#new_message').on('submit', function(e) { 
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      data: formData,
      dataType: 'json',
      processdata: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.message.content').val('')
    })
  })
})