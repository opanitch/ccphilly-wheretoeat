(function(doc, $) {
  var $doc = $(doc),
    classes = {
      active: 'wte-place--choice'
    };

  $.jQueryRandom = 0;
  $.extend($.expr.pseudos, {
    random: function(a, i, m, r) {
      console.log('extend');
      console.log('a', a);
      console.log('i', i);
      console.log('m', m);
      console.log('r', r);
      if (i === 0) {
        $.jQueryRandom = Math.floor(Math.random());
      }

      console.log('i after', i);

      return $.jQueryRandom === i;
    }
  });

  function refresh(e) {
    console.log('refresh', e);
    console.log('refresh keycode', e.keyCode);
    if (!e.hasOwnProperty('keyCode') || e.keyCode === 32) {
      $('dt').removeClass(classes.active);
      $('dt:random').addClass(classes.active);
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
    console.log('starting randomizer');
    applyBindings();
    $('#next').click();
  }

  init();
})(document, jQuery);
