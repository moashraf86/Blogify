/* eslint-disable react/prop-types */
import { RiChat3Line } from "@remixicon/react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const CommentButton = ({ post, isPostPage }) => {
  // render two different components based on the LOCATION of the user
  if (isPostPage) {
    return (
      <Button
        label="Write Comment"
        aria-label="Write Comment"
        variant="ghost"
        size="icon"
        className="cursor-pointer text-primary h-11 w-11"
        onClick={() => {
          document.getElementById("commentForm").focus();
        }}
      >
        <RiChat3Line size={24} className="fill-primary" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        asChild
        label="Write Comment"
        aria-label="Write Comment"
        variant="ghost"
        size="icon"
        className="cursor-pointer text-primary h-11 w-11"
      >
        <Link to={`/post/${post.id}#comments`} aria-label="Write a comment">
          <div className="flex items-center">
            <RiChat3Line size={24} className="fill-primary m-1" />
          </div>
        </Link>
      </Button>

      {post.commentsCount > 0 && (
        <p className="text-lg">{post.commentsCount}</p>
      )}
    </div>
  );
};
