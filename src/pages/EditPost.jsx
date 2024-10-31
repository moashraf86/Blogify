import { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { validateForm } from "../utils/validateForm";
import { Form } from "../components/layout/Form";
import { editPost } from "../services/editPost";
import { handleFormChange } from "../utils/handleFormChange";
import { useTags } from "../context/TagsProviderContext";
import { syncNewTags } from "../services/syncNewTags";
export const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tags: currentTags } = useTags();

  /**
   * Prefetch post data using useLoaderData
   * - The data is fetched using the `loader` function in the route configuration
   */
  const { post } = useLoaderData();

  const initialFormData = {
    title: post?.title || "",
    description: post?.description || "",
    content: post ? JSON.parse(post.content) : {},
    tags: post?.tags || [],
    image: post?.image || {
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

  /**
   * Remove form data from local storage on component unmount
   * - This ensures that the form data is not persisted across sessions
   */
  useEffect(() => {
    return () => {
      localStorage.removeItem("formData");
    };
  }, []);

  /**
   * Handle input field changes
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
    }));
  };

  /**
   * Toggle Image Mode
   */
  const handleToggleImageMode = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: {
        ...prevData.image,
        isInset: !prevData.image.isInset,
      },
    }));
  };

  /**
   * Handle post update submission
   */
  const handleEditPost = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    /**
     * Validate form inputs and update errors state
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

    // Call editPost service with updated data
    editPost({
      id,
      title,
      description,
      content: JSON.stringify(content),
      tags,
      tagsValue: tags.map((tag) => tag.value),
      image,
    });

    // Add new tags to tags collection in Firestore
    syncNewTags(tags, currentTags);

    // Clear form data from local storage
    localStorage.removeItem("formData");

    // Navigate to the home page after a short delay
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <Form
      title={title}
      description={description}
      content={content}
      tags={tags}
      image={image}
      submitLabel={"Update"}
      onsubmit={handleEditPost}
      onSelect={(e) => handleChange(e)}
      handleRemoveImage={handleRemoveImage}
      handleToggleImageMode={handleToggleImageMode}
      handleChange={handleChange}
      errors={errors}
    />
  );
};
