(function(doc, $) {
  var $doc = $(doc);

  $.jQueryRandom = 0;
  $.extend($.expr[':'], {
    random: function(a, i, m, r) {
      if (i === 0) {
        $.jQueryRandom = Math.floor(Math.random() * r.length);
      }

      return $.jQueryRandom === i;
    }
  });

  function refresh(e) {
    if (!e.hasOwnProperty('keyCode') || e.keyCode === 32) {
      $('dt').css('display', '');
      $('dt:random').show();
    }
  }

  function showAll() {
    $('dl').toggleClass('show-all');
  }

  function applyBindings() {
    // Refresh on Next Button click
    $doc.on('click', '#next', refresh);
    // Refresh on key press
    $doc.on('keydown', refresh);
    // Show All Button click
    $doc.on('click', '#all', showAll);
  }

  function init() {
    // if restaurant list exists
    applyBindings();
    $('#next').click();
  }

  init();
})(document, jQuery);
