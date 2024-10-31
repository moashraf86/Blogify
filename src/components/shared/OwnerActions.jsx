/* eslint-disable react/prop-types */
import { RiMore2Fill } from "@remixicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

export const OwnerActions = ({ isOwner, post, handleShowModal }) => {
  return (
    <>
      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-primary cursor-pointer p-1"
            aria-label="Trigger popover to edit or delete post"
          >
            <RiMore2Fill size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                to={`/edit/${post.id}`}
                className="w-full"
                aria-label="Edit Post"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium text-danger focus:text-danger"
              onSelect={() => handleShowModal(post)}
              aria-label="Delete Post"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
