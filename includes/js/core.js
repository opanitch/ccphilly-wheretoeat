(function(doc, $) {
  var $doc = $(doc),
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
    var hash = window.location.hash ? window.location.hash : 'kop';

    activeList = hash;
  }

  function getChoice() {
    var $currentList = $('.wte-place-list').filter('#' + activeList),
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
      .filter('#' + listId)
      .addClass(classes.showAll);
  }

  function handleUserAction(event) {
    var keyPress =
        event.hasOwnProperty('keyCode') && event.keyCode === 32 ? true : false,
      btnPress = !event.hasOwnProperty('keyCode'),
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

  function applyBindings() {
    // Refresh on Next Button click
    $doc.on('click', '#next', handleUserAction);
    // Refresh on key press
    $doc.on('keydown', handleUserAction);
    // Show All Button click
    $doc.on('click', '#show-all', function() {
      showAll(activeList);
    });
  }

  function init() {
    // if restaurant list exists
    applyBindings();
    setActiveList();
    setChoice(getChoice());
  }

  init();
})(document, jQuery);
