import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
export const TitleInput = ({ title, titleError, handleChange }) => {
  const titleRef = useRef(null);

  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize(titleRef);
  }, [title]);

  return (
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
  );
};
