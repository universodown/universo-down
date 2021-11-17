import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#save-btn").on("click", function () {
    e.preventDefault();
    var userId = localStorage.getItem("id");
    var dayOfWeek = $("#dayOfWeek :selected").val();
    var startHour = document.getElementById("startHour");
    var endHour = document.getElementById("endHour");

      var data = {
        dayOfWeek: dayOfWeek,
        startHour: startHour.value,
        endHour: endHour.value,
        userId: userId,
      };
      $.ajax({
        url: baseUrlApi + "/calendar",
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
          alert("Erro Desconhecido! " + JSON.stringify(err));
        },
      });
  });
});
$(document).ready(function () {
  function arrayOfNAmes() {
    var arrayNames = [];
    $.ajax({
      url: baseUrlApi + "/user",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $.each(data, function (index, value) {
          value.userRole == "profissional"
            ? arrayNames.push({
                id: value.id,
                name: value.firstName + " " + value.lastName,
              })
            : null;
        });
      },
    });
    // console.log(arrayNames)
    return arrayNames;
  }

  autocomplete(document.getElementById("searchBar"), arrayOfNAmes());
});
