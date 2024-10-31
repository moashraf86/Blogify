/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

export const PostTitle = ({ post }) => {
  const location = useLocation();
  const isPostPage = location.pathname.startsWith("/post");
  const { title, id } = post;

  if (isPostPage) {
    return (
      <h1 className="text-2xl md:text-4xl text-primary font-bold capitalize mb-6">
        {title}
      </h1>
    );
  }
  return (
    <h3 className="text-xl md:text-2xl text-primary text-nowrap overflow-clip text-ellipsis font-bold capitalize">
      <Link to={`/post/${id}`}>{title}</Link>
    </h3>
  );
};
