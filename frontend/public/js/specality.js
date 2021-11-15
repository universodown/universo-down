var baseurl = window.location.origin + window.location.pathname;
var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  $("#save-btn").click(function () {
    var name = $("#name").val();
    if (name == "") {
      alert("Campo em Branco!!!");
    } else {
      $("input")
        .keyup(function () {
          var value = $(this).val();
          $("#name").text(value);
        })
        .keyup();
      var data = {
        name: $("#name").val(),
      };
      $.ajax({
        url: baseUrlApi + "/speciality",
        type: "POST",
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          if (data != "") {
            document.location.reload(true);
            alert("Cadastro Realizado!");
          }
        },
        error: function (err) {
          alert("Speciality: Erro Desconhecido!" + err);
        },
      });
    }
  });
});


