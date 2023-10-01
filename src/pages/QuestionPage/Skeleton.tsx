import CommentCardSkeleton from "components/CommentCard/Skeleton";
import Skeleton from "react-loading-skeleton";

const QuestionPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[20px]" />
      <div className="text-center flex flex-col items-center gap-1 mt-6 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton width={30} height={30} borderRadius={100} />
          <Skeleton width={140} height={20} />
        </div>
        <Skeleton height={50} width={600} />
      </div>
      <div className="mb-4 flex gap-2">
        <Skeleton height={20} width={60} />
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={80} />
      </div>
      <Skeleton height={200} width={1280} />
      <br />
      <div className="w-full h-[1px] bg-zinc-300" />
      <br />
      <Skeleton height={400} width={1280} />
      <div className="flex flex-col gap-8 mt-6">
        <CommentCardSkeleton />
        <CommentCardSkeleton />
        <CommentCardSkeleton />
      </div>
    </div>
  );
};

export default QuestionPageSkeleton;
