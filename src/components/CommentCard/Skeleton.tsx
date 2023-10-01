import Skeleton from "react-loading-skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="flex gap-4 border-[1px] border-zinc-700">
      <Skeleton width={60} height={60} borderRadius={100} />
      <div className="flex flex-col gap-1">
        <Skeleton width={200} height={20} />
        <Skeleton width={1210} height={100} />
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
