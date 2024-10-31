/* eslint-disable react/prop-types */
export const PostMeta = ({ date, readTime }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground text-sm">{date}</p>
      <span className="text-muted-foreground">&#8226; </span>
      <p className="text-muted-foreground text-sm">{readTime} min read</p>
    </div>
  );
};
