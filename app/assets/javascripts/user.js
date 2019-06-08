$(document).on('turbolinks:load', function() {


  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
    return html;
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-form__search clearfix">
                </div>`
    search_list.append(html);
  }

  function appendSentUser(name, user_id) {
    console.log(name);
    console.log(user_id);
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                  <p class="chat-group-user__name">${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    // console.log('ok');
    var input = $("#user-search-field").val();
    // console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      // console.log('ok');
      // console.log(users);
      // console.log(users.length);
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          // console.log(user);
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
  
  $(document).on('click', '.user-search-add', function() {
    // console.log('ok');
    // test1 = $('.user-search-add').attr("data-user-name");
    // console.log(test1);
    var name = $(this).attr("data-user-name");
    // console.log(name);
    var user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendSentUser(name, user_id);
  });

  $(document).on("click", '.user-search-remove', function() {
    $(this).parent().remove();
  });
});