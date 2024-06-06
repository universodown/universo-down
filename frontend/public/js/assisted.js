var baseUrlApi = "http://3.130.150.80/api/v1";
import erroHandler from "../js/fns/erroHandler.js";
$(document).ready(function () {
  //phone
  $("#phone").mask("(99) 99999-9999");

  //identification
  $("#identification").mask("999.999.999-99");

  //generalRegistration
  $("#generalRegistration").mask("999.999.999-9");

  //zipCode
  $("#zipCode").mask("99999-999");

  //issuer
  $("#issuer").mask("AAA/AA");
});

$(document).ready(function () {
  window.localStorage.removeItem("assistedId");
  $("#form").submit(function (e) {
    e.preventDefault();

    var hasBenefits = document.querySelector("input[name=hasBenefits]").checked
      ? true
      : false;
    if (hasBenefits === false) {
      active = false;
    } else {
      var active = document.querySelector("input[name=active]").checked
        ? true
        : false;
    }

    var photo = $("#txt").val();
    var data = {
      name: $("#name").val(),
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
      scholarity: $("#scholarity").val(),
      naturalness: $("#naturalness").val(),
      nationality: $("#nationality").val(),
      occupation: $("#occupation").val(),
      nationalIdentity: $("#nationalIdentity").val(),
      additionalInformation: $("#additionalInformation").val(),
      photo: photo,
      hasBenefits: hasBenefits,
      active: active,
      benefits: $("#benefits").val(),
      socialIdentificationNumber: $("#socialIdentificationNumber").val(),
    };

    try {
      $.ajax({
        url: baseUrlApi + "/assisted",
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
  });
});

//Update
$("#formUpdate").submit(function (e) {
  e.preventDefault();
  var id = document.getElementById("id");
  var name = document.getElementById("name");
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
  var scholarity = document.getElementById("scholarity");
  var naturalness = document.getElementById("naturalness");
  var nationality = document.getElementById("nationality");
  var occupation = document.getElementById("occupation");
  var nationalIdentity = document.getElementById("nationalIdentity");
  var additionalInformation = document.getElementById("additionalInformation");
  var benefits = document.getElementById("benefits");
  var socialIdentificationNumber = document.getElementById("socialIdentificationNumber");
  var photo = document.getElementById("preview");

  var hasBenefits = document.querySelector("input[name=hasBenefits]").checked
      ? true
      : false;
    if (hasBenefits === false) {
      active = false;
    } else {
      var active = document.querySelector("input[name=active]").checked
        ? true
        : false;
    }

  var data = {
    id: id.value,
    name: name.value,
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
    scholarity: scholarity.value,
    naturalness: naturalness.value,
    nationality: nationality.value,
    occupation: occupation.value,
    nationalIdentity: nationalIdentity.value,
    additionalInformation: additionalInformation.value,
    hasBenefits: hasBenefits,
    photo: photo.src,
    active: active,
    benefits: benefits.value,
    socialIdentificationNumber: socialIdentificationNumber.value,
  };
  

  try {
    $.ajax({
      url: baseUrlApi + "/assisted/" + id.value,
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
          window.location.href = "../../html/listar/assisted.html";
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
      url: baseUrlApi + "/assisted",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      dataType: "JSON",
      success: function (data) {
        var table = $("#assistedsTable").DataTable({
          language: {
            url: "../../public/json/DataTable_pt_br.json",
          },
          columnDefs: [
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
              data: "name",
            },
            {
              data: "identification",
            },
          ],
        });
      },
      error: function (err) {
        alert("erro" + JSON.stringify(err));
      },
    });
    $("#assistedsTable").on("click", ".btn-primary", function () {
      var id = $(this).attr("id").match(/\d+/)[0];
      var data = $("#assistedsTable").DataTable().row(id).data();
      window.location.href = "../editar/assisted.html?id=" + data.id;
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
        url: baseUrlApi + "/assisted/" + id,
        headers: {
          "x-access-token": localStorage.getItem("Authorization"),
        },
        dataType: "JSON",
        success: function (data) {
          $("#id").attr("value", data.id);
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
          $("#additionalInformation").attr("value", data.additionalInformation);
          $("#occupation").attr("value", data.occupation);
          $("#benefits").attr("value", data.benefits);
          $("#state option[value='" + data.state + "']").attr(
            "selected",
            "selected"
          );
          $("#gender option[value='" + data.gender + "']").attr(
            "selected",
            "selected"
          );
          $("#scholarity option[value='" + data.scholarity + "']").attr(
            "selected",
            "selected"
          );
          if (data.hasBenefits === true && data.active === true) {
            $("#hasBenefits").attr("checked", "checked");
            $("#active").attr("checked", "checked");
          } else {
            $("#disabled").attr("checked", "checked");
            $("#disable2").attr("checked", "checked");
          }
          var profile = new Image();
          profile = data.photo;
          $("#preview").attr("src", profile);
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

export function loadImg(photo) {
  var profile = new Image();
  profile.src = photo;
  document.body.appendChild(profile);
}
