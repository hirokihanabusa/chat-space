$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = message.image
    if (image) {
      var imageHtml=`<img src='${image}' class='lower-message__image'/>`
    } else{
      var imageHtml = ''
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

  // 非同期通信実装
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
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });

  // console.log($('.message:last').data('message-id'));

  // 自動更新実装
  $(function() {
    var reloadMessages = function() {
      // console.log("ok")
      if (location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').attr('data-message-id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
        var group_id = $('.chat').attr('data-group-id')
        // console.log(group_id);
        // console.log(last_message_id);
        $.ajax({ 
        url: '/groups/'+ group_id +'/api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id }
      }) 
      // console.log("ok")
      .done(function(messages) {
        console.log(messages)
        var insertHTML = '';
        // inserthtml = buildHTML(messages);
        if (messages.length !== 0) {
          messages.forEach(function(message) {
            insertHTML += buildHTML(message)  
            // console.log(message)
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
          })
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
      } else {
        clearInterval(reloadMessages);
      }
    };
    $(function() {
      setInterval(reloadMessages, 5000);
      //5000ミリ秒ごとにreloadMessagesという関数を実行する
    });
  });
})