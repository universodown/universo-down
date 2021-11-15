function autocomplete(inp, arr) {
  /*A função autocomplete recebe dois argumentos,
  o elemento do campo text e um array de possiveis combinções*/
  var currentFocus;
  /*Executa a funcção quando digita no campo texto*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*Fecha qualquer outra lista aberta com valores de autocomplete*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*Cria uma DIV que vai conter os itens*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*Anexa a DIV como uma filha do container autocomplete*/
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      /*Verifica-se se começa com a letra digitada:*/
      if (
        arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        /*Cria uma DIV para cada resultado:*/
        b = document.createElement("DIV");
        /*Negrito na primeira letra*/
        b.innerHTML =
          "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*Executa a funçao quando há um clique em um resultado da lista*/
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*keypress*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*40 = seta para baixo*/
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      /*38 = seta para cima*/
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      /*13 = enter*/
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*classificar o item como "active":*/
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*remove o "active"*/
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
export { autocomplete };