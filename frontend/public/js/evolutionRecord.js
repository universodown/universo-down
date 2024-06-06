var baseUrlApi = `${process.env.ENDPOINT}/api/v1`;
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  //height
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var assistedId = localStorage.getItem("assistedId");
    var userId = localStorage.getItem("userId");
    var date = document.getElementById("date");
    var status = $("#status :selected").val();
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var report = document.getElementById("report");

    var data = {
      assistedId: assistedId,
      userId: userId,
      date: date.value,
      status: status,
      weight: weight.value,
      height: height.value,
      report: report.value,
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/evolution-record",
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
            location.reload(true);
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
  var height = document.getElementById("height");
  var weight = document.getElementById("weight");
  var status = document.getElementById("status");
  var report = document.getElementById("report");
  var data = {
    id: id.value,
    date: date.value,
    height: height.value,
    weight: weight.value,
    status: status.value,
    report: report.value,
  };
  

  if (checkProperties(data) === false) {
    try {
      $.ajax({
        url: baseUrlApi + "/evolution-record/" + id.value,
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
            window.location.href = "../../html/listar/evolutionRecord.html";
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
      url: baseUrlApi + "/evolution-record/",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        
        $("#evolutionRecordTable").DataTable({
          language: {
            url: "../../public/json/DataTable_pt_br.json",
          },
          columnDefs: [
            { className: "align-center" },
            {
              targets: 7,
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
            { data: "date" },
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
            { data: "height" },
            { data: "weight" },
            { data: "report" },
          ],
        });
      },
      error: function (err) {
        erroHandler(err.status);
      },
    });
    $("#evolutionRecordTable").on("click", ".btn-primary", function () {
      var id = $(this).attr("id").match(/\d+/)[0];
      var data = $("#evolutionRecordTable").DataTable().row(id).data();
      
      window.location.href =
        "../editar/evolutionRecord.html?id=" +
        data.id +
        "&" +
        "assistedName=" +
        data.assisted.name;
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
        url: baseUrlApi + "/evolution-record/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#id").attr("value", data.id);
          $("#name").attr("value", assistedName);
          $("#date").attr("value", data.date);
          $("#height").attr("value", data.height);
          $("#weight").attr("value", data.weight);
          $("#status").attr("value", $("select").val(data.status));
          $("#report").attr("value", $("textarea").val(data.report));
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
