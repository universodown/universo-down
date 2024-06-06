var baseUrlApi = `${process.env.ENDPOINT}/api/v1`;
import erroHandler from "../../public/js/fns/erroHandler.js";

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

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function (e) {
    e.preventDefault();
    var responsible = document.querySelector("input[name=responsible]").checked
      ? true
      : false;
    var assistedId = localStorage.getItem("assistedId");
    var data = {
      assistedId: assistedId,
      name: $("#name").val(),
      birthday: $("#birthday").val(),
      gender: $("#gender").val(),
      civilStatus: $("#civilStatus").val(),
      identification: $("#identification").val(),
      relationship: $("#relationship").val(),
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
      naturalness: $("#naturalness").val(),
      nationality: $("#nationality").val(),
      scholarity: $("#scholarity").val(),
      revenue: $("#revenue").val(),
      professionalSituation: $("#professionalSituation").val(),
      occupation: $("#occupation").val(),
      nationalIdentity: $("#nationalIdentity").val(),
      responsible: responsible,
    };

      try {
        $.ajax({
          url: baseUrlApi + "/related",
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
            location.reload();
          },
        });
      } catch (error) {
        alert("Erro ao cadastrar! " + error);
      }
  });
});

//Update
$("#formUpdate").submit(function (e) {
  e.preventDefault();
  var id = document.getElementById("id");
  var name = document.getElementById("name");
  var birthday = document.getElementById("birthday");
  var identification = document.getElementById("identification");
  var generalRegistration = document.getElementById("generalRegistration");
  var naturalness = document.getElementById("naturalness");
  var nationality = document.getElementById("nationality");
  var issue = document.getElementById("issue");
  var issuer = document.getElementById("issuer");
  var address = document.getElementById("address");
  var phone = document.getElementById("phone");
  var number = document.getElementById("number");
  var neighborhood = document.getElementById("neighborhood");
  var zipCode = document.getElementById("zipCode");
  var city = document.getElementById("city");
  var nationalIdentity = document.getElementById("nationalIdentity");
  var revenue = document.getElementById("revenue");
  var occupation = document.getElementById("occupation");
  var state = document.getElementById("state");
  var gender = document.getElementById("gender");
  var civilStatus = document.getElementById("civilStatus");
  var relationship = document.getElementById("relationship");
  var professionalSituation = document.getElementById("professionalSituation");
  var scholarity = document.getElementById("scholarity");
  var responsible = document.querySelector("input[name=responsible]").checked
    ? true
    : false;
  var data = {
    id: id.value,
    name: name.value,
    birthday: birthday.value,
    identification: identification.value,
    generalRegistration: generalRegistration.value,
    naturalness: naturalness.value,
    nationality: nationality.value,
    issue: issue.value,
    issuer: issuer.value,
    address: address.value,
    phone: phone.value,
    number: number.value,
    neighborhood: neighborhood.value,
    zipCode: zipCode.value,
    city: city.value,
    nationalIdentity: nationalIdentity.value,
    revenue: revenue.value,
    occupation: occupation.value,
    state: state.value,
    gender: gender.value,
    civilStatus: civilStatus.value,
    relationship: relationship.value,
    professionalSituation: professionalSituation.value,
    scholarity: scholarity.value,
    responsible: responsible,
  };
  try {
    $.ajax({
      url: baseUrlApi + "/related/" + id.value,
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
          window.location.href = "../../html/listar/related.html";
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
  const selectElement = document.querySelector("input");
  selectElement.addEventListener("change", (event) => {
    const myPromise = new Promise(function (resolve, reject) {
      setTimeout(() => {
        var id = localStorage.getItem("assistedId");
        $.ajax({
          type: "GET",
          url: baseUrlApi + "/related/assisted/" + id,
          headers: {
            "x-access-token": localStorage.getItem("Authorization"),
          },
          dataType: "JSON",
          cache: false,
          success: function (data) {
            var table = $("#relatedTable").DataTable({
              language: {
                url: "../../public/json/DataTable_pt_br.json",
              },
              bDestroy: true,
              columnDefs: [
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
                { data: "id" },
                { data: "name" },
                { data: "identification" },
                { data: "phone" },
              ],
            });
          },
          error: function (err) {
            alert("erro" + JSON.stringify(err));
          },
        });
        $("#relatedTable").on("click", ".btn-primary", function () {
          var id = $(this).attr("id").match(/\d+/)[0];
          var data = $("#relatedTable").DataTable().row(id).data();
          window.location.href = "../editar/related.html?id=" + data.id;
        });
      }, 200);
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
        url: baseUrlApi + "/related/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#id").attr("value", data.id);
          $("#assistedName").attr("value", data.assisted.name);
          $("#name").attr("value", data.name);
          $("#birthday").attr("value", data.birthday);
          $("#identification").attr("value", data.identification);
          $("#generalRegistration").attr("value", data.generalRegistration);
          $("#naturalness").attr("value", data.naturalness);
          $("#nationality").attr("value", data.nationality);
          $("#issue").attr("value", data.issue);
          $("#issuer").attr("value", data.issuer);
          $("#address").attr("value", data.address);
          $("#phone").attr("value", data.phone);
          $("#number").attr("value", data.number);
          $("#neighborhood").attr("value", data.neighborhood);
          $("#zipCode").attr("value", data.zipCode);
          $("#city").attr("value", data.city);
          $("#nationalIdentity").attr("value", data.nationalIdentity);
          $("#revenue").attr("value", data.revenue);
          $("#occupation").attr("value", data.occupation);
          $("#state option[value='" + data.state + "']").attr("selected","selected");
          $("#gender option[value='" + data.gender + "']").attr("selected","selected");
          $("#civilStatus option[value='" + data.civilStatus + "']").attr("selected","selected");
          $("#relationship option[value='" + data.relationship + "']").attr("selected","selected");
          $("#professionalSituation option[value='" +data.professionalSituation +"']").attr("selected", "selected");
          $("#scholarity option[value='" + data.scholarity + "']").attr("selected","selected");
          if (data.responsible === true) {
            $("#responsible").attr("checked", "checked");
          } else {
            $("#disabled").attr("checked", "checked");
          }
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
