/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

export const PostImage = ({ image, id }) => {
  const location = useLocation();
  let isPostPage = location.pathname.startsWith("/post");
  const { src, alt } = image;

  // Handle error when image is not found
  const handleError = (e) => {
    e.target.src = "https://via.placeholder.com/800x450";
    e.target.alt = "Image not found";
  };

  if (isPostPage) {
    return (
      <>
        {image && (
          <div
            className={`w-full mx-auto mb-6 rounded-xl overflow-clip px-6 md:px-10 ${
              image.isInset ? "max-w-4xl" : "max-w-7xl lg:rounded-xl"
            }`}
          >
            <img
              src={src}
              alt={alt}
              className="relative w-full aspect-video object-cover rounded-xl"
              onError={handleError}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="h-[270px] max-h-[270px]">
      <Link to={`/post/${id}`}>
        {src && (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover rounded-md rounded-bl-none rounded-br-none"
            onError={handleError}
          />
        )}
      </Link>
    </div>
  );
};
