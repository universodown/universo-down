var baseUrlApi = "http://localhost:3000/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("userId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("userId");
    var specialityId = $("#specialityId :selected").val();

    var data = {
      userId: userId,
      specialityId: specialityId,
    };

    if (checkProperties(data) === false) {
      try {
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
            erroHandler(err.status);
            location.reload(true);
          },
        });
      } catch (error) {
        alert("Erro ao Cadastrar! " + error);
      }
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});

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
  alert("Erro ao Listar Especialidades! " + error);
}

// Update
$("#formUpdate").submit(function (e) {
  e.preventDefault();
  var specialityId = $("#specialityId :selected").val();
  var userId = document.getElementById("userId");
  var data = {
    userId: userId.value,
    specialityId: specialityId,
  };
  try {
    $.ajax({
      url: baseUrlApi + "/specialities/" + id.value,
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
          window.location.href = "/frontend/html/listar/specialities.html";
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
});

export function loadInfoDataTable() {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: baseUrlApi + "/specialities",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        $("#specialityTable").DataTable({
          language: {
            url: "/frontend/public/json/DataTable_pt_br.json",
          },
          columnDefs: [
            { className: "align-center" },
            {
              targets: 3,
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
              data: "speciality.name",
            },
            {
              data: function (row, type, set) {
                return row.user.firstName + " " + row.user.lastName;
              },
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
      JSON.stringify(data.id);
      window.location.href =
        "../editar/specialities.html?id=" + data.id + "?userId=" + data.userId;
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
        url: baseUrlApi + "/specialities/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          const fullName = data.user.firstName + " " + data.user.lastName;
          $("#id").attr("value", data.id);
          $("#userId").attr("value", data.userId);
          $("#specialityId").attr(
            "value",
            $("select").val(data.speciality.id)
          );
          $("#name").attr("value", fullName);
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
