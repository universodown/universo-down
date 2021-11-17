var baseurl = window.location.origin + window.location.pathname;
var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  $("#save-btn").click(function () {
    e.preventDefault();
    var name = $("#name").val();
    if (name == "") {
      alert("Campo em Branco!!!");
    } else {
      var data = {
        name: name,
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
          alert("Cadastro Realizado!");
          location.reload(true);
        },
        error: function (err) {
          alert("Speciality: Erro Desconhecido!" + JSON.stringify(err));
        },
      });
    }
  });
});
