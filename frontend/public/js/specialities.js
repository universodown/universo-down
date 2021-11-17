import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#save-btn").on("click", function (e) {
    e.preventDefault();
    var input = localStorage.getItem("id");
    var specialityId = $("#specialityId :selected").val();
    
    var data = {
      userId: input,
      specialityId: specialityId,
    };
    console.log(data);
    $.ajax({
      url: baseUrlApi + "/specialities",
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
        alert("Erro Desconhecido!  " + JSON.stringify(err));
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
                name: value.firstName + " " + value.lastName
              })
            : null;
        });
      },
    });

    // console.log(arrayNames)
    return arrayNames;
  }
  
  autocomplete(document.getElementById("searchBar"), arrayOfNAmes());

  $.ajax({
    url: baseUrlApi + "/speciality",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      // $("#specialityId").empty();
      $.each(data, function (index, value) {
        $("#specialityId").append(
          "<option value='" + value.id + "'>" + value.id + " - " + value.name + "</option>"
        );
      });
    },
  });
});
