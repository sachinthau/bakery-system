export function localeString(x, sep, grp) {
  let sx = ('' + x).split('.'),
    s = '',
    i,
    j;
  sep || (sep = ',');
  grp || grp === 0 || (grp = 3);
  i = sx[0].length;
  while (i > grp) {
    j = i - grp;
    s = sep + sx[0].slice(j, i) + s;
    i = j;
  }
  s = sx[0].slice(0, i) + s;
  sx[0] = s;
  return sx.join('.');
}

export function centsFormat(value) {
  let strValue = Number(value).toFixed(2).toString();
  let cents = strValue.split('.')[1];
  return '.' + cents;
}

export function dollarFormat(value) {
  let strValue = Number(value).toFixed(2).toString();
  let whole = strValue.split('.')[0];
  whole = value < 0 ? whole.split('-')[1] : whole;
  strValue = localeString(whole);

  return value < 0 ? '-' + strValue : strValue;
}
