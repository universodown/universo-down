/* Abrir e Fechar NavBar */
$(function () {
  "use strict";

  $(".js-menu-toggle").click(function (e) {
    var $this = $(this);

    if ($("body").hasClass("show-sidebar")) {
      $("body").removeClass("show-sidebar");
      $this.removeClass("active");
      $("#sidebar").removeClass("active");
    } else {
      $("body").addClass("show-sidebar");
      $this.addClass("active");
      $("#sidebar").toggleClass("active");
    }

    e.preventDefault();
  });

  /* Click fora da NavBar */
  $(document).mouseup(function (e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("show-sidebar")) {
        $("body").removeClass("show-sidebar");
        $("body").find(".js-menu-toggle").removeClass("active");
      }
    }
    var container = $("#sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("#sidebar").hasClass("active")) {
        $("#sidebar").removeClass("active");
        $("#sidebar").find(".js-menu-toggle").removeClass("active");
      }
    }
  });
});
