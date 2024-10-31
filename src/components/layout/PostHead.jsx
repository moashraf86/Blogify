/* eslint-disable react/prop-types */
import { formatTimestamp } from "../../utils/formatTimestamp";
import { calcContentSummary } from "../../utils/getPostSummary";
import { PostAuthor } from "../shared/PostAuthor";
import { PostDescription } from "../shared/PostDescription";
import { PostMeta } from "../shared/PostMeta";
import { PostTags } from "../shared/PostTags";
import { PostTitle } from "../shared/PostTitle";
export const PostHead = ({ post }) => {
  const { tags, createdAt, content } = post || {};
  const readTime = calcContentSummary(JSON.parse(content)).readTime;
  const date = formatTimestamp(createdAt);

  return (
    <div className="px-6 md:px-10 w-full max-w-4xl mx-auto">
      <PostTags tags={tags} className="mb-3" />
      <PostTitle post={post} className="text-2xl md:text-4xl mb-6" />
      <PostDescription description={post.description} isFull={true} />
      <PostAuthor post={post}>
        <PostMeta date={date} readTime={readTime} />
      </PostAuthor>
    </div>
  );
};
