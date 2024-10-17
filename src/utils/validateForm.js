import { calcContentSummary } from "./getPostSummary";

/**
 * Validates the title field.
 * @param {string} title - The title to be validated.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if the title is valid.
 */
export const validateTitle = (title) => {
  // min 3 chars, max 60 chars al
  const minChars = 5;
  const maxChars = 100;
  if (!title) {
    return { hasError: true, message: "Title is required" };
  } else if (title.length < minChars) {
    return {
      hasError: true,
      message: "Title must be at least 5 characters",
    };
  } else if (title.length > maxChars) {
    return {
      hasError: true,
      message: "Title must be at most 100 characters",
    };
  }
  return { hasError: false };
};

/**
 * Validates the description field.
 * @param {string} description - The description to be validated.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if the description is valid.
 */
export const validateDescription = (description) => {
  const maxChars = 100;
  if (!description) {
    return { hasError: true, message: "Description is required" };
  } else if (description.length > maxChars) {
    return {
      hasError: true,
      message: "Description must be at most 100 characters",
    };
  }
  return { hasError: false };
};

/**
 * Validates the content field.
 * @param {string} content - The content to be validated.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if the content is valid.
 */
export const validateContent = (content) => {
  const totalWords = calcContentSummary(content).contentWords;
  // check if there is at least 1 word
  if (totalWords < 1) {
    return { hasError: true, message: "Content is required" };
  }
  return { hasError: false };
};

/**
 * Validates the tag field.
 * @param {string} tag - The tag to be validated.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if the tag is valid.
 */
export const validateTag = (tag) => {
  if (!tag) {
    return { hasError: true, message: "Tag is required" };
  }
  return { hasError: false };
};

/**
 * Validates the image field.
 * @param {File} image - The image to be validated.
 * @param {boolean} isImageRequired - Whether the image is required or not.
 * @returns {string|boolean} - Returns an error message if validation fails, or true if the image is valid.
 */
export const validateImage = (image) => {
  if (image?.size > 1000000) {
    return { hasError: true, message: "Image size must be less than 1MB" };
  }
  return { hasError: false };
};

/**
 * Validates the form fields.
 * @param {object} form - The form data to be validated.
 * @param {function} setErrors - Function to set the error messages.
 * @returns {boolean} - Returns true if the form is valid.
 */
export const validateForm = ({
  title,
  description,
  content,
  tags,
  image,
  isImageRequired,
  setErrors,
}) => {
  let validationErrors = {
    title: validateTitle(title),
    description: validateDescription(description),
    content: validateContent(content),
    tags: validateTag(tags),
    image: validateImage(image, isImageRequired),
  };
  setErrors(validationErrors);
  return Object.values(validationErrors).every((error) => !error.hasError);
};

/**
 * Validates the comment field.
 * @param {string} comment - The text of the comment to be validated.
 * @param {function} setError - Function to set the error message.
 * @returns {void} - Returns nothing, but sets an error message or clears it.
 */
export const validateComment = (comment, setError) => {
  if (!comment) {
    setError("Comment is required");
    return false;
  } else if (comment.trim() === "") {
    setError("Comment cannot be empty");
    return false;
  }
  setError(null);
  return true;
};
