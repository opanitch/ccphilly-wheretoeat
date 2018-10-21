(function(doc, $) {
  var $win = $(window),
    $doc = $(doc),
    activeList = '',
    classes = {
      active: 'wte-place--choice',
      showAll: 'wte-place-list--show'
    };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setActiveList() {
    var pageLists = $('.wte-place-list'),
      hash = window.location.hash ? window.location.hash : '#kop';

    if (pageLists.filter(hash).length > 0) {
      activeList = hash;
    }
  }

  function getChoice() {
    var $currentList = $('.wte-place-list').filter(activeList),
      $listItems = $currentList.find('li'),
      randomNum = getRandomInt(0, $listItems.length);

    return $listItems.eq(randomNum);
  }

  function setChoice($choice) {
    var content = $choice.html(),
      $displayChoice = $('#displayChoice');

    $displayChoice.html(content);
  }

  function hideAll() {
    $('.wte-place-list').removeClass(classes.showAll);
  }

  function showAll(listId) {
    $('.wte-place-list')
      .filter(listId)
      .addClass(classes.showAll);
  }

  function handleUserAction(event) {
    var keyPress = event.keyCode && event.keyCode === 32 ? true : false,
      btnPress = !event.keyCode,
      $nextChoice,
      isListVisible =
        $('.wte-place-list').filter('.' + classes.showAll).length > 0;

    if (isListVisible) {
      hideAll();
    }

    if (keyPress || btnPress) {
      $nextChoice = getChoice();
      setChoice($nextChoice);
    }
  }

  function handleHashChange(event) {
    setActiveList();
    handleUserAction(event);
  }

  function applyBindings() {
    // Refresh on Next Button click
    $doc.on('click', '#next', handleUserAction);
    // Refresh on key press
    $doc.on('keydown', handleUserAction);
    // Show All Button click
    $doc.on('click', '#show-all', function() {
      showAll(activeList);
    });
    // Change active list
    $win.on('hashchange', handleHashChange);
  }

  function init() {
    var $choice;

    // if restaurant list exists
    applyBindings();
    setActiveList();
    $choice = getChoice();
    setChoice($choice);
  }

  init();
})(document, jQuery);
