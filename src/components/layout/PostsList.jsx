/* eslint-disable react/prop-types */
import { useState } from "react";
import { PostItem } from "./PostItem";
import { Pagination } from "../shared/Pagination";
import { Filter } from "../shared/Filter";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { RiErrorWarningLine, RiInformationLine } from "@remixicon/react";
import { useFetchedPosts } from "../../hooks/useFetchPosts";
import { PostListSkeleton } from "./PostListSkeleton";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";

export const PostsList = ({ title, postsQuery, alertMsg }) => {
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterKey, setFilterKey] = useState("all");
  const postsPerPage = 2;

  /**
   * Destructuring the posts, isLoading, isError and error from the custom hook
   */
  const {
    data: posts,
    isLoading,
    isError,
    error,
    handleDeleteMutation,
  } = useFetchedPosts(
    postsQuery,
    postsPerPage,
    filterKey,
    currentPage,
    setTotalPosts,
    postToDelete
  );

  // track delete mutation progress
  const { mutate: deletePost, isPending: isDeleting } = handleDeleteMutation;

  /**
   * Filter posts based on category
   */
  const handleFilter = (key) => {
    setFilterKey(key);
    setCurrentPage(1);
  };

  /**
   * Handle Show Modal
   */
  const handleShowModal = (post) => {
    setShowModal(true);
    setPostToDelete(post);
  };

  /**
   * Handle Delete Post
   */
  const handleDeletePost = () => {
    deletePost();
    setShowModal(false);
  };

  /**
   * Handle Current Page
   */
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 10);
  };

  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="container px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
          <Filter handleFilter={handleFilter} />
        </div>
      </div>
      <div className="container px-5 flex justify-start flex-wrap">
        {isLoading && <PostListSkeleton />}
        {posts &&
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              handleShowModal={() => handleShowModal(post)}
              fetchPosts={posts}
              isDeleting={isDeleting && postToDelete.id === post.id}
            />
          ))}
        {!isLoading && !isError && !posts.length && (
          <Alert variant="info" className="flex items-center gap-3">
            <span>
              <RiInformationLine />
            </span>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert variant="danger">
            <RiErrorWarningLine />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <Pagination
        totalPosts={totalPosts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        handleCurrentPage={handleCurrentPage}
      />
      <ConfirmDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};
