/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchBookmarksCount } from "../../hooks/useFetchBookmarksCount";
import { SignInModal } from "../shared/SignInModal";
import { PostActions } from "../shared/PostActions";

export const PostFooter = ({ post, comments }) => {
  const { currentUser, updateUser, signIn } = useContext(AuthContext);
  const { id: userId, isGuest } = currentUser || {};
  const { id: postId } = post || {};
  const [bookmarkAlert, setBookmarkAlert] = useState(false);

  /**
   * Refresh the query cache
   */
  const queryClient = useQueryClient(); // Correctly use the hook
  const refreshCache = () => {
    queryClient.invalidateQueries(["bookmarksCount", postId]);
    queryClient.invalidateQueries(["bookmarks", userId]);
  };

  // destructure the data from the custom hook
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
    <div className="flex justify-between items-center py-3 px-6 md:px-10 border-border w-full max-w-4xl mx-auto mb-6">
      <PostActions
        post={post}
        comments={comments}
        currentUser={currentUser}
        isGuest={isGuest}
        isLoading={isLoading}
        updateUser={updateUser}
        refreshCache={refreshCache}
        bookmarksCountData={bookmarksCountData}
        setBookmarkAlert={setBookmarkAlert}
      />
      <SignInModal
        showModal={bookmarkAlert}
        onCancel={() => setBookmarkAlert(false)}
        handleGoogleSignIn={handleGoogleSignIn}
      />
    </div>
  );
};
