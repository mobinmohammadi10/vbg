var Ui = (function() {

  function appendElement(parent, ele) {
    parent.append(ele);
  }

  function toggleErrorMsg(state, ele) {
    state ? ele.hide() : ele.show();
  }

  function removePreviousResults(ele) {
    ele.remove();
  }

  var $interpretResult, $calcResult;

  function init() {

    EVT.on('form-cleared', function() {
      $interpretResult = $('#interpret-result').find('h3');
      $calcResult = $('#calc-result').find('h3');
      removePreviousResults.call(this, $interpretResult);
      removePreviousResults.call(this, $calcResult);
    });

  }

  return {
    init: init,
    appendElement: appendElement,
    toggleErrorMsg: toggleErrorMsg
  };

})(); 