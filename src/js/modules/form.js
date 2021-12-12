var Form = (function() {

  function isValidNumber(val) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    var isValid = regExFloat.test(val);

    return isValid;
  }

  function updateState(field, state, validState) {
    validState[field] = state;

    return validState;
  }

  function allValid(e, validState) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var valid = true;

    Object.keys(validState).forEach(function(key) {
      if (!validState[key] && (key === 'ph' || key === 'bicarb' || key === 'co2')) {
        valid = false;
      }
    });

    return valid;
  }

  function getCurrentValues() {
    return {
      ph: ph.value,
      co2: co2.value,
      bicarb: bicarb.value,
    };
  }

  function emitEvents(currentValues) {
    EVT.emit("form-cleared");
    EVT.emit("values-validated", currentValues);
  }

  function parseValues(values) {

    Object.keys(values).forEach(function(key) {
      values[key] = parseFloat(values[key]);
    });

    return values;
  }

  validState = {
    ph: false,
    co2: false,
    bicarb: false
  };

  var $errorMsg, validState, currentValues;

  function init() {

    $errorMsg = $('.error-msg');
    $form = $('form');
    $resetBtn = $();

    $form.on('click', "[type='submit']", function(e) {
      var isValid = allValid.call(this, e, validState);
      isValid ? currentValues = parseValues(getCurrentValues()) : Ui.toggleErrorMsg(isValid, $errorMsg);
      if (isValid) emitEvents(currentValues);
    });

    $form.on('keyup', "input[type='text']", function(e) {
      var isValid = isValidNumber.call(this, this.value);
      Ui.toggleErrorMsg(isValid, $errorMsg);
      updateState(e.target.name, isValid, validState);
    });

    $form.on('blur', "input[type='text']", function(e) {
      isValidNumber.call(this, e, this.value);
    });

    $form.on('click', "[type='reset']", function() {
      EVT.emit("form-cleared");
    });

  }

  return {

    init: init,
    isValidNumber: isValidNumber,
    updateState: updateState,
    parseValues: parseValues,

  };

})();

module.exports = Form;