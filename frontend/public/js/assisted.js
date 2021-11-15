var baseurl = window.location.origin + window.location.pathname;
var baseUrlApi = "http://localhost:3000/api/v1";

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

function encodeImgToBase64() {
  var selectedfile = document.getElementById("photo").files;
  if (selectedfile.length > 0) {
    var imageFile = selectedfile[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      var newImage = document.createElement("img");
      newImage.src = srcData;
      document.getElementById("txt").value = newImage.outerHTML;
    };
    fileReader.readAsDataURL(imageFile);
  }
}

$(document).ready(function () {
  $("#save-btn").click(function () {
    var hasBenefits = document.querySelector("input[name=hasBenefits]").checked
      ? true
      : false;
    var active = document.querySelector("input[name=active]").checked
      ? true
      : false;
    var data = {
      name: $("#name").val(),
      email: $("#email").val(),
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
      photo: $("#txt").val(),
      hasBenefits: hasBenefits,
      active: active,
      socialIdentificationNumber: $("#socialIdentificationNumber").val(),
    };

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
        alert("Cadastro Realizado!");
      },
      error: function (err) {
        if (err.status == 304) {
          alert("Not Modified!!");
        }
        if (err.status == 400) {
          alert("Estrutura de requisição inválida!!");
        }
        if (err.status == 401) {
          alert("Usuário não possui permissão para esta ação!");
        }
        if (err.status == 500) {
          alert("O servidor encontrou uma situação com a qual não sabe lidar");
        } else {
          alert(err + "ERRO " + JSON.stringify(err));
        }
      },
    });
  });
});

/*
var hasBenefits = document.getElementsByName("hasBenefits")[0].checked? 'Sim' : 'Não';
var active = document.getElementsByName("active")[0].checked? 'Sim' : 'Não';
console.log(hasBenefits);
console.log(active);
*/
