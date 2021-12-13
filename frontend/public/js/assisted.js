var baseUrlApi = 'http://ec2-3-88-10-95.compute-1.amazonaws.com:3000/api/v1';
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
      

    if (checkProperties(data) === false) {
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
    } else {
      alert("Campo(s) em branco");
    }
  });
});
