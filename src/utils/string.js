import { last, isEmpty, isNil, toLower } from 'ramda';

export const toUpperFirst = (param) => {
  if (typeof param === 'string') {
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  return null;
}

export const toUpperFirstEach = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('-') > 0) {
      str = dashToSpace(param);
    } else {
      str = param;
    }

    let splitString = str.split(" ");
    splitString = splitString.map(s => toUpperFirst(s));
    return splitString.toString().replace(',', ' ');
  }

  return null;
}

export const spaceToDash = (string) => {
  if (string.indexOf(' ') > 0) {
    return string.replace(/\s+/g, '-');
  }

  return string;
}

export const removeSpecialCharacters = (string) => {
  if (string.indexOf('?') > 0) {
    const data = string.replace('?', '');
    return data;
  } else if (string.indexOf('!') > 0) {
    const data = string.replace('!', '');
    return data;
  }

  return string;
}

export const slugify = (string) => {
  if (!isEmpty(string) && !isNil(string)) {
    const slug = spaceToDash(removeSpecialCharacters(string));
    return toLower(slug);
  }

  return '';
}

export const dashToSpace = (string) => {
  if (string.indexOf('-') > 0) {
    const data = string.replace(/-/g, ' ');
    return data;
  }

  return string;
}

export const colonToDash = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf(':') > 0) {
      str = param.toString().replace(/:/g, '-');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

export const toUsdPrice = (param) => {
  if (typeof param === 'string') {
    return `$${param}`;
  }

  return null;
}

export const camelCaseToNormal = (param) => {
  if (typeof param === 'string') {
    const result = param.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return null;
}

export const firstLetterOfEach = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('-') > 0) {
      str = dashToSpace(param);
    } else {
      str = param;
    }

    let splitString = str.split(" ");
    splitString = splitString.map(s => s.substr(0, 1));
    return splitString.toString().replace(',', '');
  }

  return null;
}

export const removeComma = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf(',') > 0) {
      str = param.toString().replace(/,/g, '');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

export const removeDash = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('-') > 0) {
      str = param.toString().replace(/-/g, '');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

export const formatPrice = price => price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const cleanStripeAmount = (param) => {
  let str = param.toString();
  const lastNumber = Number(last(str));
  const splitNumber = str.split('.');

  if (str.indexOf('.') < 0 && (lastNumber === 0 || str.length === 1 || str.length > 1)) {
    str = `${str}00`;
  }

  if (str.indexOf('.') > 0 && splitNumber.length === 2 && splitNumber[1].length === 1) {
    str = `${str}0`;
  }

  if (str.indexOf(',') > 0) {
    str = str.toString().replace(/,/g, '');
  }

  if (str.indexOf('.') > 0) {
    str = str.toString().replace('.', '');
  }

  return Number(str);
}

export const cleanAmount = (param) => {
  let str = param.toString();
  const lastNumber = Number(last(str));
  const splitNumber = str.split('.');

  if (str.indexOf('.') < 0 && (lastNumber === 0 || str.length === 1 || str.length > 1)) {
    str = `${str}.00`;
  }

  if (str.indexOf('.') > 0 && splitNumber.length === 2 && splitNumber[1].length === 1) {
    str = `${str}0`;
  }

  if (str.indexOf(',') > 0) {
    str = str.toString().replace(/,/g, '');
  }

  return str;
}

export const reportAmount = (param) => {
  const paramSplit = param.toString().split('.');
  const paramNoCents = paramSplit[0];

  if (paramNoCents.length === 4) {
    const thousandsSliced = paramNoCents.slice(0, 2);
    const thousandsSplit = thousandsSliced.split('');
    return `${thousandsSplit[0]}.${thousandsSplit[1]}k`;
  } else if (paramNoCents.length === 5) {
    const tenThousandsSliced = paramNoCents.slice(0, 3);
    const tenThousandsSplit = tenThousandsSliced.split('');
    return `${tenThousandsSplit[0]}${tenThousandsSplit[1]}.${tenThousandsSplit[2]}k`;
  } else if (paramNoCents.length === 6) {
    const hundredThousandsSliced = paramNoCents.slice(0, 3);
    const hundredThousandsSplit = hundredThousandsSliced.split('');
    return `${hundredThousandsSplit[0]}${hundredThousandsSplit[1]}${hundredThousandsSplit[2]}k`;
  } else if (paramNoCents.length === 7) {
    const millionsSliced = paramNoCents.slice(0, 2);
    const millionsSplit = millionsSliced.split('');
    return `${millionsSplit[0]}.${millionsSplit[1]}M`;
  } else if (paramNoCents.length === 8) {
    const tenMillionsSliced = paramNoCents.slice(0, 3);
    const tenMillionsSplit = tenMillionsSliced.split('');
    return `${tenMillionsSplit[0]}${tenMillionsSplit[1]}.${tenMillionsSplit[2]}M`;
  } else if (paramNoCents.length === 9) {
    const hundredMillionsSliced = paramNoCents.slice(0, 3);
    const hundredMillionsSplit = hundredMillionsSliced.split('');
    return `${hundredMillionsSplit[0]}${hundredMillionsSplit[1]}${hundredMillionsSplit[2]}M`;
  }

  return paramNoCents;
}

export const toCamelCase = (code) => {
  const updatedCode = code.replace(/\s+(.)/g, function (match, group) {
    return group.toUpperCase();
  });

  return updatedCode.charAt(0).toLowerCase() + updatedCode.slice(1);
}
// Reference: https://stackoverflow.com/questions/24916090/convert-sentence-case-to-camelcase-in-javascript
