/* eslint-disable react/prop-types */
export const PostDescription = ({ description, isFull }) => {
  if (!description) {
    return <p className="text-muted-foreground">No description</p>;
  }

  return (
    <p
      className={`text-muted-foreground ${
        isFull ? "text-lg mb-6" : "break-words"
      }`}
    >
      {isFull
        ? description // Full description for the single post view
        : description.length > 150
        ? `${description.substring(0, 150)}...` // Truncated description for post cards
        : description}
    </p>
  );
};
