var baseUrlApi = "http://ec2-3-88-10-95.compute-1.amazonaws.com:3000/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  window.localStorage.removeItem("userId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var userId = localStorage.getItem("userId");
    var dayOfWeek = $("#dayOfWeek :selected").val();
    var startHour = document.getElementById("startHour");
    var endHour = document.getElementById("endHour");

    if (startHour.value > endHour.value) {
      alert("Horário inicial maior que o término da Consulta!");
    } else {
      var data = {
        dayOfWeek: dayOfWeek,
        startHour: startHour.value,
        endHour: endHour.value,
        userId: userId,
      };
    }

    if (checkProperties(data) === false) {
      try {
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
              location.reload();
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
      alert("Campo(s) em branco");
    }
  });
});

//Update
$("#formUpdate").submit(function (e) {
  e.preventDefault();
  var dayOfWeek = document.getElementById("dayOfWeek");
  var startHour = document.getElementById("startHour");
  var endHour = document.getElementById("endHour");

  var data = {
    dayOfWeek: dayOfWeek.value,
    startHour: startHour.value,
    endHour: endHour.value,
  };
  try {
    $.ajax({
      url: baseUrlApi + "/calendar/" + id.value,
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
          window.location.href = "../../html/listar/calendar.html";
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
    localStorage.removeItem("selectUser");
    $.ajax({
      url: baseUrlApi + "/user",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $.each(data, function (index, value) {
          var fullName = value.firstName + " " + value.lastName;
          if (value.userRole === "professional") {
            $("#selectUser").append(
              "<option value='" +
                value.id +
                "' data-name='" +
                fullName +
                "'>" +
                value.firstName +
                " " +
                value.lastName +
                "</option>"
            );
          } else {
            return;
          }
        });

        $("#selectUser").on("change", function () {
          var selectOption = $(this).children("option:selected").val();
          localStorage.setItem("selectUser", selectOption);
        });
      },
    });

    setTimeout(loadTable, 1000);
    function loadTable() {
      $("#selectUser").on("change", function (e) {
        e.preventDefault();
        var id = localStorage.getItem("selectUser");
        $.ajax({
          type: "GET",
          url: baseUrlApi + "/calendar/user/" + id,
          headers: {
            "x-access-token": localStorage.getItem("Authorization"),
          },
          dataType: "JSON",
          success: function (data) {
            
            $("#calendarTable").DataTable({
              bDestroy: true,
              language: {
                url: "../../public/json/DataTable_pt_br.json",
              },
              columnDefs: [
                { className: "align-center" },
                {
                  targets: 4,
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
                  data: "dayOfWeek",
                  render: function (data) {
                    if (data === "sunday") {
                      return (data = "Domingo");
                    } else if (data === "monday") {
                      return (data = "Segunda-Fiera");
                    } else if (data === "tuesday") {
                      return (data = "Terça-Feira");
                    } else if (data === "wednesday") {
                      return (data = "Quart-Feira");
                    } else if (data === "thursday") {
                      return (data = "Quinta-Feira");
                    } else if (data === "friday") {
                      return (data = "Sexta-Feira");
                    } else if (data === "saturday") {
                      return (data = "Sãbado");
                    } else {
                      return;
                    }
                  }
                },
                {
                  data: "startHour",
                },
                {
                  data: "endHour",
                },
              ],
            });
          },
          error: function (err) {
            erroHandler(err.status);
            location.reload(true);
          },
        });
        $("#calendarTable").on("click", ".btn-primary", function () {
          var id = $(this).attr("id").match(/\d+/)[0];
          var data = $("#calendarTable").DataTable().row(id).data();
          var fullName = $("#selectUser :selected").text();
          window.location.href =
            "../editar/calendar.html?id=" +
            data.id +
            "&" +
            "fullName=" +
            fullName;
        });
      });
    }
  });
}

export function loadInfoById() {
  $(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      let id = params.get("id");
      let fullName = params.get("fullName");
      $.ajax({
        type: "GET",
        url: baseUrlApi + "/calendar/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#id").attr("value", data.id);
          $("#name").attr("value", fullName);
          $("#startHour").attr("value", data.startHour);
          $("#endHour").attr("value", data.endHour);
          $("#dayOfWeek").attr("value", $("select").val(data.dayOfWeek));
        },
        error: function (err) {
          erroHandler(err.status);
          location.reload(true);
        },
      });
    } else {
      alert("Erro desconhecido!");
    }
  });
}
