// Generate post count label with proper pluralization
export const postCountLabel = (count) => {
  return count === 1 ? '1 post' : `${count} posts`;
};