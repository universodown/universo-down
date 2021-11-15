import { autocomplete } from "./searchbar.js";

var baseUrlApi = "http://localhost:3000/api/v1";

$(document).ready(function () {
  $("#save-btn").click(function () {
    var name = $("#searchbar-placeholder").val();
    if (name == "") {
      alert("Campo em Branco!!!");
    } else {
      $("input")
        .keyup(function () {
          var value = $(this).val();
          $("#searchbar-placeholder").text(value);
        })
        .keyup();
      var data = {
        name: $("#searchbar-placeholder").val(),
      };
      $.ajax({
        url: $(baseUrlApi) + "/specialities",
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
        },
        error: function (err) {
          alert("Erro Desconhecido!");
        },
      });
    }
  });
});
function arrayOfNAmes() {
  var arrayNames = [];
  $.ajax({
    url:  baseUrlApi + "/user/",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      var myJSON = data;
      $.each(myJSON, function (index, value) {
        // console.log(value.firstName + ' ' + value.lastName);
        //var element = {id: value.id, firstName: value.firstName, lastName: value.lastName };

          //arrayNames[index] = { User: element };
          arrayNames.push({ id: value.id, firstName: value.firstName, lastName: value.lastName });
      
      });
    },
  });
  console.log(arrayNames);
  return arrayNames.toString();
}
autocomplete(document.getElementById("searchBar"), arrayOfNAmes());



$(document).ready(function(){
  function exporst() {

  
    $.ajax({
      url:  baseUrlApi + "/speciality/",
      type: "GET",
      dataType: "JSON",
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      success: function (data) {
        $("#selectSpeciality").empty();
        var myJSON = data;
        $.each(myJSON, function (index, value) {
          $("#selectSpeciality").append("<option value='"+value.id+"'>"+ value.id + " - " + value.name+"</option>");
        })
        
        $("#selectSpeciality").on('change', function(){
          var selectedCountry = $(this).children("option:selected").val();
          console.log("selected item" + selectedCountry);
        });
      },
    });
  }

  });

  export { exporst };
   