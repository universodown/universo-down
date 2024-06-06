var baseUrlApi = "http://3.130.150.80/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("id");
  $("#form").submit(function (e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("assistedId");
    var date = document.getElementById("date");
    var responseDate = document.getElementById("responseDate");
    var status = $("#status :selected").val();
    var observation = document.getElementById("observation");

    if (date.value <= responseDate.value) {
      var data = {
        date: date.value,
        responseDate: responseDate.value,
        status: status,
        observation: observation.value,
        assistedId: assistedId,
      };
    } else {
      alert("Data Inválida!");
    }
    
    if (checkProperties(data) === false) {
      $.ajax({
        url: baseUrlApi + "/school-request",
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
          }
          location.reload(true);
        },
        error: function (err) {
          erroHandler(err.status);
        },
      });
    } else {
      alert("Campo(s) em Branco!");
    }
  });

  //Update
  $("#formUpdate").submit(function (e) {
    e.preventDefault();
    var id = document.getElementById("id");
    var date = document.getElementById("date");
    var responseDate = document.getElementById("responseDate");
    var status = document.getElementById("status");
    var observation = document.getElementById("observation");
    var data = {
      id: id.value,
      date: date.value,
      responseDate: responseDate.value,
      status: status.value,
      observation: observation.value,
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/school-request/" + id.value,
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
                "../../html/listar/schoolRequest.html";
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
});

export function loadInfoDataTable() {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: baseUrlApi + "/school-request/assisted/",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        
        $("#schoolRequestTable").DataTable({
          language: {
            url: "../../public/json/DataTable_pt_br.json",
          },
          columnDefs: [
            { className: "align-center" },
            {
              targets: 6,
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
            { data: "id" },
            { data: "assisted.name" },
            {
              data: "date",
              render: function (data) {
                return exportDate(data);
              },
            },
            {
              data: "responseDate",
              render: function (data) {
                return exportDate(data);
              },
            },
            {
              data: "status",
              render: function (data) {
                if (data === "pending") {
                  return (data = "Pendente");
                } else if (data === "done") {
                  return (data = "Finalizado");
                } else if (data === "refused") {
                  return (data = "Recusado");
                } else {
                  return;
                }
              },
            },
            { data: "observation" },
          ],
        });
      },
      error: function (err) {
        erroHandler(err.status);
      },
    });
    $("#schoolRequestTable").on("click", ".btn-primary", function () {
      var id = $(this).attr("id").match(/\d+/)[0];
      var data = $("#schoolRequestTable").DataTable().row(id).data();
      window.location.href = "../editar/schoolRequest.html?id=" + data.id;
    });
  });
}

export function loadInfoById() {
  $(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      let id = params.get("id");
      $.ajax({
        type: "GET",
        url: baseUrlApi + "/school-request/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
         var dateString =  exportDate(data.date);
         var responseDateString =  exportDate(data.responseDate);
          $("#id").attr("value", data.id);
          $("#date").attr("value", dateString);
          $("#responseDate").attr("value", responseDateString);
          $("#status").attr("value", $('select').val(data.status));
          $("#observation").attr("value", data.observation);
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
  const currentDate = new Date(date.replace(/-/g, '\/').replace(/T.+/, ''));
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();
  const dateString = currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;
  return dateString;
}