var baseUrlApi = "http://ec2-3-88-10-95.compute-1.amazonaws.com:3000/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("evolutionRecordId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var evolutionRecordId = localStorage.getItem("evolutionRecordId");
    var date = document.getElementById("date");
    var result = document.getElementById("result");
    var quantify = document.getElementById("quantify");

    var data = {
      evolutionRecordId: evolutionRecordId,
      date: date.value,
      result: result.value,
      quantify: quantify.value,
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/professionalAttendance",
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
        alert("Erro ao cadastrar! " + error);
      }
    } else {
      alert("Campo(s) em branco!");
    }
  });
});

//Update
$("#formUpdate").submit(function (e) {
  e.preventDefault();
  var id = document.getElementById("id");
  var date = document.getElementById("date");
  var result = document.getElementById("result");
  var quantify = document.getElementById("quantify");
  var data = {
    date: date.value,
    result: result.value,
    quantify: quantify.value,
  };
  

  if (checkProperties(data) === false) {
    try {
      $.ajax({
        url: baseUrlApi + "/professionalAttendance/" + id.value,
        type: "PUT",
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        cache: false,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(data),
        success: function (data) {
          
          if (data != "") {
            alert("Atualização Realizada!");
            window.location.href =
              "../../html/listar/professionalAttendance.html";
          }
        },
        error: function (err) {
          erroHandler(err.status);
          location.reload(true);
        },
      });
    } catch (error) {
      alert("Erro ao editar! " + error);
    }
  } else {
    alert("Campo(s) em Branco!");
  }
});
export function loadInfoDataTable() {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: baseUrlApi + "/professionalAttendance/assisted",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        
        $("#specialityTable").DataTable({
          language: {
            url: "../../public/json/DataTable_pt_br.json",
          },
          columnDefs: [
            { className: "align-center" },
            {
              targets: 5,
              render: function (data, type, row, meta) {
                return (
                  '<input type="button" class="btn btn-primary " id=n-"' +
                  meta.row +
                  '" value="Editar"/>'
                );
              },
            },
          ],
          data: data,
          columns: [
            {
              data: "id",
            },
            {
              data: "evolutionRecord.assisted.name",
            },
            {
              data: "date",
              render: function (data) {
                return exportDate(data);
              },
            },
            {
              data: "quantify",
            },
            {
              data: "result",
            },
          ],
        });
      },
      error: function (err) {
        erroHandler(err.status);
      },
    });
    $("#specialityTable").on("click", ".btn-primary", function () {
      var id = $(this).attr("id").match(/\d+/)[0];
      var data = $("#specialityTable").DataTable().row(id).data();
      window.location.href =
        "../editar/professionalAttendance.html?id=" +
        data.id +
        "&" +
        "assistedName=" +
        data.evolutionRecord.assisted.name;
    });
  });
}
export function loadInfoById() {
  $(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      let id = params.get("id");
      let assistedName = params.get("assistedName");
      $.ajax({
        type: "GET",
        url: baseUrlApi + "/professionalAttendance/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          const dateString = exportDate(data.date);
          $("#id").attr("value", data.id);
          $("#name").attr("value", assistedName);
          $("#date").attr("value", dateString);
          $("#quantify").attr("value", data.quantify);
          $("#result").attr("value", $("textarea").val(data.result));
        },
        error: function (err) {
          erroHandler(err.status);
        },
      });
    } else {
      alert("Erro desconhecido!");
    }
  });
}
function exportDate(date) {
  const currentDate = new Date(date.replace(/-/g, "/").replace(/T.+/, ""));
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const dateString =
    currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;
  return dateString;
}
