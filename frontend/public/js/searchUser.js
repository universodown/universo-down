var baseUrlApi = "http://ec2-3-88-10-95.compute-1.amazonaws.com:3000/api/v1";
import erroHandler from '../js/fns/erroHandler.js';

function autocomplete(inp, arr) {
  var currentFocus;
  try {
    inp.addEventListener("input", function (e) {
      var a,
        b,
        val = this.value;
      closeAllLists();

      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      for (const [key, value] of Object.entries(arr)) {
        window.localStorage.removeItem("userId");
        if (
          value.name.substr(0, val.length).toLowerCase() == val.toLowerCase()
        ) {
          b = document.createElement("DIV");
          var c = document.createAttribute("CLASS");
          c.value = "divclass";
          b.setAttributeNode(c);
          b.innerHTML =
            "<strong>" + value.name.substr(0, val.length) + "</strong>";
          b.innerHTML += value.name.substr(val.length);
          b.innerHTML +=
            "<input type='hidden' id='" +
            value.id +
            "' value='" +
            value.name +
            "'>";
          b.addEventListener("click", function (e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            inp.id = this.getElementsByTagName("input")[0].id;
            localStorage.setItem("userId", inp.id);

            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
  } catch (error) {
    alert(error);
  }

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function arrayOfNAmes() {
  var arrayNames = [];
  $.ajax({
    url: baseUrlApi + "/user",
    type: "GET",
    dataType: "JSON",
    headers: {
      "x-access-token": localStorage.getItem("Authorization"),
    },
    success: function (data) {
      $.each(data, function (index, value) {
        value.userRole == "professional"
          ? arrayNames.push({
              id: value.id,
              name: value.firstName + " " + value.lastName
            })
          : null;
      });
    },
    error: function (err) {
      erroHandler(err.status);
    },
  });
  return arrayNames;
}
autocomplete(document.getElementById("searchUser"), arrayOfNAmes());
