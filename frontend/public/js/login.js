var baseUrlApi = "http://3.130.150.80/api/api/v1";
import erroHandler from '../js/fns/erroHandler.js'

$(document).ready(function () {
  $("#form").submit(function(e) {
    e.preventDefault();
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
        url: baseUrlApi + "/login",
        type: "POST",
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          const token = data.token;
          window.localStorage.clear();
          window.localStorage.setItem("Authorization", token);
          window.location.href = "../../html/index.html";
        },
        error: function (err) {
          erroHandler(err.status);

        },
      });
    }
  });
});
