var baseUrlApi = "http://ec2-3-88-10-95.compute-1.amazonaws.com:3000/api/v1";
import erroHandler from '../js/fns/erroHandler.js'

$(document).ready(function () {
  $("#formLogOut").submit(function(e) {
    e.preventDefault();
      $.ajax({
        url: baseUrlApi + "/logout",
        type: "POST",
        headers: {
            "x-access-token": localStorage.getItem("Authorization"),
        },
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        success: function (data) {
          alert("Usuário Desconectado!");
          localStorage.removeItem("Authorization")
          window.location.href = "../../index.html";
        },
        error: function (err) {
          erroHandler(err.status);

        },
      });
  });
});
