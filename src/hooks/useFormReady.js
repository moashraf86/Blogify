export const useFormReady = (title, description, content, tags, errors) => {
  const {
    title: titleError,
    description: descriptionError,
    content: contentError,
    tags: tagError,
    image: imageError,
  } = errors || {};

  const hasEmptyFields = !title || !description || !content || !tags.length;
  const hasErrors =
    titleError.hasError ||
    descriptionError.hasError ||
    contentError.hasError ||
    tagError.hasError ||
    imageError.hasError ||
    false;

  return !hasEmptyFields && !hasErrors;
};
