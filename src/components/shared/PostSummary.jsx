/* eslint-disable react/prop-types */
export const PostSummary = ({ words, blocks, readTime }) => {
  return (
    <div className="flex items-center gap-2">
      <p>
        {words} word{words > 1 && "s"}
      </p>
      <p>
        {blocks} paragraph{blocks > 1 && "s"}
      </p>
      <p>{readTime} min read</p>
    </div>
  );
};
