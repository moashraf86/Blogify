/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";
export const PostTags = ({ tags, className }) => {
  return (
    <>
      {tags ? (
        <ul className={cn("flex items-center gap-2", className)}>
          {tags.map((tag, i) => (
            <li
              key={i}
              className="bg-accent py-1 px-3 rounded-full text-muted-foreground text-xs font-medium uppercase tracking-widest"
            >
              {tag.label}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
