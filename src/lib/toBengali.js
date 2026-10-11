const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(input) {
  if (input === null || input === undefined) return "";
  return String(input).replace(/[0-9]/g, (d) => BN[+d]);
}

export function bnNumber(num, decimals = 0) {
  if (num === null || num === undefined || isNaN(num)) return "০";
  const fixed = Number(num).toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withComma = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBn(decPart ? `${withComma}.${decPart}` : withComma);
}