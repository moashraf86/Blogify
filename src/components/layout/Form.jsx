/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../ui/button";
import YooptaTextEditor from "./YooptaEditor";
import { AddCoverModal } from "../shared/AddCoverModal";
import { TagSelector } from "../shared/TagSelector";
import { PostSummary } from "../shared/PostSummary";
import { PostSummaryModal } from "../shared/PostSummaryModal";
import { TitleInput } from "../shared/TitleInput";
import { DescriptionInput } from "../shared/DescriptionInput";
import { ImagePreview } from "../shared/ImagePreview";
import { SignInAlert } from "../shared/SignInAlert";
import { RiImageLine } from "@remixicon/react";
import { useFormReady } from "../../hooks/useFormReady";
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
}) => {
  const { currentUser, signIn } = useContext(AuthContext);
  const isGuest = currentUser?.isGuest;
  const [coverModal, setCoverModal] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const [blocksCount, setBlocksCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
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
   * @returns {boolean} - returns a boolean value [true/false] based on the form validation
   */
  const readyForSubmit = useFormReady(
    title,
    description,
    content,
    tags,
    errors
  );

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

  return (
    <>
      {isGuest ? <SignInAlert signIn={signIn} /> : null}
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <div className="flex flex-col w-full bg-background rounded-md pt-6 pb-6 md:pb-20 gap-4">
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
            <TitleInput
              title={title}
              titleError={titleError}
              handleChange={handleChange}
            />
            <DescriptionInput
              description={description}
              descriptionError={descriptionError}
              handleChange={handleChange}
            />
            {/* Display the image */}
            <ImagePreview
              image={image}
              imageError={imageError}
              handleToggleImageMode={handleToggleImageMode}
              handleRemoveImage={handleRemoveImage}
              setCoverModal={setCoverModal}
            />
            <div className="flex flex-col gap-1 w-full pb-20 md:pb-0 pl-16 px-6 md:px-16 max-w-5xl">
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
                  disabled={!readyForSubmit}
                >
                  {isGuest ? "Save to Drafts" : submitLabel}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AddCoverModal
        showModal={coverModal}
        onCancel={() => setCoverModal(false)}
        handleChange={handleChange}
        handleSubmitUrl={handleChange}
      />
    </>
  );
};
