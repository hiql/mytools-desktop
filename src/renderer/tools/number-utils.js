const toArabic = (romanNumber) => {
  let roman = romanNumber;
  if (typeof roman !== 'string' && !(roman instanceof String))
    throw new TypeError('toArabic expects a string');

  // Zero is/was a special case. I'll go with Dionysius Exiguus on this one as
  // seen on http://en.wikipedia.org/wiki/Roman_numerals#Zero
  if (/^nulla$/i.test(roman) || !roman.length) return 0;

  // Ultra magical regexp to validate roman numbers!
  roman = roman
    .toUpperCase()
    .match(
      /^(M{0,3})(CM|DC{0,3}|CD|C{0,3})(XC|LX{0,3}|XL|X{0,3})(IX|VI{0,3}|IV|I{0,3})$/
    );
  if (!roman) throw new Error('toArabic expects a valid roman number');
  let arabic = 0;

  // Crunching the thousands...
  arabic += roman[1].length * 1000;

  // Crunching the hundreds...
  if (roman[2] === 'CM') arabic += 900;
  else if (roman[2] === 'CD') arabic += 400;
  else arabic += roman[2].length * 100 + (roman[2][0] === 'D' ? 400 : 0);

  // Crunching the tenths
  if (roman[3] === 'XC') arabic += 90;
  else if (roman[3] === 'XL') arabic += 40;
  else arabic += roman[3].length * 10 + (roman[3][0] === 'L' ? 40 : 0);

  // Crunching the...you see where I'm going, right?
  if (roman[4] === 'IX') arabic += 9;
  else if (roman[4] === 'IV') arabic += 4;
  else arabic += roman[4].length * 1 + (roman[4][0] === 'V' ? 4 : 0);
  return arabic;
};

const upToTen = (intNum, one, five, ten) => {
  let num = intNum;
  let value = '';
  switch (num) {
    case 0:
      return value;
    case 9:
      return one + ten;
    case 4:
      return one + five;
    default:
    // Nothing to do
  }
  if (num >= 5) {
    value = five;
    num -= 5;
  }
  while (num > 0) {
    value += one;
    num -= 1;
  }
  return value;
};

const toRoman = (arabicNumber) => {
  let arabic = arabicNumber;
  // Checking input first with type comparisons, convert Number() instances to
  // a literal, etc...
  if (arabic instanceof Number) arabic = parseInt(arabic, 10);
  if (typeof arabic === 'string' || arabic instanceof String) {
    arabic = parseInt(arabic, 10);
    if (Number.isNaN(arabic)) throw new TypeError('toArabic expects a number');
  }
  if (typeof arabic !== 'number')
    throw new TypeError('toArabic expects a number');

  // Rounding up "bad" numbers: NaN, negative numbers, numbers over 3999,...
  if (Number.isNaN(arabic))
    throw new TypeError('toArabic expects a real number');
  if (arabic < 0) throw new Error('toArabic cannot express negative numbers');
  if (arabic > 3999)
    throw new Error('toArabic cannot express numbers over 3999');

  // Zero is/was a special case. I'll go with Dionysius Exiguus on this one as
  // seen on http://en.wikipedia.org/wiki/Roman_numerals#Zero
  if (arabic === 0) return 'nulla';
  let roman = '';

  // Chomping away by the power of tenths
  roman += upToTen(Math.floor(arabic / 1000), 'M', '', '');
  arabic %= 1000;

  roman += upToTen(Math.floor(arabic / 100), 'C', 'D', 'M');
  arabic %= 100;

  roman += upToTen(Math.floor(arabic / 10), 'X', 'L', 'C');
  arabic %= 10;

  roman += upToTen(arabic, 'I', 'V', 'X');
  return roman;
};

const toNewBase = (curNumber, curBase, newBase) => {
  const newBaseConversion = parseInt(curNumber, curBase).toString(newBase);
  return newBaseConversion;
};

export default { toNewBase, toRoman, toArabic };
