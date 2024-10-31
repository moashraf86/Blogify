/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { BookmarkButton } from "./BookmarkButton";
import { CommentButton } from "./CommentButton";
import { useLocation } from "react-router-dom";
import { ShareButton } from "./ShareButton";

export const PostActions = ({
  post,
  currentUser,
  isLoading,
  updateUser,
  refreshCache,
  bookmarksCountData,
  setBookmarkAlert,
}) => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isPostPage = location.pathname.startsWith("/post");

  /**
   * Detect scroll direction and show/hide the actions bar
   */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed ${
        scrollDirection === "up" ? "bottom-6" : "-bottom-full"
      } transition-[bottom] duration-200 left-1/2 -translate-x-1/2 py-2 px-4 bg-muted/50 backdrop-blur rounded-full border border-border z-10 flex items-center gap-4`}
    >
      <BookmarkButton
        post={post}
        currentUser={currentUser}
        isLoading={isLoading}
        bookmarksCountData={bookmarksCountData}
        setBookmarkAlert={setBookmarkAlert}
        updateUser={updateUser}
        refreshCache={refreshCache}
      />
      <CommentButton post={post} isPostPage={isPostPage} />
      <ShareButton post={post} />
    </div>
  );
};
