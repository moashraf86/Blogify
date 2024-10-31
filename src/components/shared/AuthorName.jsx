/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const AuthorName = ({ post }) => {
  const { id, name } = post;
  return (
    <Link to={`/users/${id}`} className="hover:text-primary hover:underline">
      {name}
    </Link>
  );
};
