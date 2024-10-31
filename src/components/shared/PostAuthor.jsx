/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AuthorName } from "./AuthorName";

export const PostAuthor = ({ post, children }) => {
  const { authorId: id, authorName: name, authorImage: image } = post;
  const [firstName, lastName] = name.split(" ") || "";
  const initials =
    name === "Anonymous" ? "A" : `${firstName[0]} ${lastName[0]}`;
  return (
    <div className="flex items-center gap-2">
      <Avatar className="flex items-center justify-center size-11 rounded-full overflow-clip">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ">
        <p className="text-primary font-semibold">
          <AuthorName post={{ id, name }} />
        </p>
        {children && children}
      </div>
    </div>
  );
};
