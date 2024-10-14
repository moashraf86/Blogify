/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export const PostHead = ({ post }) => {
  const { tags, id, title } = post;

  return (
    <div className="px-6 md:px-10 w-full max-w-4xl mx-auto">
      {/* Post Tag */}
      {tags && (
        <ul className="flex items-center gap-2 mb-3">
          {tags.map((tag, i) => (
            <li
              key={i}
              className="bg-accent py-1 px-3 rounded-full text-muted-foreground text-xs font-medium uppercase tracking-widest"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {/* Post Title */}
      <h3 className="text-2xl md:text-4xl text-primary font-bold capitalize mb-6">
        <Link to={`/post/${id}`}>{title}</Link>
      </h3>
      {/* Post Description */}
      {post.description && (
        <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
      )}
    </div>
  );
};
