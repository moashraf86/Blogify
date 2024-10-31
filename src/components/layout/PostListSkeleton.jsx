import { Skeleton } from "../ui/skeleton";

export const PostListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 sm:px-3 w-full sm:w-1/2 xl:w-1/4 "
        >
          <div className="bg-muted/30 border border-border rounded-md mb-6">
            <Skeleton className="w-full aspect-video rounded-br-none rounded-bl-none" />
            <div className="flex flex-col gap-3 p-4">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-full h-6 mb-2" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-3/4 h-3" />
              <Skeleton className="w-1/2 h-3" />
              <Skeleton className="w-32 h-4 mt-3" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
