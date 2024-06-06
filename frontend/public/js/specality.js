var baseUrlApi = "http://3.130.150.80/api/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    var name = document.getElementById("name");

    var data = {
      name: name.value,
    };

    if (checkProperties(data) === false) {
      try {
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
      alert("Campo(s) em Branco!");
    }
  });

  //Update
  $("#formUpdate").submit(function (e) {
    e.preventDefault();
    var name = document.getElementById("name");
    var id = document.getElementById("id");

    var data = {
      id: id.value,
      name: name.value,
    };

    if (checkProperties(data) === false) {
      try {
        $.ajax({
          url: baseUrlApi + "/speciality/" + id.value,
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
                "../../html/listar/speciality.html";
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
    var data = {};
    $.ajax({
      type: "GET",
      url: baseUrlApi + "/speciality",
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
              targets: 2,
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
          columns: [{ data: "id" }, { data: "name" }],
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
      window.location.href = "../editar/speciality.html?id=" + data.id;
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
        url: baseUrlApi + "/speciality/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#name").attr("value", data.name);
          $("#id").attr("value", data.id);
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
