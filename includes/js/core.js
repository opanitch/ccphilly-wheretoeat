!(function(d, s) {
  s = d.head.appendChild(d.createElement("script"));
  s.onload = function() {
    jQuery.jQueryRandom = 0;
    jQuery.extend(jQuery.expr[":"], {
      random: function(a, i, m, r) {
        if (0 === i) jQuery.jQueryRandom = Math.floor(Math.random() * r.length);
        return jQuery.jQueryRandom === i;
      }
    });
    function refresh(e) {
      if (!e.hasOwnProperty("keyCode") || e.keyCode === 32) {
        $("dt").css("display", "");
        $("dt:random").show();
      }
    }
    function show_all(e) {
      $("dl").toggleClass("show-all");
    }
    $("#next").click(refresh);
    $(document).keydown(refresh);
    $("#next").click();
    $("#all").click(show_all);
  };
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
})(document);
