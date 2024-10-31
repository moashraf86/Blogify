/* eslint-disable react/prop-types */
import { ImageActions } from "./ImageActions";

export const ImagePreview = ({
  image,
  imageError,
  handleRemoveImage,
  handleToggleImageMode,
  setCoverModal,
}) => {
  return (
    <>
      {image.src && (
        <div
          className={`px-6 md:px-16 relative overflow-clip w-full ${
            image.isInset ? "max-w-5xl" : "max-w-7xl"
          }`}
        >
          <div className="relative after:absolute after:content-[''] after:inset-0 after:bg-black/50 after:rounded-md after:z-1 after:hidden hover:after:block group">
            <ImageActions
              image={image}
              handleRemoveImage={handleRemoveImage}
              handleToggleImageMode={handleToggleImageMode}
              setCoverModal={setCoverModal}
            />
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
    </>
  );
};
