/* eslint-disable react/prop-types */
import RichEditor from "./YooptaEditor";
import { useMemo } from "react";
import { createYooptaEditor } from "@yoopta/editor";
import { PostImage } from "../shared/PostImage";

export const PostBody = ({ post }) => {
  // destructure post object to get image, title, and content
  const { image, content, id } = post;
  // convert content from string to normal object
  const contentParsed = JSON.parse(content);
  // create a ne editor
  const editor = useMemo(() => createYooptaEditor, []);

  return (
    <>
      <PostImage image={image} id={id} />
      <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto px-6 md:px-10">
        <RichEditor editor={editor} defaultValue={contentParsed} readOnly />
      </div>
    </>
  );
};
