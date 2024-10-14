/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiChat3Line,
  RiLoader4Line,
  RiMore2Fill,
} from "@remixicon/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { GoogleIcon } from "../shared/GoogleIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchBookmarksCount } from "../../hooks/useFetchBookmarksCount";
import { addBookmark } from "../../services/addBookmark";
import { removeBookmark } from "../../services/removeBookmark";

export const PostItem = ({ post, handleShowModal, isDeleting }) => {
  const { currentUser, updateUser, signIn } = useContext(AuthContext);
  const { id: userId } = currentUser || {};
  const { id: postId } = post || {};
  const isGuest = currentUser?.isGuest;
  const isOwner = currentUser?.id === post.authorId;
  const isBookmarked = currentUser?.bookmarks.includes(post.id);
  const [bookmarkAlert, setBookmarkAlert] = useState(false);
  const [Bookmarking, setBookmarking] = useState(false);

  /**
   * Refresh the query cache after adding or removing a bookmark
   */
  const queryClient = useQueryClient(); // Correctly use the hook
  const refreshCache = () => {
    queryClient.invalidateQueries(["bookmarksCount", postId]);
    queryClient.invalidateQueries(["bookmarks", userId]);
  };

  /**
   * Fetch Bookmarks Count
   */
  const { data: bookmarksCountData, isLoading } =
    useFetchBookmarksCount(postId);

  /**
   * Handle Add Bookmark
   */
  const handleAddBookmark = (post) => {
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

    addBookmark(post, currentUser, updateUser, setBookmarking, refreshCache); // Add Bookmark
  };

  /**
   * Handle Remove Bookmark
   */
  const handleRemoveBookmark = (post) => {
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

    removeBookmark(post, currentUser, updateUser, setBookmarking, refreshCache); // Remove Bookmark
  };

  /**
   * Handle Sign In With Google
   */
  const handleGoogleSignIn = () => {
    signIn();
    setBookmarkAlert(false);
  };

  return (
    <div className="flex w-full sm:px-3 mb-6 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
      <div className="relative flex flex-col w-full rounded-t-lg overflow-clip">
        {isDeleting ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-lg backdrop-blur-md">
            <RiLoader4Line
              size={32}
              className="animate-spin duration-500 fill-primary"
            />
          </div>
        ) : null}
        {/* Image */}
        <div className="h-[270px] max-h-[270px] bg-gradient-to-r from-zinc-400 to-zinc-800">
          <Link to={`/post/${post.id}`}>
            {post.image.src && (
              <img
                src={post.image.src}
                alt={post.image.alt}
                className="h-full w-full object-cover rounded-md rounded-bl-none rounded-br-none"
              />
            )}
          </Link>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-2 py-4 px-4 bg-muted/30 border border-t-0 border-border rounded-b-lg flex-grow">
          {/* Tags */}
          {post.tags && (
            <ul className="flex items-center gap-2">
              {post.tags.map((tag, i) => (
                <li
                  key={i}
                  className="bg-accent py-1 px-3 rounded-full text-muted-foreground text-xs font-medium uppercase tracking-widest"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {/* Title */}
          <h3 className="text-xl md:text-2xl text-primary font-bold capitalize text-nowrap overflow-clip text-ellipsis">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          {/* description */}
          <p className="text-muted-foreground break-words">
            {post.description
              ? post.description.length > 150
                ? `${post.description.substring(0, 150)}...`
                : post.description
              : "No description"}
          </p>
          {/* Footer */}
          <div className="modal relative flex justify-end items-center gap-1 mt-2">
            {post.authorName && (
              <p className="text-muted-foreground me-auto">
                By{" "}
                <Link
                  to={`/users/${post.authorId}`}
                  className="hover:text-primary hover:underline"
                >
                  {post.authorName}
                </Link>
              </p>
            )}

            <div className="flex items-center gap-4">
              {/* Bookmarks */}
              {isLoading ? (
                <RiLoader4Line size={18} className="fill-primary" />
              ) : (
                <div className="flex items-center">
                  {isBookmarked ? (
                    <button
                      className="cursor-pointer text-primary p-1"
                      onClick={() => handleRemoveBookmark(post)}
                      aria-label="Remove Bookmark"
                    >
                      {Bookmarking ? (
                        <RiLoader4Line
                          size={18}
                          className="animate-spin duration-600 fill-primary"
                        />
                      ) : (
                        <RiBookmarkFill size={18} className="fill-primary" />
                      )}
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer text-primary p-1"
                      onClick={() => handleAddBookmark(post)}
                      aria-label="Add Bookmark"
                    >
                      {Bookmarking ? (
                        <RiLoader4Line
                          size={18}
                          className="animate-spin duration-600 fill-primary"
                        />
                      ) : (
                        <RiBookmarkLine size={18} className="fill-primary" />
                      )}
                    </button>
                  )}
                  <p className="text-primary">
                    {bookmarksCountData > 0 && bookmarksCountData}
                  </p>
                </div>
              )}

              {/* comments */}
              {post.commentsCount > 0 && (
                <Link to={`/post/${post.id}`} aria-label="View Comments">
                  <div className="flex items-center">
                    <RiChat3Line size={18} className="fill-primary m-1" />
                    <p className="text-lg">{post.commentsCount}</p>
                  </div>
                </Link>
              )}
              {/* Edit/Delete Dropdown */}
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
              {/* Sign in to bookmark alert */}
              <AlertDialog open={bookmarkAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Want to bookmark this post?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Sign in with Google to save it to your account and access
                      it anytime!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setBookmarkAlert(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="md:text-base flex gap-[10px]"
                      onClick={() => handleGoogleSignIn()}
                    >
                      <GoogleIcon />
                      Sign in with Google
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
