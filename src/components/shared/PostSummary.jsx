/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

export const PostSummary = ({ words, blocks, readTime, className }) => {
  return (
    <ul
      className={cn(
        "flex items-center px-2 bg-muted rounded-lg text-sm md:text-base",
        className
      )}
    >
      <li className="py-4 px-2">
        <strong>{words}</strong>{" "}
        <span className="text-muted-foreground">word{words > 1 && "s"}</span>
      </li>
      <li className="py-4 px-2">
        <strong>{blocks}</strong>{" "}
        <span className="text-muted-foreground">
          paragraph
          {blocks > 1 && "s"}
        </span>
      </li>
      <li className="py-4 px-2">
        <strong>{readTime}</strong>{" "}
        <span className="text-muted-foreground">min read</span>
      </li>
    </ul>
  );
};
