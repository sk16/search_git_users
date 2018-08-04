$(document).ready(function(){
  var xhr;
  $("#users").keyup(function(){
      var user = $('#users').val();
      var url = 'https://api.github.com/users/'+user;
      if(xhr){
        xhr.abort();
      }

      (_.debounce(doAjax.bind(this,url),100))();
  });

  function doAjax(url){
      xhr = $.ajax({
        url: url,
        type: 'GET', 
        success: function(result){
           renderResult(result);
        },
        error: function(xhr,status,error){
           $('#result').text('User Not Found!!');
           $('#user_data').hide();
        }
      });
  }

  function renderResult(res){
     $('#result').text('User Found!!');
     $('#display_photo')[0].src = res.avatar_url;
     $('#nick_name').text(res.login);
     $('#user_name').text(res.name);
     $('#company').text(res.company);
     $('#user_data').show();
  }
});