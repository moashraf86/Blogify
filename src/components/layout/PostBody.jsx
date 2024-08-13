import MDEditor from "@uiw/react-md-editor";

/* eslint-disable react/prop-types */
export const PostBody = ({ post }) => {
  const { image, title, content } = post;
  return (
    <>
      {/* Post Image */}
      <div className="aspect-video bg-gradient-to-r from-zinc-400 to-zinc-800 rounded-lg overflow-clip mb-6">
        {image && (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        )}
      </div>
      {/* Post Content */}
      <div className="flex flex-col gap-2">
        {
          <MDEditor.Markdown
            source={content}
            className="blog-content bg-transparent text-primary text-lg"
          />
        }
      </div>
    </>
  );
};
