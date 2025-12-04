// Take a number an, if more than 999, insert a single comma
// before the last three digits
export const singleComma = (input) => {
  const s = String(input).replace(/,/g, "");
  if (s.length <= 3) return s;
  const prefix = s.slice(0, -3);
  const suffix = s.slice(-3);
  return `${prefix},${suffix}`;
};
