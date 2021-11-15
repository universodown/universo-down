$(document).ready(function () {
  $("#login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == "" || password == "") {
      $('input[type="text"],input[type="password"]').css(
        "border",
        "2px solid red"
      );
      $('input[type="text"],input[type="password"]').css(
        "box-shadow",
        "0 0 3px red"
      );
      alert("Campo em Branco!!!");
    } else {
      $("input")
        .keyup(function () {
          var value = $(this).val();
          $("#email").text(value);
          $("#password").text(value);
        })
        .keyup();
      var data = {
        email: $("#email").val(),
        plainPassword: $("#password").val(),
      };
      $.ajax({
        url: "http://localhost:3000/api/v1/login",
        headers: {
          'Authorization':'Authorization ' + data.token,
          'Content-Type':'application/json'
      },
        type: "POST",
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          const token = data.token;
          window.location.href = '/html/listar/organization.html';
          window.localStorage.setItem('Authorization', token);
        },
        error: function (err) {
          alert(err);
        },
      });
    }
  });
});
