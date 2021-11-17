import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#save-btn").on("click", function () {
    e.preventDefault();
    var userId = localStorage.getItem("id");
    if (userId == 0) {
        alert("Campo Paciente em Branco");
    }
    var date = document.getElementById("date");
    var result = document.getElementById("result");
    var quantify = document.getElementById("quantify");
    var observation = document.getElementById("observation");

    var data = {
      userId: userId,
      data: date,
      result: result,
      quantify: quantify,
      observation: observation,
    };
    alert(data);
    $.ajax({
      url: baseUrlApi + "/professionalsAttendances",
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
          alert("Cadastro Realizado!");
          location.reload(true);
        }
      },
      error: function (err) {
        alert("Erro Desconhecido!" + JSON.stringify(err));
      },
    });
  });
  function arrayOfNAmes() {
    var arrayNames = [];
    $.ajax({
      url: baseUrlApi + "/assisted",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $.each(data, function (index, value) {
          arrayNames.push({
            id: value.id,
            name: value.name,
          });
        });
      },
    });
    // console.log(arrayNames)
    return arrayNames;
  }

  autocomplete(document.getElementById("searchBar"), arrayOfNAmes());
});
