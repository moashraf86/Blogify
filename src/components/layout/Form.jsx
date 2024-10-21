/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiEditBoxLine,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiImageLine,
  RiInformationLine,
} from "@remixicon/react";
import { Button } from "../ui/button";
import YooptaTextEditor from "./YooptaEditor";
import { AddCoverModal } from "../shared/AddCoverModal";
import { TagSelector } from "../shared/TagSelector";
import { PostSummary } from "../shared/PostSummary";
import { PostSummaryModal } from "../shared/PostSummaryModal";
import { GoogleIcon } from "../shared/GoogleIcon";
export const Form = ({
  title,
  description,
  content,
  tags,
  image,
  submitLabel,
  onsubmit,
  onSelect,
  handleRemoveImage,
  handleToggleImageMode,
  handleChange,
  errors,
  redirectTime,
}) => {
  const { currentUser, signIn } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;
  const [coverModal, setCoverModal] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const [blocksCount, setBlocksCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  /**
   * Hide the alert message
   */
  const hideAlert = (e) => {
    e.target.closest(".container").style.display = "none";
  };
  // destructuring the errors object
  const {
    title: titleError,
    description: descriptionError,
    content: contentError,
    tags: tagError,
    image: imageError,
  } = errors;

  /**
   * Check if the form is ready to be submitted
   */
  const hasEmptyFields = !title || !description || !content || !tags.length;
  const hasErrors =
    titleError.hasError ||
    descriptionError.hasError ||
    contentError.hasError ||
    tagError.hasError ||
    imageError.hasError;

  const notReadyForSubmit = hasEmptyFields || hasErrors;

  /**
   * Auto resize the textarea
   */

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  /**
   * Set the character count
   * @param {string} value - counted characters comes from calcContentChars function
   * @returns {void}
   * sets the character count state to the length of the content
   */
  const handleCharCount = (words, block, readTime) => {
    setWordsCount(words);
    setBlocksCount(block);
    setReadTime(readTime);
  };

  /**
   * Fire autoResize function when the component mounts
   */
  useEffect(() => {
    autoResize(titleRef);
    autoResize(descriptionRef);
  }, [title, description]);

  return (
    <>
      {/* If user is a guest, show a message to log in with Google to publish posts */}
      {isGuest ? (
        <div className="container pt-6 px-6 max-w-5xl">
          <Alert
            variant="info"
            className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center p-4 sm:py-6 sm:px-8"
          >
            <div className="flex gap-3">
              <RiInformationLine className="text-lg min-w-6" />
              <div className="flex flex-col">
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription>
                  Sign in with Google to publish your posts.
                </AlertDescription>
              </div>
            </div>
            <Button
              size="lg"
              variant="default"
              className="md:text-base flex gap-[10px] h-11"
              onClick={signIn}
            >
              <GoogleIcon />
              Sign in with Google
            </Button>
            <button className="absolute top-3 right-3" onClick={hideAlert}>
              <RiCloseLine />
            </button>
          </Alert>
        </div>
      ) : null}
      {currentUser ? (
        <div className="flex justify-center items-center max-w-7xl mx-auto">
          <div className="flex flex-col w-full bg-background rounded-md py-6 gap-4 mt-6">
            <form
              onSubmit={onsubmit}
              className="flex flex-col gap-4 items-center"
            >
              <div className="flex items-center flex-wrap gap-6 w-full px-6 md:px-16 max-w-5xl">
                <TagSelector
                  onSelect={onSelect}
                  selectedValues={tags}
                  error={tagError.hasError}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2 flex-wrap">
                    {!image.src && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`cursor-pointer gap-1 py-1.5 h-auto rounded-md ${
                          imageError.hasError
                            ? "border-danger text-danger hover:text-danger hover:bg-danger/10"
                            : ""
                        }`}
                        onClick={() => setCoverModal(true)}
                      >
                        <RiImageLine size={18} />
                        Add Cover
                      </Button>
                    )}
                  </div>
                </div>
                {/* Form Footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-background z-20 py-3 border-t border-border shadow-sm flex flex-1 justify-end">
                  <div className="flex flex-wrap items-center justify-between w-full mx-auto max-w-5xl px-6 md:px-16 gap-4 sm:gap-0">
                    {/* Post Summary - Desktop */}
                    <PostSummary
                      words={wordsCount}
                      blocks={blocksCount}
                      readTime={readTime}
                      className="hidden md:flex"
                    />
                    {/* Post Summary Modal - Mobile */}
                    <PostSummaryModal>
                      <PostSummary
                        words={wordsCount}
                        blocks={blocksCount}
                        readTime={readTime}
                      />
                    </PostSummaryModal>
                    {/* Publish Button */}
                    <Button
                      size="lg"
                      type="submit"
                      className="disabled:opacity-20 ml-auto md:ml-0"
                      disabled={notReadyForSubmit}
                    >
                      {isGuest ? "Save to Drafts" : submitLabel}
                    </Button>
                  </div>
                </div>
              </div>
              {/* Post Title */}
              <div className="flex flex-col gap-1 w-full px-6 md:px-16 max-w-5xl">
                <textarea
                  ref={titleRef}
                  name="title"
                  id="title"
                  className="w-full p-2 text-primary bg-transparent rounded-md text-2xl md:text-4xl font-bold focus-visible:outline-none resize-none overflow-hidden"
                  value={title}
                  type="text"
                  rows={1}
                  placeholder="Title"
                  onInput={() => autoResize(titleRef)}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "title", value: e.target.value },
                    })
                  }
                ></textarea>
                {titleError.hasError && (
                  <p className="text-sm text-danger">{titleError.message}</p>
                )}
              </div>
              {/* Post Description */}
              <div className="flex flex-col gap-1 w-full px-6 md:px-16 max-w-5xl">
                <textarea
                  ref={descriptionRef}
                  name="description"
                  id="description"
                  autoComplete="off"
                  className="w-full p-2 text-primary bg-transparent rounded-md text-lg md:text-xl  md:leading-[1.5] focus-visible:outline-none resize-none overflow-hidden"
                  value={description}
                  type="text"
                  rows={1}
                  placeholder="Description"
                  onInput={() => autoResize(descriptionRef)}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "description", value: e.target.value },
                    })
                  }
                ></textarea>
                {descriptionError.hasError && (
                  <p className="text-sm text-danger">
                    {descriptionError.message}
                  </p>
                )}
              </div>
              {/* Display the image */}
              {image.src && (
                <div
                  className={`px-6 md:px-16 relative overflow-clip w-full ${
                    image.isInset ? "max-w-5xl" : "max-w-7xl"
                  }`}
                >
                  <div className="relative after:absolute after:content-[''] after:inset-0 after:bg-black/50 after:rounded-md after:z-1 after:hidden hover:after:block group">
                    {/*Action  buttons */}
                    <div className="items-center gap-2 absolute top-4 right-4 z-10 bg-[#262626]/25 rounded-full py-2 px-5 backdrop-blur-sm hidden group-hover:flex">
                      {image.isInset ? (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="border-none size-8"
                          title="Full Screen"
                          onClick={handleToggleImageMode}
                        >
                          <RiFullscreenLine className="fill-white" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          title="Full Screen Exit"
                          className="border-none size-8"
                          onClick={handleToggleImageMode}
                        >
                          <RiFullscreenExitLine className="fill-white" />
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Edit image"
                        className="border-none size-8 cursor-pointer"
                        onClick={() => setCoverModal(true)}
                      >
                        <RiEditBoxLine className="fill-white" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        title="Delete Image"
                        onClick={handleRemoveImage}
                        className="border-none size-8"
                      >
                        <RiDeleteBinLine className="fill-white" />
                      </Button>
                    </div>
                    <img
                      className="w-full aspect-video object-cover rounded-md"
                      src={image.src}
                      alt={image.alt}
                    />
                    {/* error */}
                  </div>
                  {imageError.hasError && (
                    <p className="text-sm text-danger">{imageError.message}</p>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-1 w-full pb-12 md:pb-0 pl-16 px-6 md:px-16 max-w-5xl">
                <YooptaTextEditor
                  handleCharCount={handleCharCount}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "content",
                        value: value,
                      },
                    })
                  }
                  defaultValue={content}
                />
                {contentError.hasError && (
                  <p className="text-sm text-danger">{contentError.message}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container pt-6">
          <Alert variant="info">
            <RiInformationLine />
            <AlertTitle>Log in Required</AlertTitle>
            <AlertDescription>
              You will be redirected to the home page in <b>{redirectTime}</b>{" "}
              seconds.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/* Modals */}
      <AddCoverModal
        showModal={coverModal}
        onCancel={() => setCoverModal(false)}
        handleChange={handleChange}
        handleSubmitUrl={handleChange}
      />
    </>
  );
};
