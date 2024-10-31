/* eslint-disable react/prop-types */
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiLoader4Line,
} from "@remixicon/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { addBookmark } from "../../services/addBookmark";
import { removeBookmark } from "../../services/removeBookmark";

export const BookmarkButton = ({
  post,
  currentUser,
  isLoading,
  bookmarksCountData,
  setBookmarkAlert,
  updateUser,
  refreshCache,
}) => {
  const isBookmarked = currentUser?.bookmarks?.includes(post.id);
  const isGuest = currentUser?.isGuest;
  const [Bookmarking, setBookmarking] = useState(false);

  /**
   * Handle Bookmark post - [Add Bookmark, Remove Bookmark]
   * @param {Object} post
   */
  const handleBookmark = (action) => {
    // if the user is not signed in, return
    if (!currentUser || isGuest) {
      setBookmarkAlert(true);
      return;
    }
    // check if the user is offline
    if (!navigator.onLine) {
      alert("You are offline. Please check your internet connection.");
      return;
    }

    action === "add"
      ? addBookmark(post, currentUser, updateUser, setBookmarking, refreshCache)
      : removeBookmark(
          post,
          currentUser,
          updateUser,
          setBookmarking,
          refreshCache
        );
  };
  return (
    <>
      {/* Bookmarks */}
      {isLoading ? (
        <RiLoader4Line size={18} className="fill-primary" />
      ) : (
        <div className="flex items-center gap-1">
          {isBookmarked ? (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer text-primary p-1 h-11 w-11"
              onClick={() => handleBookmark("remove")}
              label="Remove Bookmark"
              aria-label="Remove Bookmark"
            >
              {Bookmarking ? (
                <RiLoader4Line
                  size={24}
                  className="animate-spin duration-600 fill-primary"
                />
              ) : (
                <RiBookmarkFill size={24} className="fill-primary" />
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer text-primary p-1 h-11 w-11"
              onClick={() => handleBookmark("add")}
              label="Add Bookmark"
              aria-label="Add Bookmark"
            >
              {Bookmarking ? (
                <RiLoader4Line
                  size={24}
                  className="animate-spin duration-600 fill-primary"
                />
              ) : (
                <RiBookmarkLine size={24} className="fill-primary" />
              )}
            </Button>
          )}
          {bookmarksCountData > 0 && (
            <p className="text-primary">{bookmarksCountData}</p>
          )}
        </div>
      )}
    </>
  );
};
