var Interpret = (function() {

  // Reference value ranges for arterial blood gas analysis
  function getRefVals() {

    return {

      bicarb: {
        low: (bicarb < 23),
        normal: (bicarb >= 22 && bicarb <= 29),
        high: (bicarb > 29)
      },

      ph: {
        low: (ph < 7.32),
        normal: (ph >= 7.32 && ph <= 7.43),
        high: (ph > 7.43)
      },

      co2: {
        low: (co2 < 30),
        normal: (co2 >= 30 && co2 <= 40),
        high: (co2 > 40)
      }

    };

  }

  function interpret(values) {

    var abg = getRefVals();
    var $interpret = $('#interpret-result');
    abgValues = values;
    bicarb = values.bicarb;
    ph = values.ph;
    co2 = values.co2;
   
    if( abg.ph.normal && abg.co2.normal && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>گاز های خونی نرمال</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>اسیدوز تنفسی حاد</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>اسیدوز تنفسی نیمه جبران شده</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>اسیدوز تنفسی و متابولیک همزمان</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>اسیدوز تنفسی جبران شده</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>آلکالوز تنفسی حاد</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>آلکالوز تنفسی و متابولیک همزمان</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>آلکالوز تنفسی نیمه جبران شده</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>آلکالوز تنفسی جبران شده</h3>");
    }

    else if( abg.ph.low && abg.co2.normal && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>اسیدوز متابولیک حاد</h3>");
    }

    else if( abg.ph.low && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>اسیدوز متابولیک نیمه جبران شده</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>اسیدوز متابولیک جبران شده</h3>");
    }

    else if( abg.ph.high && abg.co2.normal && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>آلکالوز متابولیک حاد</h3>");
    }

    else if( abg.ph.high && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>آلکالوز متابولیک نیمه جبران شده</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>آلکالوز متابولیک جبران شده</h3>");
    }

    else {
      Ui.appendElement($interpret, "<h3>به احتمال بالا تست مشکل داره میخوای یه بار دیگه بفرستش</h3>");
    }

    sendValuesIfValid(values);
    
  }

  function sendValuesIfValid(currentValues) {
    if (!isNaN(currentValues.currentMv) && !isNaN(abgValues.targetCo2)) {
      EVT.emit("abg-interpreted", abgValues);
    }
  }
        
  var bicarb, co2, ph, currentMv, targetCo2, abgValues;

  function init() {
    EVT.on("values-validated", interpret);
    
    bicarb = null;
    co2 = null;
    ph = null;
    currentMv = null;
    targetCo2 = null;
    abgValues = null;
  }

  return {

    init: init,
    getRefVals: getRefVals,
    interpret: interpret

  };

})();

module.exports = Interpret;