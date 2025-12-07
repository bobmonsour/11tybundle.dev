// Generate a count label with proper pluralization of the "type"
export const countLabel = (count, type) => {
  return count === 1 ? `1 ${type}` : `${count} ${type}s`;
};
