import {
  validateTag,
  validateTitle,
  validateDescription,
  validateContent,
  validateImage,
} from "./validateForm";
import { isValidImageUrl } from "./isValidImageUrl";
/**
 * Handle form change for Create and Edit Post
 */
export const handleFormChange = (
  e,
  formData,
  setFormData,
  isSubmitted,
  errors,
  setErrors
) => {
  const { name, value } = e.target;

  // set image reader to read the image file
  if (name === "image") {
    if (value.src instanceof File) {
      const image = value.src;
      let validationErrors = { ...errors };
      validationErrors.image = validateImage(image);
      setErrors(validationErrors);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () =>
        setFormData((prevData) => ({
          ...prevData,
          image: {
            src: reader.result,
            alt: value.alt,
            isInset: true,
          },
        }));
    } else {
      // check if the provided url is valid of an image
      isValidImageUrl(value.src).then((isValid) => {
        let validationErrors = { ...errors };
        validationErrors.image = validateImage(value.src);
        setErrors(validationErrors);
        // st the image data in the form data
        setFormData((prevData) => ({
          ...prevData,
          image: {
            src: value.src,
            alt: value.alt,
            isInset: true,
          },
        }));
        // set error message if the url is not valid
        if (!isValid) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: {
              hasError: true,
              message: "Invalid image URL",
            },
          }));
        }
      });
    }
  } else if (name === "tags") {
    setFormData((prevData) => ({
      ...prevData,
      tags: [...value],
    }));

    // store formData in localStorage
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // validate the form fields once the form is submitted
  if (isSubmitted) {
    let validationErrors = { ...errors };
    switch (name) {
      case "title":
        validationErrors.title = validateTitle(value);
        break;
      case "description":
        validationErrors.description = validateDescription(value);
        break;
      case "content":
        validationErrors.content = validateContent(value);
        break;
      case "tag":
        validationErrors.tags = validateTag(value);
        break;
      case "image":
        validationErrors.image = validateImage(value.src);
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  }
};
