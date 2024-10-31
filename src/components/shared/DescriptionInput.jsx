/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export const DescriptionInput = ({
  description,
  descriptionError,
  handleChange,
}) => {
  const descriptionRef = useRef(null);

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize(descriptionRef);
  }, [description]);

  return (
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
        <p className="text-sm text-danger">{descriptionError.message}</p>
      )}
    </div>
  );
};
