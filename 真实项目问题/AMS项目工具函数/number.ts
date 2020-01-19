export function isNumber(num: number) {
  return typeof num === "number";
}

export function nullToNaN(num: number) {
  return num === null ? NaN : num;
}

export function float(
  num: number,
  precision?: number,
  label: string = "",
  parse: boolean = true
) {
  const accuracy = isNumber(precision) ? precision : 2;
  if (!isNumber(num) || isNaN(num)) return "-";
  return parse
    ? parseFloat(num.toFixed(accuracy)) + label
    : num.toFixed(accuracy) + label;
}

export function percentage(num: number, precision?: number) {
  const accuracy = isNumber(precision) ? precision : 2;
  if (!isNumber(num) || isNaN(num)) return "-";
  return `${(num * 100).toFixed(accuracy)}%`;
}

export function toPnl(
  singleDigit: number,
  label: string,
  num: number | string,
  precision: number = 2
) {
  if (!isNumber(num as number) || isNaN(num as number)) return "-";
  return float(Number(num) / singleDigit, precision, label);
}

export function toPnlFilter(
  num: number | string,
  currencyUnit: string,
  precision: number = 2
) {
  switch (currencyUnit) {
    case "singleDigit":
      return toPnl(1, "", num, precision);
    case "tenThousand":
      return toPnl(10_000, "万", num, precision);
    case "hundredMillion":
      return toPnl(100_000_000, "亿", num, precision);
    default:
      return "-";
  }
}
