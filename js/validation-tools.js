class ValidationTools {

  static isUndef(value) {
    return value === undefined;
  }

  static isAnyUndef(...args) {
    for (let arg of args)
      if (arg === undefined) return true;
    return false;
  }

  static isEmpty(value) {
    return value === '';
  }

  static isNull(value) {
    return value === null;
  }

  static isString(value) {
    return typeof value === 'string';
  }

  static isNumber(value) {
    return typeof value === 'number';
  }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  static isDegree360(value) {
    return ValidationTools.isNumber(value) && value >= 0 && value <= 360;
  }

  static isDegree90(value) {
    return ValidationTools.isNumber(value) && value >= 0 && value <= 90;
  }

  static isNegative(value) {
    return ValidationTools.isNumber(value) && value < 0;
  }

  static isPositive(value) {
    return ValidationTools.isNumber(value) && value > 0;
  }

  static isZeroOrPositive(value) {
    return ValidationTools.isNumber(value) && value >= 0;
  }

  static isFlip(value) {
    return ValidationTools.isString(value) && value === 'left' || value === 'right' || value === 'none';
  }

  static isFunction(value) {
    return typeof value === 'function'
  }

  static isInstanceOfGameScreen(value) {
    return value instanceof GameScreen
  }

  static existsUrl(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    return request.status === 200;
  }

  static checkUndef(parameterName, value) {
    if (ValidationTools.isUndef(value)) {
      if (parameterName.includes('stages')) {
        debugger
      }
      else {
        throw new Error(`The ${parameterName} is required`);
      }
    }
    return true;
  }

  static checkEmpty(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (ValidationTools.isEmpty(value)) throw new Error(`The ${parameterName} cannot be empty string`);
    return true;
  }

  static checkNull(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (ValidationTools.isNull(value)) throw new Error(`The ${parameterName} cannot be null`);
    return true;
  }

  static checkNumber(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isNumber(value)) throw new Error(`The ${parameterName} must be a number`);
    return true;
  }

  static checkBoolean(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isBoolean(value)) throw new Error(`The ${parameterName} must be a boolean (true or false)`);
    return true;
  }

   static checkDegree360(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isDegree360(value)) throw new Error(`The ${parameterName} must be a degree with value between 0 and 360`);
    return true;
  }

  static checkDegree90(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isDegree90(value)) throw new Error(`The ${parameterName} must be a degree with value between 0 and 90`);
    return true;
  }

  static checkNegative(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (ValidationTools.isNegative(value)) throw new Error(`The ${parameterName} cannot be negative`);
    return true;
  }

  static checkPositive(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isPositive(value)) throw new Error(`The ${parameterName} must be Positive`);
    return true;
  }

  static checkZeroOrPositive(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isZeroOrPositive(value)) throw new Error(`The ${parameterName} must be zero or positive value`);
    return true;
  }

  static checkFlip(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isFlip(value)) throw new Error(`The ${parameterName} must be one of this flip values: left, right or none`);
    return true;
  }

  static checkFunction(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isFunction(value)) throw new Error(`The ${parameterName} must be a function`);
    return true;
  }

  static ckechIsInstanceOfGameScreen(parameterName, value) {
    ValidationTools.checkUndef(parameterName, value);
    if (!ValidationTools.isInstanceOfGameScreen(value)) throw new Error(`The ${parameterName} must be an instance of GameScreen`);
    return true;
  }

  static checkUrl(parameterName, url) {
    ValidationTools.checkUndef(parameterName, url);
    if (!ValidationTools.existsUrl(url)) throw new Error(`The ${parameterName} does not exist, cannot find url "${url}"`);
    return true;
  }

}