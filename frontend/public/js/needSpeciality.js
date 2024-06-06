var baseUrlApi = "http://3.130.150.80/api/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("evolutionRecordId");
  try {
    $.ajax({
      url: baseUrlApi + "/speciality",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $.each(data, function (index, value) {
          $("#specialityId").append(
            "<option value='" +
              value.id +
              "'>" +
              value.id +
              " - " +
              value.name +
              "</option>"
          );
        });
      },
      error: function (err) {
        erroHandler(err.status);
      },
    });
  } catch (error) {
    alert("Erro ao Listar Especialidade " + error);
  }

  $("#form").submit(function (e) {
    e.preventDefault();
    var evolutionRecordId = window.localStorage.getItem("evolutionRecordId");

    var data = {
      evolutionRecordId: evolutionRecordId,
      specialityId: $("#specialityId").val(),
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/need-speciality",
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
            erroHandler(err.status);
          },
        });
        
      } catch (error) {
        alert("Erro Desconhecido!! " + error)
      }
    } else {
      alert("Campo(s) em branco!")
    }
  });
});
