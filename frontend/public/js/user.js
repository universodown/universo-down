var baseUrlApi = "http://localhost:3000/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
import checkProperties from "../js/fns/checkForm.js";

$(document).ready(function () {
  //phone
  $("#phone").mask("(99) 99999-9999");

  //identification
  $("#identification").mask("999.999.999-99");

  //generalRegistration
  $("#generalRegistration").mask("999.999.999-9");

  //zipCode
  $("#zipCode").mask("99999-999");
});

$(document).ready(function (e) {
  $("#form").submit(function (e) {
    e.preventDefault();
    let userRole = $("#userRole").val();
    let adminRole = "";
    switch (userRole) {
      case "secretary":
        adminRole = "owner";
        break;
      case "professional":
        adminRole = "member";
        break;
      case "social-assistence":
        adminRole = "admin";
        break;
      default:
        adminRole = "member";
    }
    var data = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      plainPassword: $("#plainPassword").val(),
      plainPasswordConfirmation: $("#plainPasswordConfirmation").val(),
      adminRole: adminRole,
      userRole: $("#userRole").val(),
      birthday: $("#birthday").val(),
      gender: $("#gender").val(),
      identification: $("#identification").val(),
      generalRegistration: $("#generalRegistration").val(),
      issue: $("#issue").val(),
      issuer: $("#issuer").val(),
      zipCode: $("#zipCode").val(),
      address: $("#address").val(),
      number: $("#number").val(),
      neighborhood: $("#neighborhood").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      phone: $("#phone").val(),
      nationalIdentity: $("#nationalIdentity").val(),
    };
    if (checkProperties(data) === false) {
      $.ajax({
        url: baseUrlApi + "/user",
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
          location.reload(true);
        },
      });
    } else {
      alert("Campo(s) em Branco!");
    }
  });
});

   //Update
   $("#formUpdate").submit(function (e) {
    e.preventDefault();
      var id = document.getElementById("id").value;
      var firstName = document.getElementById("firstName");
      var lastName = document.getElementById("lastName");
      var email = document.getElementById("email");
      var userRole = document.getElementById("userRole");
      var birthday = document.getElementById("birthday");
      var gender = document.getElementById("gender");
      var identification = document.getElementById("identification");
      var generalRegistration = document.getElementById("generalRegistration");
      var issue = document.getElementById("issue");
      var issuer = document.getElementById("issuer");
      var zipCode = document.getElementById("zipCode");
      var address = document.getElementById("address");
      var number = document.getElementById("number");
      var neighborhood = document.getElementById("neighborhood");
      var city = document.getElementById("city");
      var state = document.getElementById("state");
      var phone = document.getElementById("phone");
      var nationalIdentity = document.getElementById("nationalIdentity");
      var numberId = parseInt(id, 10);
        var data = {
          id: numberId,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          birthday: birthday.value,
          gender: gender.value,
          identification: identification.value,
          generalRegistration: generalRegistration.value,
          issue: issue.value,
          issuer: issuer.value,
          zipCode: zipCode.value,
          address: address.value,
          number: number.value,
          neighborhood: neighborhood.value,
          city: city.value,
          state: state.value,
          phone: phone.value,
          userRole: userRole.value,
          nationalIdentity: nationalIdentity.value
        };
    
      try {
        $.ajax({
          url: baseUrlApi + "/user/" + numberId,
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
                "../../html/listar/user.html";
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
      url: baseUrlApi + "/user",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        $("#usersTable").DataTable({
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
            {
              data: "id",
            },
            {
              data: function (row, type, set) {
                return row.firstName + " " + row.lastName;
              },
            },
            {
              data: "identification",
            },
            {
              data: "email",
            },
            {
              data: "phone",
            },
            {
              data: "userRole",
              render: function (data) {
                if (data === "secretary") {
                  return (data = "Secretária");
                } else if (data === "professional") {
                  return (data = "Profissional");
                } else if (data === "social-assistence") {
                  return (data = "Assistente Social");
                } else {
                  return;
                }
              },
            },
          ],
        });
      },
      error: function (err) {
        erroHandler(err.status);
        location.reload();
      },
    });
    $("#usersTable").on("click", ".btn-primary", function () {
      var id = $(this).attr("id").match(/\d+/)[0];
      var data = $("#usersTable").DataTable().row(id).data();
      window.location.href = "../editar/user.html?id=" + data.id;
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
        url: baseUrlApi + "/user/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#id").attr("value", data.id);
          $("#firstName").attr("value", data.firstName);
          $("#lastName").attr("value", data.lastName);
          $("#birthday").attr("value", data.birthday);
          $("#email").attr("value", data.email);
          $("#identification").attr("value", data.identification);
          $("#generalRegistration").attr("value", data.generalRegistration);
          $("#issue").attr("value", data.issue);
          $("#issuer").attr("value", data.issuer);
          $("#address").attr("value", data.address);
          $("#phone").attr("value", data.phone);
          $("#number").attr("value", data.number);
          $("#neighborhood").attr("value", data.neighborhood);
          $("#zipCode").attr("value", data.zipCode);
          $("#city").attr("value", data.city);
          $("#nationalIdentity").attr("value", data.nationalIdentity);
          $("#userRole").attr("value", $('select').val(data.userRole));
          $("#state option[value='" + data.state + "']").attr('selected', 'selected');
          $("#gender option[value='" + data.gender + "']").attr('selected', 'selected');
        },
        error: function (err) {
          erroHandler(err.status);
          location.reload();
        },
      });
    } else {
      alert("Erro desconhecido!");
    }
  });
}

