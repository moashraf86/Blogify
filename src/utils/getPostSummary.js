/**
 * Calculate the total number of words in the content and the number of blocks (paragraphs)
 * @param {string} content - The content to be analyzed
 * @returns {Object} - An object containing the total number of words and the number of blocks
 */

export const calcContentSummary = (content) => {
  let contentWords = 0;
  let blocksCount = 0;
  let readTime = 0;
  Object.values(content).forEach((block) => {
    blocksCount++; // Increment the block count	for each block
    const blockValue = block.value;
    if (blockValue) {
      blockValue.forEach((value) => {
        const children = value.children;
        if (children) {
          children.forEach((child) => {
            const words = child.text;
            // calculate the total number of words in the content
            contentWords += words
              .split(" ")
              .filter((word) => word !== "").length;

            // calc reading time based on the total number of words
            const wordsPerMinute = 200; // Average reading speed (can be adjusted)
            const totalWords = contentWords;
            readTime = Math.ceil(totalWords / wordsPerMinute); // Calculate the read time, rounded up
          });
        }
      });
    }
  });

  return { contentWords, blocksCount, readTime };
};
