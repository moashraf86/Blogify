import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateForm } from "../utils/validateForm";
import { handleFormChange } from "../utils/handleFormChange";
import { createPost } from "../services/createPost";
import { Form } from "../components/layout/Form";
import { EditorInitialValue } from "../utils/editorInitialValue";
import { useTags } from "../context/TagsProviderContext";
import { syncNewTags } from "../services/syncNewTags";

export const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const { tags: currentTags } = useTags();
  const navigate = useNavigate();

  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    title: "",
    description: "",
    content: EditorInitialValue,
    tags: [],
    image: {
      src: null,
      alt: "",
      isInset: true,
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    title: {},
    description: {},
    content: {},
    tags: {},
    image: {},
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { title, description, content, tags, image } = formData;
  const authorId = currentUser?.id;
  const authorName = currentUser?.name || "Anonymous";
  const authorImage = currentUser?.photoURL;
  const isGuest = currentUser?.isGuest;

  /**
   * Presist Form Data in localStorage
   */
  useEffect(() => {
    // store formData in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  /**
   * Handle Inputs Change
   */
  const handleChange = (e) => {
    handleFormChange(e, formData, setFormData, isSubmitted, errors, setErrors);
  };

  /**
   * Remove the selected image
   */
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: {
        src: null,
        alt: "",
        isInset: true,
      },
    }));
    setErrors((prev) => ({
      ...prev,
      image: {},
    })); // Clear the image error
  };

  /**
   * Handle Toggle Image Mode (Inset/Full Width)
   */
  const handleToggleImageMode = () => {
    setFormData((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        isInset: !prev.image.isInset,
      },
    }));
  };

  /**
   * Handle Post Submission
   */
  const handleCreatePost = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    /**
     * Validate Form Inputs
     * @returns {Boolean} - True if all inputs are valid
     */
    if (
      !validateForm({
        title,
        description,
        content,
        tags,
        image,
        setErrors,
      })
    )
      return;

    // Create a new post with the form data
    createPost({
      title,
      description,
      content: JSON.stringify(content),
      tags,
      tagsValue: tags.map((tag) => tag.value),
      image,
      authorId,
      authorName,
      authorImage,
      isGuest,
    });

    // Add new tags to the tags collection in Firestore
    syncNewTags(tags, currentTags);

    handleRemoveImage(); // Remove the selected image
    localStorage.removeItem("formData"); // Remove formData from localStorage
    // Redirect to the home page after creating the post
    setTimeout(() => {
      // Navigate to the home page if user is not a guest
      if (!isGuest) navigate("/");
      // Navigate to the profile page if user is a guest
      else navigate("/drafts");
    }, 300);
  };

  return (
    <Form
      title={title}
      description={description}
      content={content}
      tags={tags}
      image={image}
      submitLabel={"Publish"}
      onsubmit={handleCreatePost}
      onSelect={handleChange}
      handleRemoveImage={handleRemoveImage}
      handleToggleImageMode={handleToggleImageMode}
      handleChange={handleChange}
      errors={errors}
    />
  );
};
