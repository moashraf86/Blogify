/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RiLoader4Line } from "@remixicon/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchBookmarksCount } from "../../hooks/useFetchBookmarksCount";
import { SignInModal } from "../shared/SignInModal";
import { PostTitle } from "../shared/PostTitle";
import { PostDescription } from "../shared/PostDescription";
import { PostTags } from "../shared/PostTags";
import { PostImage } from "../shared/PostImage";
import { BookmarkButton } from "../shared/BookmarkButton";
import { OwnerActions } from "../shared/OwnerActions";
import { CommentButton } from "../shared/CommentButton";
import { AuthorName } from "../shared/AuthorName";

export const PostItem = ({ post, handleShowModal, isDeleting }) => {
  const { currentUser, updateUser, signIn } = useContext(AuthContext);
  const { id: userId } = currentUser || {};
  const { id: postId, authorId: id, authorName: name } = post || {};
  const isOwner = currentUser?.id === post.authorId;
  const [bookmarkAlert, setBookmarkAlert] = useState(false);

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
   * Handle Sign In With Google
   */
  const handleGoogleSignIn = () => {
    signIn();
    setBookmarkAlert(false);
  };

  return (
    <div className="flex w-full sm:px-3 mb-6 md:w-1/2 xl:w-1/3 2xl:w-1/4">
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
        <PostImage image={post.image} id={post.id} />
        {/* Content */}
        <div className="flex flex-col gap-2 py-4 px-4 bg-muted/30 border border-t-0 border-border rounded-b-lg flex-grow">
          <PostTags tags={post.tags} />
          <PostTitle
            post={post}
            className="text-nowrap overflow-clip text-ellipsis"
          />
          <PostDescription description={post.description} isFull={false} />
          {/* Footer */}
          <div className="modal relative flex justify-end items-center gap-1 mt-2">
            {post.authorName && (
              <p className="text-muted-foreground me-auto">
                <AuthorName post={{ id, name }} />
              </p>
            )}
            <div className="flex items-center gap-4">
              <BookmarkButton
                post={post}
                currentUser={currentUser}
                isLoading={isLoading}
                bookmarksCountData={bookmarksCountData}
                setBookmarkAlert={setBookmarkAlert}
                updateUser={updateUser}
                refreshCache={refreshCache}
              />
              <CommentButton post={post} />
              {/* Edit/Delete Actions */}
              <OwnerActions
                isOwner={isOwner}
                post={post}
                handleShowModal={handleShowModal}
              />
              {/* Sign in to bookmark alert */}
              <SignInModal
                showModal={bookmarkAlert}
                onCancel={() => setBookmarkAlert(false)}
                handleGoogleSignIn={handleGoogleSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
